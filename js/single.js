let urlParams=new URLSearchParams(window.location.search);
let omdbAPIkey="acc846eb";
// let tmdbID=76341;
let tmdbID=urlParams.get('id');
let mediaType=urlParams.get('type');

let url=`https://api.themoviedb.org/3/${mediaType}/${tmdbID}?api_key=f2389eed03b839edeb2178897fa33c6d&append_to_response=videos,images`


async function fetchApi(url){
    let res=await fetch(url);
    return res.json();
}

// Fecth single TV/Movie Details

fetchApi(url).then((res)=>{
        let u=`https://api.themoviedb.org/3/${mediaType}/${res.id}/external_ids?api_key=f2389eed03b839edeb2178897fa33c6d`;
        console.log(u);
        fetchApi(u).then((r)=>{
            res.imdb=r.imdb_id;
            console.log(r);
            if(mediaType=='tv'){
                res.title=res.name;
                res.release_date=res.first_air_date;
                setSingle(res);
            }else {
                setSingle(res);
            }
        })
})

function setSingle(response){
    let res=response;    
    let urlOMDB=`http://omdbapi.com/?apikey=${omdbAPIkey}&i=${res.imdb}`;
    console.log(urlOMDB);
    fetchApi(urlOMDB).then((omdbRes)=>{
        res.genre=omdbRes.Genre;
        res.ratings=omdbRes.Ratings;
        console.log(omdbRes);
        console.log(res);
       setDetails(res);
    })
}
//Set Details Tabs
function setDetails(res){
    let title=document.querySelector('.singleName');
    title.innerText=res.title;
    let release=document.querySelector('.release');
    let genre=document.querySelector('.genre');
    release.innerText=`(${res.release_date})`;
    genre.innerText=`${res.genre}`;

    // if(res.ratings){
        if(res.ratings.length>=1)createRatingCanvas(res.ratings[0].Source,parseFloat(res.ratings[0].Value)*10);
        if(res.ratings.length>=2)createRatingCanvas(res.ratings[1].Source,parseInt(res.ratings[1].Value));
        if(res.ratings.length>=3)createRatingCanvas(res.ratings[2].Source,parseInt(res.ratings[2].Value));

    // }
    

    let overview=document.querySelector('.overview');
    overview.innerText=res.overview

    let container=document.querySelector('.container .single .left');
    let poster=document.createElement('img');
    poster.setAttribute('src',`https://image.tmdb.org/t/p/w500/${res.poster_path}`)
    container.appendChild(poster);
    setVideos(res.videos.results);
    setPosters(res.images);
    setCredits(res.id);
    setSimilar(res);
}

// Set Videos Tabs
function setVideos(res){
    let frame=document.querySelector('.videoFrame iframe');
    frame.setAttribute('src',`https://www.youtube.com/embed/${res[0].key}`);

    let videos=document.querySelector('.otherVideos');
    res.forEach(item=>{
        let video=document.createElement('div');
        videos.appendChild(video);
        let img=document.createElement('img');
        img.setAttribute('src',`http://i3.ytimg.com/vi/${item.key}/maxresdefault.jpg`)
        video.appendChild(img);
        let videoType=document.createElement('div');
        videoType.innerText=item.type;
        video.appendChild(videoType);

        video.onclick=()=>{
            frame.setAttribute('src',`https://www.youtube.com/embed/${item.key}`);
        };
    })
}


// Set Posters Tabs
function setPosters(res){
    let backdrop=document.querySelector('.backdrops');
    let posters=document.querySelector('.posters'); 

    res.backdrops.forEach(item=>{
        let image=document.createElement('div');
        backdrop.appendChild(image);
        let img=document.createElement('img');
        img.setAttribute('src',`https://image.tmdb.org/t/p/w400/${item.file_path}`);
        image.appendChild(img);
    })
    
    res.posters.forEach(item=>{
        let image=document.createElement('div');
        posters.appendChild(image);
        let img=document.createElement('img');
        img.setAttribute('src',`https://image.tmdb.org/t/p/w200/${item.file_path}`);
        image.appendChild(img);
    })

}

// function for Movie Credits

function setCredits(id){
    let url=`
    https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=f2389eed03b839edeb2178897fa33c6d`;
    fetchApi(url).then((res)=>{
        let casts=document.querySelector('.casts');
        res.cast.forEach(item=>{
            let cast=document.createElement('div');           
            let pic=document.createElement('img');
            if(item.profile_path!=null)
            pic.setAttribute(`src`,`https://image.tmdb.org/t/p/w200/${item.profile_path}`);
            cast.appendChild(pic);            
            let character=document.createElement('p');
            character.innerText=`Character: ${item.character}`;
            let actor=document.createElement('p');            
            actor.innerText=`Played By: ${item.name}`;
            cast.appendChild(character);
            cast.appendChild(actor);
            casts.appendChild(cast);
        })
        res.crew.forEach(item=>{
            checkItem(item);
        })
    })
}
function checkItem(item){
    if(typeof(item)=='object'){
        let crews=document.querySelector('.crews');
        let crew=document.createElement('div');
        let pic=document.createElement('img');
        if(item.profile_path!=null){
        pic.setAttribute(`src`,`https://image.tmdb.org/t/p/w200/${item.profile_path}`);
        crew.appendChild(pic);}            
        let department=document.createElement('p');
        department.innerText=`Department: ${item.department}`;
        let job=document.createElement('p');            
        job.innerText=`Job: ${item.job}`;
        let name=document.createElement('p');            
        name.innerText=`Name: ${item.name}`;
        crew.appendChild(department);
        crew.appendChild(job);
        crew.appendChild(name);
        crews.appendChild(crew);
    } else {
        item.forEach(i=>{
            checkItem(i);
        })
    }
}


// Set Similar Tabs

function setSimilar(res){
    let url=`https://api.themoviedb.org/3/${mediaType}/${res.id}/similar?api_key=f2389eed03b839edeb2178897fa33c6d`;
    fetchApi(url).then((response)=>{
        let similars=document.querySelector('.similars');
        response.results.forEach(item=>{
            if(item.name)
            item.title=item.name;
            let similar=document.createElement('div');
            let img=document.createElement('img');
            img.setAttribute('src',`https://image.tmdb.org/t/p/w200/${item.backdrop_path}`);
            let name=document.createElement('p');
            name.innerText=item.title;
            similar.appendChild(img);
            similar.appendChild(name);
            similars.appendChild(similar);
            similar.addEventListener('click',()=>{
                window.location.href=`/sugoi-site/single.html?id=${item.id}&type=${mediaType}`;                
            })
        })
    })
    let url2=`https://api.themoviedb.org/3/${mediaType}/${res.id}/recommendations?api_key=f2389eed03b839edeb2178897fa33c6d`;
    fetchApi(url2).then((response)=>{

        let recommendations=document.querySelector('.recommendations');
        response.results.forEach(item=>{
            if(item.name)
            item.title=item.name;
            let recommended=document.createElement('div');
            let img=document.createElement('img');
            img.setAttribute('src',`https://image.tmdb.org/t/p/w200/${item.backdrop_path}`);
            let name=document.createElement('p');
            name.innerText=item.title;
            recommended.appendChild(img);
            recommended.appendChild(name);
            recommendations.appendChild(recommended);
            recommended.addEventListener('click',()=>{
                window.location.href=`/sugoi-site/single.html?id=${item.id}&type=${mediaType}`;                
            })
        })
    })
}

// function for Ratings canvas

function createRatingCanvas(source,value){
    let ratings=document.querySelector('.ratings');
    let rating=document.createElement('div');
    ratings.appendChild(rating);
    let canvas=document.createElement('canvas');
    rating.appendChild(canvas);

    let name=document.createElement('div');
    rating.appendChild(name);
    
    name.innerText=`${source}`;
    canvas.width=105;
    canvas.height=105;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(50, 50, 25, 0, 2*Math.PI);
    ctx.strokeStyle='white';
    ctx.lineWidth=7;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(50, 50, 25, -Math.PI/2, value/100*2*Math.PI-Math.PI/2);
    ctx.strokeStyle='#333';
    ctx.lineWidth=3;
    ctx.stroke();
    ctx.font = "15px Georgia";
    ctx.fillStyle = "white";
    ctx.fillText(`${value}%`, 38, 55);
}


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

