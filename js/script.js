const global = {
    currentPage : window.location.pathname
}

console.log(global.currentPage);

async function displayPopularMovies(){
    console.log('display popular movies')
    const result= await fetchAPIData('movie/popular'); //output = {page: 1, results: Array(20), total_pages: 43380, total_results: 867583}
    const { results } = await fetchAPIData('movie/popular'); //curly braces around results to get the array of results(movies) directly
    console.log(results)
    console.log(result)

    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />` : `
            <img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />
            `
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `;

    document.querySelector('#popular-movies').appendChild(div);
    });
}

//display 20 popular tv shows
async function displayPopularShows(){
    console.log('display popular movies')
    const result= await fetchAPIData('tv/popular'); //output = {page: 1, results: Array(20), total_pages: 43380, total_results: 867583}
    const { results } = await fetchAPIData('tv/popular'); //curly braces around results to get the array of results(movies) directly
    console.log(results)
    console.log(result)

    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
          ${
            movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${show.name}" />` : `
            <img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />
            `
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `;

    document.querySelector('#popular-movies').appendChild(div);
    });
}

//fetch data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = '3e7aa45f43cc96777cf7126767f67911';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();

    hideSpinner();
    return data;

}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

//highlight active link: top right movies or tv shows
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    console.log(`link is `)
    console.log(links)
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active')
        }
    })
    if(global.currentPage == '/'){
        console.log('current page is movies')
        console.log(document.getElementById('movies'));
    }
    else if(global.currentPage == '/shows.html'){
        console.log('current page is shows')
        console.log(document.getElementById('movies'));
    }
}

//init app
function init() {
    switch(global.currentPage) {
        case '/':
        case '/index.html':
            console.log('Home');
            displayPopularMovies();
            break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/tv-details.html':
            console.log('tv details');
            break;
        case '/movie-details.html':
            console.log('movie details');
            break;
        case '/search.html':
            console.log('search')
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded',init);
document.addEventListener('DOMContentLoaded',highlightActiveLink);