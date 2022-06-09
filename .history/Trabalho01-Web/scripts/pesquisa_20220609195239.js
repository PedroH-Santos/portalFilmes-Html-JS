const TOKEN_LEITURA = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODA0ODE1ZDMxNDZjYWVlZTk3ZTg2MmM0MDJiMzMxZSIsInN1YiI6IjYyOWU4Mjc5ZDIxNDdjMTE3Y2FmYTcyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lcDoFcQZPkXEpju3YQv6ZDBcaRqk-C9sPSVMZtAOYSk"
const CHAVE_API = "9804815d3146caeee97e862c402b331e";
const BASE_URL = "https://api.themoviedb.org/3/";
const BASE_URL_FILMS = "https://image.tmdb.org/t/p/w300";
const YOUTUBE_VIDEOS = "https://www.youtube.com/embed/";



let search = window.location.search;
let filmName = search.replace("?search=", "");



var xhttp = new XMLHttpRequest();
xhttp.open("GET", `${BASE_URL}search/movie?api_key=${CHAVE_API}&language=pt-BR&page=1&append_to_response=videos?query=${filmName}`, false);
xhttp.send();
let response = JSON.parse(xhttp.responseText);
let data = response;
console.log(data);

xhttp.open("GET", `${BASE_URL}movie/upcoming?api_key=${CHAVE_API}&language=pt-BR&page=1`, false);
xhttp.send();
let responseSearchFims = JSON.parse(xhttp.responseText);
let dataSearchFilms = responseSearchFims.results;
let pageSearchFilms = 0;
getDefaultNextFilmsData(dataSearchFilms, pageSearchFilms);

function getDefaultNextFilmsData(datas, page, reset = false) {
   if (reset) {
      nextFilmsData = '';
   } else {
      nextFilmsData = $(".nextFilmsData").html();
   }
   nextFilmsData += '<div class="row">';

   for (let i = dataSearchFilms.length * 3; i < dataSearchFilms.length; i++) {
      let data = datas[i];
      xhttp.open("GET", `${BASE_URL}movie/${data.id}?api_key=${CHAVE_API}&language=pt-BR&page=1&append_to_response=videos`, false);
      xhttp.send();
      let dataPlus = JSON.parse(xhttp.responseText);
      nextFilmsData += `

         <div class="col-xl-4 col-sm-12 col-lg-6 col-12 cardMaking mt-4  ">
         <div class="d-block">
            <iframe width="100%" height="200px" src="${YOUTUBE_VIDEOS}${dataPlus.videos.results[0].key}"
               title="YouTube video player" frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowfullscreen></iframe>
         </div>
         <div class="d-block">
            <div class="d-block me-4 text-center">
               <h4 class="title-info  me-3 mt-2 "> ${data.title} </h4>
            </div>
            <div class="d-block me-4 mt-2 text-center">
               <h4 class="title-info  next"> Avaliação:  </h4>
               <p class="text-info-sub"> ${data.vote_average} </p>
            </div>
            <div class="d-block me-4 mt-2 text-center" >
               <h4 class="title-info next "> Data de Lançamento:  </h4>
               <p class="text-info-sub"> ${data.release_date} </p>
            </div>
            <div class="d-block me-4  mt-2 text-center">
               <h4 class="title-info next ">  Resumo :   </h4>
               <p class="text-info-sub"> ${data.overview} </p>

            </div>

         </div>
         <div class="d-block mt-2">
         <a href="detalhes.html?id=${data.id}" class="btn btn-primary">Detalhes</a>
      </div>
      </div>   
      `
   }
   nextFilmsData += '</div>';
   $(".nextFilmsData").html(nextFilmsData);
   if(dataSearchFilms.length < 3 * (page + 1) ) {

   }
}
let htmlDetail = '';