const apikey = "f322b9b92569cc1303fde9c344d90d40";
const search = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=`;
const poster = `https://image.tmdb.org/t/p/w500`;
const trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${apikey}`;
const upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`;
const toprated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
const detail = `https://api.themoviedb.org/3/movie/640344?api_key=${apikey}&language=en-US`;

// search movie here.........
const form = document.querySelector("form");
const input = document.querySelector("input");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;
  const searchMovie = async () => {
    const res = await fetch(search + `${inputValue}`);
    const data = await res.json();
    displaySearch(data.results);
    console.log(data.results);
  };

  const displaySearch = (movie) => {
    const displaySearch = document.getElementById("searchDiv");
    const html = movie
      .map(
        (result) => `<li onclick="selectMovie(${result.id})">
         <img src="${poster}${result.poster_path}" alt="movie poster">
         <div class="container">
         <h4><b>Rating:<i class="fas fa-star"></i>
         ${result.vote_average}</b></h4>
         <p>Release Date:${result.release_date}</p>
         </div>
         </li>`
      )
      .join("");
    displaySearch.innerHTML = html;
  };

  searchMovie();
  input.value = "";
});

//trending values

const movieList = document.getElementById("list");
const trendingUrl = async () => {
  const res = await fetch(trending);
  const data = await res.json();
  const movie = data.results;
  console.log(movie)
  movieList.innerHTML = displayMovie(movie);
};

//upcoming movies

const upcomingMovie=document.getElementById("upcoming-container");
const upcomingUrl = async () => {
  const res = await fetch(upcoming);
  const data = await res.json();
  const movie = data.results;
  upcomingMovie.innerHTML = displayMovie(movie);
};



// top trending movies
const toptrendingMovie = document.getElementById("top-trending");

const toptrendingUrl = async () => {
  const res = await fetch(upcoming);
  const data = await res.json();
  const movie = data.results;
  toptrendingMovie.innerHTML = displayMovie(movie);
};



//display movie
const displayMovie = (movie) => {
  return movie
    .map(
      (result) => `<li onclick="selectMovie(${result.id})">
  <img src="${poster}${result.poster_path}" alt="Avatar" style="width:100%">
  <div class="container">
    <h4><b>Rating:<i class="fas fa-star"></i>
    ${result.vote_average}</b></h4>
    <p>Release Date:${result.release_date}</p>
  </div>
</li>`
    )
    .join("");
};

const selectMovie = async (id) => {
  const detail = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`;
  const res = await fetch(detail);
  const data = await res.json();
  displayPopup(data);
};

const displayPopup = (data) => {
  const html = `<div class="popup">
    <div class="modal-content">
    <span class="close" onclick="closePopup()">&times;</span>
   <div class="modal-body">
    <img src="${poster}${data.backdrop_path}"/>
    <p>Some other text...${data.id}</p>
   </div>
  </div>
  </div>
  `;

  movieList.innerHTML = html + movieList.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

trendingUrl();
upcomingUrl();
toptrendingUrl();