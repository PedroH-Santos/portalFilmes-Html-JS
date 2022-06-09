const TOKEN_LEITURA = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODA0ODE1ZDMxNDZjYWVlZTk3ZTg2MmM0MDJiMzMxZSIsInN1YiI6IjYyOWU4Mjc5ZDIxNDdjMTE3Y2FmYTcyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lcDoFcQZPkXEpju3YQv6ZDBcaRqk-C9sPSVMZtAOYSk"
const CHAVE_API = "9804815d3146caeee97e862c402b331e";
const BASE_URL = "https://api.themoviedb.org/3/";
const BASE_URL_FILMS = "https://image.tmdb.org/t/p/w300";
const YOUTUBE_VIDEOS = "https://www.youtube.com/embed/";



let search = window.location.search;
let id = search.replace("?id=", "");



var xhttp = new XMLHttpRequest();
xhttp.open("GET", `${BASE_URL}movie/${id}?api_key=${CHAVE_API}&language=pt-BR&page=1&append_to_response=videos`, false);
xhttp.send();
let response = JSON.parse(xhttp.responseText);
let data = response;
console.log(data);


let genres = '';

data.genres.map((genre)=> {
    genres+= `<span class="info"> ${genre.name}, </span>`;
})

let video = '';
if(data.videos.results.length > 0) {
    video=data.videos.results[0].key;
}
let htmlDetail = '';