function showMobile() {
   var menu = document.getElementById("menuMob");
   if (menu.style.opacity == '0') {
      menu.style.opacity = "1";
   } else {
      menu.style.opacity = "0";
   }
}
$(".showMobile").click((e) => {
   var menu = document.getElementById("menuMob");
   if ($("#menuMob").css("opacity","1") == '0') {
      $("#menuMob").css("opacity","1")
   } else {
      $("#menuMob").css("opacity","0")
   }

   e.preventDefault();
   $(".formSearch").submit();
})

$(".searchButton").click((e) => {
   e.preventDefault();
   $(".formSearch").submit();
})

$(".emptyInputSearch").click((e) => {
   e.preventDefault();
   $(".searchInput").val('');
})

//REQUISIÇÕES PARA API


const TOKEN_LEITURA = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODA0ODE1ZDMxNDZjYWVlZTk3ZTg2MmM0MDJiMzMxZSIsInN1YiI6IjYyOWU4Mjc5ZDIxNDdjMTE3Y2FmYTcyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lcDoFcQZPkXEpju3YQv6ZDBcaRqk-C9sPSVMZtAOYSk"
const CHAVE_API = "9804815d3146caeee97e862c402b331e";
const BASE_URL = "https://api.themoviedb.org/3/";
const BASE_URL_FILMS = "https://image.tmdb.org/t/p/w300";
const YOUTUBE_VIDEOS = "https://www.youtube.com/embed/";

//Get Popular Movies


//Populares
var xhttp = new XMLHttpRequest();
xhttp.open("GET", `${BASE_URL}movie/popular?api_key=${CHAVE_API}&language=pt-BR&page=1`, false);
xhttp.send();
let response = JSON.parse(xhttp.responseText);
let datasPopular = response.results;
let pagePopular = 0;
let genreId = 0;
getDefaultData(datasPopular, pagePopular);


//Generos
xhttp.open("GET", `${BASE_URL}genre/movie/list?api_key=${CHAVE_API}&language=pt-BR`, false);
xhttp.send();
let responseGenre = JSON.parse(xhttp.responseText);
let datasGenres = responseGenre.genres;
let genresFilms = '<option value="0" selected>Categorias:Todos</option>';
datasGenres.map((genre) => {
   genresFilms += `
   <option value="${genre.id}">${genre.name}</option>
   `;
})
$(".selectGenres").html(genresFilms);

let datasFilmsGenres = [];


function getDefaultData(datas, page, reset = false) {
   if (reset) {
      populars = '';
   } else {
      populars = $(".popularsData").html();
   }
   populars += '<div class="row">';

   for (let i = page * 4; i < 4 * (page + 1); i++) {
      let data = datas[i];
      populars += `
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
   populars += '</div>';
   $(".popularsData").html(populars);
}

$(".addPagePopulars").click(() => {
   pagePopular++;

   if (genreId == 0) {
      getDefaultData(datasPopular, pagePopular);
   } else {
      getDefaultData(datasFilmsGenres, pagePopular);

   }

});
$(".selectGenres").change(() => {
   genreId = $(".selectGenres").val();
   xhttp.open("GET", `${BASE_URL}discover/movie?api_key=${CHAVE_API}&language=pt-BR&with_genres=${genreId}`, false);
   xhttp.send();
   let responseFilmsGenre = JSON.parse(xhttp.responseText);
   datasFilmsGenres = responseFilmsGenre.results;
   pagePopular = 0;
   getDefaultData(datasFilmsGenres, pagePopular, true);
})


//Em breve
xhttp.open("GET", `${BASE_URL}movie/upcoming?api_key=${CHAVE_API}&language=pt-BR&page=1`, false);
xhttp.send();
let responseNextFilms = JSON.parse(xhttp.responseText);
let datasNextFilms = responseNextFilms.results;
let pageNextFilms = 0;
getDefaultNextFilmsData(datasNextFilms, pageNextFilms);

function getDefaultNextFilmsData(datas, page, reset = false) {
   if (reset) {
      nextFilmsData = '';
   } else {
      nextFilmsData = $(".nextFilmsData").html();
   }
   nextFilmsData += '<div class="row">';

   for (let i = page * 3; i < 3 * (page + 1); i++) {
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
}

$(".addPageNextFilms").click(() => {
   pageNextFilms++;
   getDefaultNextFilmsData(datasNextFilms, pageNextFilms);
});







//Lançamentos

xhttp.open("GET", `${BASE_URL}movie/now_playing?api_key=${CHAVE_API}&language=pt-BR&page=1`, false);
xhttp.send();
let responsePlayToday = JSON.parse(xhttp.responseText);
let datasPlayToday = responsePlayToday.results;
getDefaultPlayTodayData(datasPlayToday);

function getDefaultPlayTodayData(datas, reset = false) {
   if (reset) {
      playTodayData = '';
   } else {
      playTodayData = $(".playTodayData").html();
   }
   playTodayData += '<div class="row">';

   for (let i = 0; i < 5; i++) {
      let data = datas[i];
      let active = '';
      if (i == 0) {
         active = 'active';
      }
      xhttp.open("GET", `${BASE_URL}movie/${data.id}?api_key=${CHAVE_API}&language=pt-BR&page=1&append_to_response=videos`, false);
      xhttp.send();
      let dataPlus = JSON.parse(xhttp.responseText);
      playTodayData += `

      <div class="carousel-item ${active}">
         <div class="container">
            <div class="div-title-section mt-5 ">
               <h1 class="section-title "> Lançamentos </h1>
            </div>
            <div class=" row">
            <div class=" col-xl-6  col-sm-12 col-12 mt-4">
            <iframe width="560" height="400" class="iframeLancamentos"
               src="${YOUTUBE_VIDEOS}${dataPlus.videos.results[0].key}" title="YouTube video player"
               frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowfullscreen></iframe>
         </div>
         <div class="col-xl-6 col-sm-12 col-12 mt-4">
            <h2> ${data.title} </h2>
            <div class="info mt-4">
               <h6 class="title-info"> Sinopse: </h6>
               <span> ${data.overview}</span>
            </div>
            <div class="info mt-4">
               <div class="subdiv-info me-4">
                     <h6 class="title-info "> Popularidade: </h6>
                     <span> ${data.popularity} </span>
               </div>
               <div class="subdiv-info me-4">
      
                     <h6 class="title-info "> Duração : </h6>
                     <span> ${dataPlus.runtime} min </span>
               </div>
               <div class="subdiv-info me-4 ">
                     <h6 class="title-info"> Estreia: </h6>
                     <span> ${data.release_date} </span>
               </div>
               <div class="info mt-4">
               <a href="detalhes.html?id=${data.id}" class="btn btn-primary">Detalhes</a>
            </div>  
            </div>
            <div class="info mt-4">
               <h6 class="title-info"> Avaliação: </h6>
               <div class="avaliacoes d-inline-block">
                     <input type="radio" class="estrelaAvaliacao" id="vazio" name="estrela"
                        value="" checked="" />
                     <label for="estrela_1"> <i class="fas fa-star"></i></label>
                     <input type="radio" class="estrelaAvaliacao" id="estrela_1" name="estrela"
                        value="" />
                     <label for="estrela_2"> <i class="fas fa-star"></i> </label>
                     <input type="radio" class="estrelaAvaliacao" id="estrela_2" name="estrela"
                        value="" />
                     <label for="estrela_3"> <i class="fas fa-star"></i> </label>
                     <input type="radio" class="estrelaAvaliacao" id="estrela_3" name="estrela"
                        value="" />
                     <label for="estrela_4"> <i class="fas fa-star"></i> </label>
                     <input type="radio" class="estrelaAvaliacao" id="estrela_4" name="estrela"
                        value="" />
                     <label for="estrela_5"> <i class="fas fa-star"></i> </label>
                     <input type="radio" class="estrelaAvaliacao" id="estrela_5" name="estrela"
                        value="" />
                     </div>
                  </div>
               </div>
            </div> 
   
         </div>
      </div>




     
      `
   }
   playTodayData += '</div>';
   $(".playTodayData").html(playTodayData);
}




//Personalidades

xhttp.open("GET", `${BASE_URL}person/popular?api_key=${CHAVE_API}&language=pt-BR`, false);
xhttp.send();
let responseAvaliation = JSON.parse(xhttp.responseText);
datasAvaliation = responseAvaliation.results;
let pageAvaliation = 0;
getDefaultAvaliation();

function getDefaultAvaliation() {

   let avaliation = $(".avaliationData").html();

   avaliation += '<div class="row">';

   for (let i = pageAvaliation * 2; i < 2 * (pageAvaliation + 1); i++) {
      let data = datasAvaliation[i];
      xhttp.open("GET", `${BASE_URL}person/${data.id}?api_key=${CHAVE_API}&language=pt-BR`, false);
      xhttp.send();
      let responsePerson = JSON.parse(xhttp.responseText);
      let datasPerson = responsePerson;
      avaliation += `
         <div class="col-xl-6 col-sm-12 col-12 col-lg-6 mt-4 d-flex justify-content-end">
            <div class="col-xl-4 d-flex justify-content-center">
                  <div class="userCircle"> 
                  <img src="${BASE_URL_FILMS}/${datasPerson.profile_path}?api_key=${CHAVE_API}" class="imageFilm"/>
                  </div>
            </div>
            <div class="col-xl-7">
                  <h5> ${datasPerson.name} </h5>
                  <h6 class="title-info mt-3"> Papel: </h6>
                  <div class="d-inline-block">
                     <span class="">  ${datasPerson.known_for_department}</span>
                  </div>
                  <div class="mt-3">
                     <h6 class="title-info"> Sobre o artista: </h6>
                     <span> ${datasPerson.biography} </span>
                  </div>
                  <div class="mt-3">
                     <h6 class="title-info "> Aniversário: </h6>
                     <div class="d-inline-block">
                        <span class="">  ${datasPerson.birthday}</span>
                     </div>
                  </div>
                  <div class="mt-3">
                     <h6 class="title-info "> Popularidade: </h6>
                     <div class="d-inline-block">
                        <span class=" "> ${datasPerson.popularity}</span>
                     </div>
                  </div>
                  <div class="mt-2">
                     <div class="avaliacoes d-inline-block">
                        <input type="radio" class="estrelaAvaliacao" id="vazio" name="estrela" value=""
                              checked="" />
                        <label for="estrela_1"> <i class="fas fa-star"></i></label>
                        <input type="radio" class="estrelaAvaliacao" id="estrela_1" name="estrela"
                              value="" />
                        <label for="estrela_2"> <i class="fas fa-star"></i> </label>
                        <input type="radio" class="estrelaAvaliacao" id="estrela_2" name="estrela"
                              value="" />
                        <label for="estrela_3"> <i class="fas fa-star"></i> </label>
                        <input type="radio" class="estrelaAvaliacao" id="estrela_3" name="estrela"
                              value="" />
                        <label for="estrela_4"> <i class="fas fa-star"></i> </label>
                        <input type="radio" class="estrelaAvaliacao" id="estrela_4" name="estrela"
                              value="" />
                        <label for="estrela_5"> <i class="fas fa-star"></i> </label>
                        <input type="radio" class="estrelaAvaliacao" id="estrela_5" name="estrela"
                              value="" />
                     </div>


                  </div>

            </div>
         </div>   
      `
   }
   avaliation += '</div>';
   $(".avaliationData").html(avaliation);
}


$(".addPageAvaliation").click(() => {
   pageAvaliation++;
   getDefaultAvaliation();
});