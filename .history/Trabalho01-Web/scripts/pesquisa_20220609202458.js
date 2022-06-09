const TOKEN_LEITURA = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODA0ODE1ZDMxNDZjYWVlZTk3ZTg2MmM0MDJiMzMxZSIsInN1YiI6IjYyOWU4Mjc5ZDIxNDdjMTE3Y2FmYTcyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lcDoFcQZPkXEpju3YQv6ZDBcaRqk-C9sPSVMZtAOYSk"
const CHAVE_API = "9804815d3146caeee97e862c402b331e";
const BASE_URL = "https://api.themoviedb.org/3/";
const BASE_URL_FILMS = "https://image.tmdb.org/t/p/w300";
const YOUTUBE_VIDEOS = "https://www.youtube.com/embed/";


$(".showMobile").click((e) => {
    e.preventDefault(); 
    if ($("#menuMob").css("opacity") == '0') {
       $("#menuMob").css("opacity","1")
    } else {
       $("#menuMob").css("opacity","0")
    }
  
 })
 
 $(".searchButton").click((e) => {
    e.preventDefault();
    $(".formSearch").submit();
 })
 
 $(".emptyInputSearch").click((e) => {
    e.preventDefault();
    $(".searchInput").val('');
 })
 

let search = window.location.search;
let filmName = search.replace("?search=", "");


var xhttp = new XMLHttpRequest();
var dataSearchFilms = [];
let pageSearchFilms = 1;
loadSearchFilms();
$(".addPageSearch").click(() => {
    pageSearchFilms++;
    loadSearchFilms(pageSearchFilms);
    getDefaultSearchFilms();
 
 });
function loadSearchFilms(page) {
    xhttp.open("GET", `${BASE_URL}search/movie?api_key=${CHAVE_API}&language=pt-BR&page=${page}&append_to_response=videos&query=${filmName}`, false);
    xhttp.send();
    let responseSearchFims = JSON.parse(xhttp.responseText);
    dataSearchFilms = responseSearchFims.results;
}


getDefaultSearchFilms(dataSearchFilms, pageSearchFilms);

function getDefaultSearchFilms() {

    searchFilmData = $(".searchData").html();

    searchFilmData += '<div class="row">';

    for (let i = 0; i < dataSearchFilms.length; i++) {
        let data = dataSearchFilms[i];
        xhttp.open("GET", `${BASE_URL}movie/${data.id}?api_key=${CHAVE_API}&language=pt-BR&page=1&append_to_response=videos`, false);
        xhttp.send();

        let dataPlus = JSON.parse(xhttp.responseText);
        console.log(dataPlus);

        searchFilmData += `

      <div class="col-xl-3 col-sm-12 col-md-6 col-lg-4 col-12 mt-4 cardDestaque ">
       
      <div class="d-block">
            <img src="${BASE_URL_FILMS}/${data.poster_path}?api_key=${CHAVE_API}" class="imageFilm"/>
         </div>
         <div class="d-block">
            <p class="mt-3 "> <strong> Título: </strong>  ${data.title}  </p>
            <p class="mt-3 "> <strong> Avaliação: </strong> ${data.vote_average} </p>
            <p class="mt-3 "> <strong> Data de Lançamento: </strong>${data.release_date}</p>
            <p class="mt-3 "> <strong>  Resumo : </strong> ${data.overview}</p>
         </div>
         <div class="d-block mt-2">
            <a href="detalhes.html?id=${data.id}" class="btn btn-primary">Detalhes</a>
         </div>
      </div>
      `
    }
    searchFilmData += '</div>';

    $(".searchData").html(searchFilmData);

}
let htmlDetail = '';