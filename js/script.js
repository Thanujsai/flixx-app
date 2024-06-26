const global = {
    currentPage : window.location.pathname,
    search: {
      term: '',
      type: '',
      page: 1,
      totalPages: 1,
      totalResults: 0
    },
    api: {
      apiKey : '3e7aa45f43cc96777cf7126767f67911',
      apiUrl : 'https://api.themoviedb.org/3/'
  
    }
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

//search movies and tv shows
async function search(){
  const queryString = window.location.search;                      //?type=movie&search-term=   when we hit the button
  console.log(queryString)
  const urlParams = new URLSearchParams(queryString); //array 
  console.log(`type is ${urlParams.get('type')}`)

  global.search.type = urlParams.get('type')
  global.search.term = urlParams.get('search-term') //whatever we have given as input

  if(global.search.term !== '' && global.search.term !== null) {
    //make request and display results
    const { results, total_pages, page, total_results } = await searchAPIData();//return the array results
    console.log('results')
    console.log(results);

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if(results.length === 0){
      showAlert('No results found');
      return;
    }
    
    displaySearchResults(results);
    document.querySelector('#search-term').value='';
  }
  else{
    showAlert('Please enter a search item');
  }
}

//display search results
function displaySearchResults(results) {

  //clear prev results before showing new results when hit next
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
      ${
        result.poster_path
        ? `<img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" class="card-img-top" alt="${global.search.type === 'movie' ? result.title : result.name}" />` : `
        <img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="Movie Title"
      />
        `
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
      </p>
    </div>
    `;

    document.querySelector('#search-results-heading').innerHTML = `
      <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
    `;
    document.querySelector('#search-results').appendChild(div);
});

  displayPagination();
}

//create and display pagination for search results
function displayPagination(){
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `

  document.querySelector('#pagination').appendChild(div);

  //disable prev button if on page 1
  if(global.search.page === 1){
    document.querySelector('#prev').disabled = true;
  }

  //disable next button if on last page
  if(global.search.page === global.search.totalPages){
    document.querySelector('#next').disabled = true;
  }

  //next page
  document.querySelector('#next').addEventListener('click',async () => {
    global.search.page++;
    const {results,total_pages} = await searchAPIData();
    displaySearchResults(results);
  })

  //prev page
  document.querySelector('#prev').addEventListener('click',async () => {
    global.search.page--;
    const {results,total_pages} = await searchAPIData();
    displaySearchResults(results);
  })
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

//show alert
function showAlert(message,className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert',className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000)//remoe the alert after 3 secs
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
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();

  hideSpinner();
  return data;

}

//make request to search
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  
  const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`);
  const data = await response.json();

  console.log('in search api data')
  console.log(data)
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
            search();
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded',init);
document.addEventListener('DOMContentLoaded',highlightActiveLink);