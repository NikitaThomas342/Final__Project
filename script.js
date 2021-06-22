function addMovieToTable(movie){
    const row = document.getElementById('searchTable')

    let cell = document.createElement('div')
    cell.classList.add("col-sm-6","mx-auto")
    cell.style.margin="12px"
    cell.addEventListener('dblclick',function(){
        let confirmAdd = confirm(`Do you want to add "${movie.title}" to your list?`)
        if(confirmAdd){
            addSearchToDB(movie)
        }
    })

        let cardint = document.createElement('div')
        cardint.classList.add("card","text-white","bg-dark")

            let cardbody = document.createElement('div')
            cardbody.classList.add("card-body")
                let image = document.createElement('img')
                image.src = movie.image_url
                image.classList.add("rounded","mx-auto","d-block")

                let brea = document.createElement('br')

                let title = document.createElement('h5')
                title.classList.add("card-title")
                title.innerHTML = movie.title

                let synopsis = document.createElement('p')
                synopsis.classList.add("card-text")
                synopsis.innerHTML = "Synopsis : " + movie.synopsis

                let type = document.createElement('p')
                type.classList.add("card-text")
                type.innerHTML = "Type : " + movie.type

                let episode = document.createElement('p')
                episode.classList.add("card-text")
                episode.innerHTML = "Episodes : " + movie.episodes

                let rated = document.createElement('p')
                rated.classList.add("card-text")
                rated.innerHTML = "Rated : " + movie.rated
            cardbody.appendChild(image)
            cardbody.appendChild(brea)
            cardbody.appendChild(title)
            cardbody.appendChild(synopsis)
            cardbody.appendChild(type)
            cardbody.appendChild(episode)
            cardbody.appendChild(rated)
        cardint.appendChild(cardbody)
    cell.appendChild(cardint)

    row.appendChild(cell)
}

document.getElementById('searchButton').addEventListener('click',function(){
    let query = document.getElementById('searchValue').value
    getSearchQuery(query)
})

function getSearchQuery(query){
    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`).then((response) =>{
        return response.json()
    }).then( data => {
        searchResultList(data.results)
    })
}

function searchResultList(searchdatalist){
    const searchTable = document.getElementById('searchTable')
    searchTable.innerHTML = ''
    for(searchdata of searchdatalist){
        addMovieToTable(searchdata)
    }
}

function getMyListQuery(){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110342`).then((response)=>{
        return response.json()
    }).then( data=>{
        myListList(data)
    })
}

function myListList(mylistlist){
    const myListTable = document.getElementById('myListTable')
    myListTable.innerHTML = ''
    for(mylist of mylistlist){
        addMyListToTable(mylist)
    }
}

function addSearchToDB(movie){
    var id=1
    let body=`{"url":"${movie.url}","image_url":"${movie.image_url}","title":"${movie.title}","synopsis":"${movie.synopsis}","type":"${movie.type}","episodes":"${movie.episodes}","score":"${movie.score}","rated":"${movie.rated}","id":"${id}"}`
    fetch(`https://se104-project-backend.du.r.appspot.com/movies `,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"id":"632110342","movie":${body}}`
        }).then(response=>{
            if(response.status == 200){
                return response.json()
            }else{
                throw Error(response.statusText)
            }
        }).then(data=>{
            alert('Success')
            id++
        }).catch(error=>{
            alert('Error')
        })
}

function addMyListToTable(movie){
    const row2 = document.getElementById('myListTable')

    let cell = document.createElement('div')
    cell.classList.add("col-sm-6","mx-auto")
    cell.style.margin="12px"

        let cardint = document.createElement('div')
        cardint.classList.add("card","text-white","bg-dark")

            let cardbody = document.createElement('div')
            cardbody.classList.add("card-body")
                let image = document.createElement('img')
                image.src = movie.image_url
                image.classList.add("rounded","mx-auto","d-block")

                let brea = document.createElement('br')

                let title2 = document.createElement('div')
                title2.classList.add("d-flex","justify-content-center","mx-auto")

                let title = document.createElement('h5')
                title.classList.add("card-title")
                title.innerHTML = movie.title
                title2.appendChild(title)

                let buttons = document.createElement('div')
                buttons.classList.add("d-flex","justify-content-center","mx-auto")

                let detail = document.createElement('button')
                detail.classList.add("btn","btn-primary")
                detail.style.margin="10px";
                detail.innerHTML = "Details"
                detail.addEventListener('click',function(){
                    getdetail(movie.id)
                })
                buttons.appendChild(detail)


                let del = document.createElement('button')
                del.classList.add("btn","btn-danger")
                del.style.margin="10px";
                del.innerHTML = "Delete"
                del.addEventListener('click',function(){
                    let confirmDel = confirm(`Are you sure you want to delete ${movie.title}?`)
                    if(confirmDel){
                        delmovie(movie.id)
                    } 
                    
                })
                buttons.appendChild(del)
            cardbody.appendChild(image)
            cardbody.appendChild(brea)
            cardbody.appendChild(title2)
            cardbody.appendChild(buttons)

        cardint.appendChild(cardbody)

    cell.appendChild(cardint)

    row2.appendChild(cell)
}

function delmovie(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110342&&movieId=${id}`,{
        method: 'DELETE'
    }).then(response =>{
        if(response.status == 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data =>{
        alert(`Movie ${data.title} is now deleted`)
        getMyListQuery()
    }).catch(error =>{
        alert('Error')
    })
}

var mylist = document.getElementById('myListTable')
var browse = document.getElementById('searchTable')
var search = document.getElementById('searchBar')
var detail = document.getElementById('Detail')

function onLoad(){
    showBrowse()
}

function hideBrowse(){
    document.getElementById('searchTable').style.display='none'
    search.style.display='none'
}

function showBrowse(){
    document.getElementById('searchTable').style.display='flex'
    search.style.display='flex'
}

function hideList(){
    document.getElementById('myListTable').style.display='none'
    document.getElementById('Detail').style.display='none'
}

function showList(){
    document.getElementById('myListTable').style.display='flex'
    document.getElementById('Detail').style.display='none'
}

function showDet(){
    document.getElementById('myListTable').style.display='none'
    document.getElementById('Detail').style.display='flex'
}

document.getElementById('BrowseNav').addEventListener('click',function(){
    hideList()
    showBrowse()
})

document.getElementById('MyListNav').addEventListener('click',function(){
    hideBrowse()
    showList()
    getMyListQuery()
})

function getdetail(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110342/${id}`)
    .then((response) => {
        return response.json()
    }).then(data => {
        const detail = document.getElementById('Detail')
        detail.innerHTML = ''
        showDet()
        showDetail(data);
    })
}

function showDetail(movie){
    const row = document.getElementById('Detail')

    let button = document.createElement('button')
    button.classList.add("btn","btn-primary")
    button.style.margin="10px"
    button.innerHTML="Back"
    button.addEventListener('click',function(){
        showList()
    })

    let cell = document.createElement('div')
    cell.classList.add("col-sm-6","mx-auto")
    cell.style.margin="12px"

        let cardint = document.createElement('div')
        cardint.classList.add("card","text-white","bg-dark")

            let cardbody = document.createElement('div')
            cardbody.classList.add("card-body")
                let image = document.createElement('img')
                image.src = movie.image_url
                image.classList.add("rounded","mx-auto","d-block")

                let brea = document.createElement('br')

                let title = document.createElement('h5')
                title.classList.add("card-title")
                title.innerHTML = movie.title

                let synopsis = document.createElement('p')
                synopsis.classList.add("card-text")
                synopsis.innerHTML = "Synopsis : " + movie.synopsis

                let type = document.createElement('p')
                type.classList.add("card-text")
                type.innerHTML = "Type : " + movie.type

                let episode = document.createElement('p')
                episode.classList.add("card-text")
                episode.innerHTML = "Episodes : " + movie.episodes

                let rated = document.createElement('p')
                rated.classList.add("card-text")
                rated.innerHTML = "Rated : " + movie.rated
            cardbody.appendChild(image)
            cardbody.appendChild(brea)
            cardbody.appendChild(title)
            cardbody.appendChild(synopsis)
            cardbody.appendChild(type)
            cardbody.appendChild(episode)
            cardbody.appendChild(rated)
        cardint.appendChild(button)
        cardint.appendChild(cardbody)
    
    cell.appendChild(cardint)
    
    row.appendChild(cell)
}