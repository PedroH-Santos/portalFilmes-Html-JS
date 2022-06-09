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
let id = search.replace("?id=", "");



var xhttp = new XMLHttpRequest();
xhttp.open("GET", `${BASE_URL}movie/${id}?api_key=${CHAVE_API}&language=pt-BR&page=1&append_to_response=videos`, false);
xhttp.send();
let response = JSON.parse(xhttp.responseText);
let data = response;


let genres = '';

data.genres.map((genre)=> {
    genres+= `<span class="info"> ${genre.name}, </span>`;
})

let video = '';
if(data.videos.results.length > 0) {
    video=data.videos.results[0].key;
}
let htmlDetail = `

    <div class="row">
        <div class="col-xl-12 col-sm-12  col-12 mt-4">
            <h1 class="mt-4 titleFilm"> ${data.title} </h1>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-5 col-sm-12  col-12 mt-4 text-center">
        <img src="${BASE_URL_FILMS}/${data.poster_path}?api_key=${CHAVE_API}" class="imageFilm"/>
    </div>
    <div class="col-xl-7 col-sm-12  col-12 mt-4">
        <p class="mt-4 descriptionFilm "> ${data.overview} </p>
        <div class="row">
            <div class="col-xl-4 col-sm-12  col-12 mt-4">
                <h6 class="d-inline-block"> Popularidade: </h6>
                <span class="info"> ${data.popularity} </span>
            </div>
            <div class="col-xl-4 col-sm-12  col-12 mt-4">
                <h6 class="d-inline-block"> Média de Votos: </h6>
                <span class="info"> ${data.vote_average} </span>
            </div>
            <div class="col-xl-4 col-sm-12  col-12 mt-4">
                <h6 class="d-inline-block"> Quantidade de votos: </h6>
                <span class="info"> ${data.vote_count} </span>
            </div>
        </div>
    </div>
    </div>


    <div class="row">
        <div class="col-xl-12 col-sm-12  col-12 mt-4">
            <h1 class="mt-4 titleFilm"> Descrição </h1>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-12 col-sm-12  col-12 mt-4">
            <p class="mt-4 descriptionFilm "> </p>
            <div class="row">
                <div class="col-xl-4 col-sm-12  col-12 mt-4">
                    <h6 class="d-inline-block"> Duração: </h6>
                    <span class="info">  ${data.runtime} </span>
                </div>
                <div class="col-xl-4 col-sm-12  col-12 mt-4">
                    <h6 class="d-inline-block"> Status: </h6>
                    <span class="info"> ${data.status} </span>
                </div>
                <div class="col-xl-4 col-sm-12  col-12 mt-4">
                    <h6 class="d-inline-block"> Data de Lançamento: </h6>
                    <span class="info"> ${data.release_date} </span>
                </div>
            </div>
            <div class="row">

                <div class="col-xl-12 col-sm-12  col-12 mt-4">
                 <h6 class="d-inline-block"> Genêros: </h6>
                  ${genres}
                </div>
            </div>

        </div>
    </div>


    <div class="row">
        <div class="col-xl-12 col-sm-12  col-12 mt-4">
            <h1 class="mt-4 titleFilm"> Trailer: </h1>
        </div>
    </div>


    <div class="row">
        <div class="col-xl-12 col-sm-12  col-12 mt-4">
            <iframe width="560" height="400" class="iframeLancamentos"
                src="${YOUTUBE_VIDEOS}${video}" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </div>
    </div>


`

$(".detailFilm").html(htmlDetail);

