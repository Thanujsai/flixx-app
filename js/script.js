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
    console.log('display popular shows')
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
            show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />` : `
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
            <small class="text-muted">First Air Date: ${show.first_air_date}</small>
          </p>
        </div>
        `;

    document.querySelector('#popular-shows').appendChild(div);
    });
}

//display movie details
async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];//output of window.location.search => ?id=823464
    console.log('in movie details page')
    console.log(movieId)

    const movie = await fetchAPIData(`movie/${movieId}`);
    console.log(movie)
    console.log(movie.genres)

    //Overlay for background image
    displayBackgroundImage('movie',movie.backdrop_path)
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
        movie.poster_path
        ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />` : `
        <img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
      />
        `
      }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)}/ 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
  </div>
    `;

    document.querySelector('#movie-details').appendChild(div);
}

//display show details
async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];//output of window.location.search => ?id=823464
    console.log('in show details page')
    console.log(showId)

    const show = await fetchAPIData(`tv/${showId}`);
    console.log(show)

    //Overlay for background image
    displayBackgroundImage('tv',show.backdrop_path)
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
        show.poster_path
        ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />` : `
        <img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
      />
        `
      }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)}/ 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
      <li><span class="text-secondary">Number Of Seasons:</span> ${show.number_of_seasons}</li>
      <li><span class="text-secondary">Last Episode to AIR:</span> ${show.last_episode_to_air.air_date}</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${show.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
  </div>
    `;

    document.querySelector('#show-details').appendChild(div);
}
function addCommasToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//display backdrop on details page
function displayBackgroundImage(type, backgroundPath){
    console.log('display background image');
    console.log(backgroundPath)
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if(type === 'movie'){
        console.log('display background image movie');
        document.querySelector('#movie-details').appendChild(overlayDiv);
    }
    else{
        console.log('display background show');
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

//display slider movies
async function displaySlider(){
  const {results} = await fetchAPIData('movie/now_playing');
  
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });

}

function initSwiper(){
  const swiper = new Swiper('.swiper',{
    slidesPerView : 1,
    spaceBetween: 30,
    freeMode: true,//we can drag the slider to move around
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {//resize as per the window size, if we change the window size of the browser number of movies shown in slider will be changed
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
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
            displaySlider();
            break;
        case '/shows.html':
            console.log('Shows');
            displayPopularShows();
            break;
        case '/tv-details.html':
            console.log('tv details');
            displayShowDetails();
            break;
        case '/movie-details.html':
            console.log('movie details');
            displayMovieDetails();
            break;
        case '/search.html':
            console.log('search')
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded',init);
document.addEventListener('DOMContentLoaded',highlightActiveLink);