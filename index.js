const apikey = "f322b9b92569cc1303fde9c344d90d40";
const search = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=`;
const poster = `https://image.tmdb.org/t/p/w400`;
const trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${apikey}`;
const upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`;
const toprated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
const detail = `https://api.themoviedb.org/3/movie/640344?api_key=${apikey}&language=en-US`;

// search movie here.........
const form = document.querySelector("form");
const input = document.querySelector("input");
const displaySearch = document.getElementById("searchDiv");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;
  const searchMovie = async () => {
    const res = await fetch(search + `${inputValue}`);
    const data = await res.json();
    console.log(data.results);
    displaySearch.innerHTML = displayMovie(data.results);
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
  movieList.innerHTML = displayMovie(movie);
};

//upcoming movies

const upcomingMovie = document.getElementById("upcoming-container");
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
    .map((result) => {
      if (result.poster_path) {
        return `<li onclick="selectMovie(${result.id}),getVideo(${result.id})">
         <img src="${poster}${result.poster_path}" alt="Avatar">
         <div class="container"><h4><b>Rating:<i class="fas fa-star"></i>${result.vote_average}</b></h4>
           <p>Release Date:${result.release_date}</p> </div></li>`;
      }
    })
    .join("");
};

const selectMovie = async (id) => {
  const detail = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`;
  const res = await fetch(detail);
  const data = await res.json();
  displayPopup(data);
};

//display popup....................

const displayPopup = (data) => {
  const {
    title,
    backdrop_path,
    poster_path,
    vote_average,
    overview,
    release_date,
  } = data;

  const html = `
        <div class="popup">
        <div class="detail-container">
        <div>
        <img src="${poster}${poster_path}" />
        </div>
        <div id="detaildiv">
        <span class="close" onclick="closePopup()">&times;</span>
         <p>${title}</p>
         <p>Release-Date-${release_date}</p>
         <p><i class="fas fa-star">Rating</i>&nbsp;${vote_average}</p>
         <p><h3>Overview</h3>${overview}</p>
         </div>
        </div>
        </div>
  `;
  movieList.innerHTML = html + movieList.innerHTML;
};

const getVideo = async (id) => {
  const video = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}&language=en-US`;
  const res = await fetch(video);
  const data = await res.json();
  console.log(data.results);
  displayVideo(data.results);
};

const displayVideo = (data) => {
  return data
    .map((result) => {
      return `<div class="video">
      <span class="close" onclick="closePopup()">&times;</span>
    <iframe src="https://www.youtube.com/embed/${result.key}?controls=0"></iframe></div>`;
    })
    .join("");
};

//close popup.......................

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

trendingUrl();
upcomingUrl();
toptrendingUrl();
