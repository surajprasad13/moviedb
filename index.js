const apikey = "f322b9b92569cc1303fde9c344d90d40";
const search =
  "https://api.themoviedb.org/3/search/movie?api_key=f322b9b92569cc1303fde9c344d90d40&query=";
const poster = "https://image.tmdb.org/t/p/w200";
const trending =
  "https://api.themoviedb.org/3/trending/all/week?api_key=f322b9b92569cc1303fde9c344d90d40";
const upcoming =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=f322b9b92569cc1303fde9c344d90d40&language=en-US&page=1";
const toprated =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=f322b9b92569cc1303fde9c344d90d40&language=en-US&page=1";
const detail =
  "https://api.themoviedb.org/3/movie/640344?api_key=f322b9b92569cc1303fde9c344d90d40&language=en-US";
//trending values

const movieList = document.getElementById("list");

const fetchUrl = async () => {
  const url =
    "https://api.themoviedb.org/3/trending/all/week?api_key=f322b9b92569cc1303fde9c344d90d40";

  const res = await fetch(url);
  const data = await res.json();
  const movie = data.results;
  console.log(data);
  displayMovie(movie);
};

const displayMovie = (movie) => {
  const html = movie
    .map(
      (result) => `<li onclick="selectMovie(${result.id})">

  <img src="https://image.tmdb.org/t/p/w200${result.poster_path}" alt="Avatar" style="width:100%">
  <div class="container">
    <h4><b>Rating:${result.vote_average}</b></h4>
    <p>Release Date:${result.release_date}</p>
  </div>
</li>`
    )
    .join("");
  movieList.innerHTML = html;
};

const selectMovie = async (id) => {
  const detail = `https://api.themoviedb.org/3/movie/${id}?api_key=f322b9b92569cc1303fde9c344d90d40&language=en-US`;
  const res = await fetch(detail);
  const data = await res.json();
  displayPopup(data);
};

const displayPopup = (data) => {
  const html = `<div class="popup">
  <div class="modal-content">
  <div class="modal-header">
    <span class="close" onclick="closePopup()">&times;</span>
    <h2>Modal Header</h2>
  </div>
  <div class="modal-body">
    <img src="https://image.tmdb.org/t/p/w200${data.backdrop_path}"/>
    <p>Some other text...${data.id}</p>
  </div>
  <div class="modal-footer">
    <h3>Modal Footer</h3>
  </div>
</div></div>
  `;

movieList.innerHTML=html+movieList.innerHTML

};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

fetchUrl();
