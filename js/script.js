const global = {
    currentPage : window.location.pathname
}

console.log(global.currentPage);

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