const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=33d9411b7cd0ed8e8e73f4993ccce339&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=33d9411b7cd0ed8e8e73f4993ccce339&query="'

const main=document.getElementById('main')
const form=document.getElementById('form')
const search=document.getElementById('search')

getmovie(API_URL)

async function getmovie(url)
{
    const req=await fetch(url)
    const res=await req.json()
    showmovies(res.results);
}

function showmovies(movie)
{
    main.innerHTML=""
    movie.forEach(m => {
        const {title, poster_path, vote_average, overview}=m
        const newmovie=document.createElement('div')
        newmovie.classList.add('movie')
        newmovie.innerHTML=
        `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${movierating(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(newmovie)
    });
}

function movierating(vote)
{
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


form.addEventListener('submit',function(e)
{
    e.preventDefault()
    const searchedmovie=search.value
    if(searchedmovie && searchedmovie!=='')
        {
           getmovie(SEARCH_API + searchedmovie)
           search.value=""
        }
        else
        {
            window.location.reload()
        }
})



