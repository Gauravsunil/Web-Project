// function for fetching api data
async function fetchApi(url){
    let res=await fetch(url);
    return res.json();
}

// Trending movies for banner 

async function getTrendingMovies(){
    let url="https://api.themoviedb.org/3/trending/movie/week?api_key=f2389eed03b839edeb2178897fa33c6d";
    
    fetchApi(url).then(res=>{
        setMovieBanner(res.results[0]);
        setTrendingSlider(res.results);
    })
}
getTrendingMovies().then(()=>{
    getPopularMovies();
});

function setMovieBanner(movie){
    let bannerDiv=document.querySelector('.banner');
    bannerDiv.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
    bMovieTitle.textContent=movie.title;
    bMovieOverview.textContent=movie.overview;
    bMovieGenre.textContent="Action";
    playTrailer.innerHTML=`<i class="material-icons">play_arrow</i>`;
    let playBtn=document.querySelector('#playTrailer');
    playBtn.onclick=()=>{
        let url=`https://api.themoviedb.org/3/movie/${movie.id}+/videos?api_key=f2389eed03b839edeb2178897fa33c6d&language=en-US`
        getVideos(url).then((result)=>{
            let trailerScreen=document.querySelector('.trailerScreen');
            let iframe=document.querySelector('.trailerScreen iframe');
            iframe.setAttribute('src',`https://www.youtube.com/embed/${result.results[0].key}?version=3&enablejsapi=1`)    
            trailerScreen.style.display="block";
            trailerScreen.onclick=()=>{
                iframe.setAttribute('src',``)
                trailerScreen.style.display="none";
            } 
                
        });
    }
}

function setTrendingSlider(moviesArr){
    let movies=moviesArr.slice(0,7);
    let slider = document.querySelector('.nowTrending .slider')
    movies.forEach((item,i)=>{
        let div=document.createElement('div');
        div.setAttribute('class','slide');
        let posterPath=`https://image.tmdb.org/t/p/w200${item.poster_path}`;
        div.style.backgroundImage=`url(${posterPath})`;
        slider.appendChild(div);

    let slide= document.querySelectorAll('.nowTrending .slider .slide')
    slide[i].addEventListener('mouseover',()=>{
            setMovieBanner(movies[i]);
    })
    div.onclick=()=>{
        window.location.href=`file:///C:/Users/Gaurav/Desktop/sugoi-site/single.html?id=${item.id}&type=movie`;
    }
    })
}
// Fetch Popular MOvies

function getPopularMovies(){
    let url="https://api.themoviedb.org/3/movie/popular?api_key=f2389eed03b839edeb2178897fa33c6d&page=1";

    fetchApi(url).then((res)=>{
        setPopularSlider(res.results);
    })
}
function setPopularSlider(movies){
    let parent=document.querySelector('.popularMovies .slider');
    movies.forEach(item=>{
        let slide=document.createElement('div');
        parent.appendChild(slide); 
        slide.innerHTML=`<img src="https://image.tmdb.org/t/p/w200/${item.poster_path}">`;
        slide.onclick=()=>{
            window.location.href=`/sugoi-site/single.html?id=${item.id}&type=movie`;
        }
    })
}

// Fetch To Rated Movies

function getTopRatedMovies(){
let url=`https://api.themoviedb.org/3/movie/top_rated?api_key=f2389eed03b839edeb2178897fa33c6d`;
fetchApi(url).then((res)=>{
        setTopRatedSlider(res.results);
    })
}
function setTopRatedSlider(movies){
    let parent=document.querySelector('.topRatedMovies .slider');
    movies.forEach(item=>{
        let slide=document.createElement('div');
        parent.appendChild(slide); 
        slide.innerHTML=`<img src="https://image.tmdb.org/t/p/w200/${item.poster_path}">`;
        slide.onclick=()=>{
            window.location.href=`/sugoi-site/single.html?id=${item.id}&type=movie`;
        }
    })
}
getTopRatedMovies();



// Fetch Trending TV Shows
function getTrendingTV(){
    let url=`https://api.themoviedb.org/3/trending/tv/week?api_key=f2389eed03b839edeb2178897fa33c6d`;
    fetchApi(url).then((res)=>{
        setDayTrending(res.results[0]);
            setTrendingTVSlider(res.results);
        })
    }
    function setDayTrending(show){
        let backdrop=document.querySelector('.tvSeries .backdrop img');
        backdrop.setAttribute('src',`https://image.tmdb.org/t/p/original/${show.backdrop_path}`)
        let title=document.querySelector('.tvSeries .details #bTVTitle');
        let overview=document.querySelector('.tvSeries .details #bTVOverview');

        title.innerText=show.name;
        overview.innerText=show.overview;

        playTvTrailer.innerHTML=`<i class="material-icons">play_arrow</i>`;
        let playTvBtn=document.querySelector('#playTvTrailer');
        playTvBtn.onclick=()=>{
        let url=`https://api.themoviedb.org/3/tv/${show.id}+/videos?api_key=f2389eed03b839edeb2178897fa33c6d&language=en-US`
        getVideos(url).then((result)=>{
            let trailerScreen=document.querySelector('.trailerScreen');
            let iframe=document.querySelector('.trailerScreen iframe');
            iframe.setAttribute('src',`https://www.youtube.com/embed/${result.results[0].key}?version=3&enablejsapi=1`)    
            trailerScreen.style.display="block";
            trailerScreen.onclick=()=>{
                iframe.setAttribute('src',``)
                trailerScreen.style.display="none";
            } 
                
        });
    }
    }
    function setTrendingTVSlider(movies){
        let parent=document.querySelector('.trendingTV .slider');
        movies.forEach(item=>{
            let slide=document.createElement('div');
            parent.appendChild(slide); 
            slide.innerHTML=`<img src="https://image.tmdb.org/t/p/w200/${item.poster_path}">`;
            slide.onclick=()=>{
                window.location.href=`/sugoi-site/single.html?id=${item.id}&type=tv`;
            }
        })
    }
   getTrendingTV();
// Fetch on air TV Shows
function getOnAirTV(){
    let url=`https://api.themoviedb.org/3/tv/on_the_air?api_key=f2389eed03b839edeb2178897fa33c6d`;
    fetchApi(url).then((res)=>{
            setOnAirTVSlider(res.results);
        })
    }
    function setOnAirTVSlider(movies){
        let parent=document.querySelector('.onAirTV .slider');
        movies.forEach(item=>{
            let slide=document.createElement('div');
            parent.appendChild(slide); 
            slide.innerHTML=`<img src="https://image.tmdb.org/t/p/w200/${item.poster_path}">`;

            slide.onclick=()=>{
                window.location.href=`/sugoi-site/single.html?id=${item.id}&type=tv`;
            }
            
        })
    }

    getOnAirTV();
// Fetch Top Rated TV Shows
function getTopRatedTV(){
    let url=`https://api.themoviedb.org/3/tv/top_rated?api_key=f2389eed03b839edeb2178897fa33c6d`;
    fetchApi(url).then((res)=>{
            setTopRatedTVSlider(res.results);
        })
    }
    function setTopRatedTVSlider(movies){
        let parent=document.querySelector('.topRated  .slider');
        movies.forEach(item=>{
            let slide=document.createElement('div');
            parent.appendChild(slide); 
            slide.innerHTML=`<img src="https://image.tmdb.org/t/p/w200/${item.poster_path}">`;

            slide.onclick=()=>{
                window.location.href=`/sugoi-site/single.html?id=${item.id}&type=tv`;
            }

        })
    }
getTopRatedTV();

// Search Movies or TV shows

async function getSearchData(url){
    let response=await fetch(url);
    return response.json();
}
function setSearchResult(movie){
    console.log(movie);
    let parent = document.querySelector('.searchResult');
    let result=document.createElement('div');
    result.innerHTML=`<div class="poster"></div> <div class="details"></div>`;
    parent.append(result);
    let posterDiv=document.querySelector('.searchResult>div:last-of-type .poster');
    let backdropPath=`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`;
    posterDiv.style.backgroundImage=`url(${backdropPath})`;
    let detailsDiv=document.querySelector('.searchResult>div:last-of-type .details');
    let title=null;
    if(movie.media_type=="tv")
    title=movie.original_name;
    else
    title=movie.title;
    detailsDiv.innerHTML=`<p><a>${title}</a></p>`;
    result.onclick=()=>{
        window.location.href=`/sugoi-site/single.html?id=${movie.id}&type=${movie.media_type}`;
    }
}
searchForm.onsubmit=function searchFunction(e){
    e.preventDefault();
    let queryBox=document.querySelector('input');
    let query=queryBox.value;

    let parent = document.querySelector('.searchResult');
    parent.innerHTML="";

    let url=`https://api.themoviedb.org/3/search/multi?api_key=f2389eed03b839edeb2178897fa33c6d&query=${query}&page=1`;
    getSearchData(url).then((data)=>{
        results=data.results;
        let newR=[];
        results.forEach(item=>{
            if(item.media_type!="person" && item.backdrop_path!=null)
            newR.push(item);
        })
        if(newR.length==0){
            let parent = document.querySelector('.searchResult');
            parent.innerHTML="<h3>No Results</h3>"
        } else {
            newR.forEach(item=>{
                setSearchResult(item);
            })
        }
    });
}


async function getVideos(url){
    let data = await fetch(url);
    return data.json();
}