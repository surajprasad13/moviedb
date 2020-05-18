$(document).ready(function() {

    const apikey = "f322b9b92569cc1303fde9c344d90d40";
    const search = "https://api.themoviedb.org/3/search/movie?api_key=f322b9b92569cc1303fde9c344d90d40&query=";
    const poster = "https://image.tmdb.org/t/p/w200";
    const trending = "https://api.themoviedb.org/3/trending/all/week?api_key=f322b9b92569cc1303fde9c344d90d40";
    const upcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=f322b9b92569cc1303fde9c344d90d40&language=en-US&page=1";
    const toprated = "https://api.themoviedb.org/3/movie/top_rated?api_key=f322b9b92569cc1303fde9c344d90d40&language=en-US&page=1";
    const detail = "https://api.themoviedb.org/3/movie/640344?api_key=f322b9b92569cc1303fde9c344d90d40&language=en-US";
    //trending values

    function movieSection(movies) {
        return movies.map((movie) => {
            if (movie.poster_path) {
                return `<img src=${poster+movie.poster_path} data-movie-id=${movie.id} href=${movie.id}>`
            }
        })
    }


    function createMovieContainer(movies) {
        var movieElement = document.createElement('div');
        movieElement.setAttribute('class', 'movie')
        movieElement.innerHTML = '';
        const movieTemplate = `
        <section classs="section">
        ${movieSection(movies)}
        </section>
        <div class="content">
        <p id="content-close">X</p>
        </div>`;
        movieElement.innerHTML = movieTemplate;
        return movieElement;
    }

    function generateUrl(path) {
        const url = `https://api.themoviedb.org/3${path}?api_key=f322b9b92569cc1303fde9c344d90d40&language=en-US`;
        return url;
    }


    $.ajax({
        method: 'GET',
        url: trending
    }).done(function(data) {
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        $('.trending').html(movieBlock);

    })


    $("form").submit(function(event) {
        event.preventDefault();
        const value = $(".search").val();
        const path = `/search/movie`;
        $.ajax({
            method: 'GET',
            url: generateUrl(path) + "&query=" + value
        }).done(function(data) {
            const movies = data.results;
            const movieBlock = createMovieContainer(movies);
            $('.searchresult').html(movieBlock);


        })

    })

    $.ajax({
        method: 'GET',
        url: upcoming
    }).done(function(data) {
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        $('.upcoming').html(movieBlock);

    })


    $.ajax({
        method: 'GET',
        url: toprated
    }).done(function(data) {
        console.log(data)
        const movies = data.results;
        const movieBlock = createMovieContainer(movies);
        $('.toprated').html(movieBlock);

    })

    $('div').click(function(event) {

        const target = event.target;
        if (target.tagName.toLowerCase = 'img') {

            const section = event.target.parentElement;
            const content = section.nextElementSibling;
            content.classList.add('content-display')
        }

        if (target.id === 'content-close') {
            const content = event.target.parentElement;
            content.classList.remove('content-display')
        }

        const id = target.dataset.movieId;
        console.log(id);
        const path = `/movie/${id}`;
        $.ajax({
            method: 'GET',
            url: generateUrl(path)
        }).done(function(data) {
            const movies = data.results;
            const movieBlock = createMovieContainer(movies);
            $('.content').html(movieBlock);
            console.

        })

    })






})