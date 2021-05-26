const search = () => {
    let searchQuery = document.querySelector("input[type=text]").value.toLowerCase()
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchQuery}`)
    .then(response => response.json())
    .then(res => {
        generatePage(res, searchQuery)
    })
}

const searchArtist = (obj, query) => {
    searchedArtists = []
    const songsFound = obj.data
    songsFound.forEach(
        song => {
            let songArtist = song.artist.name.toLowerCase()
            if (songArtist.includes(query)) {
                searchedArtists.push(song.artist)
            }
        }
    )
    let idsArr = searchedArtists.map(a => a.id)
    let uniqIds = [...new Set(idsArr)]
    let uniqueArtists = uniqIds.map( unId => searchedArtists.find( a => a.id === unId))
    return uniqueArtists
}

const searchAlbum = (obj, query) => {
    searchedAlbums = []
    const songsFound = obj.data
    songsFound.forEach(
        song => {
            let songAlbum = song.album.title.toLowerCase()
            if (songAlbum.includes(query)) {
                searchedAlbums.push(song.album)
            }
        }
    )
    let idsArr = searchedAlbums.map(a => a.id)
    let uniqIds = [...new Set(idsArr)]
    let uniqueAlbums = uniqIds.map( unId => searchedAlbums.find( a => a.id === unId))
    console.log(uniqueAlbums)
    console.log(uniqueAlbums)
    return uniqueAlbums
}

const generatePage = (obj, query) => {
    let albums = searchAlbum(obj, query)
    let artists = searchArtist(obj, query)
    
    const page = document.querySelector('#Album-Page')
    page.innerHTML = ''
    if (artists.length > 0) {
        const row = document.createElement('div')
        row.classList.add('row')
        const title = document.createElement('h5')
        title.classList.add('col-12')
        title.innerText = 'Artists'
        page.appendChild(row)
        row.appendChild(title)
        artists.forEach(
            art => {
                console.log(art.name)
                let contDiv = document.createElement('div')
                contDiv.classList.add('p-3')
                contDiv.innerHTML = `
                <a href="artist.html?q=${art.id}">
                <div class="card col-12 p-0 custom-card">
                  <img class="card-img img-fluid w-100" src=${art.picture_medium} alt="Card image cap">
                  <div class="card-body">
                    <p class="card-text">${art.name}</p>
                  </div>
                </div></a>
                `
                row.appendChild(contDiv)
            }
        )
    }
    if (albums.length > 0) {
        const row = document.createElement('div')
        row.classList.add('row')
        const title = document.createElement('h5')
        title.classList.add('col-12')
        title.innerText = 'Albums'
        page.appendChild(row)
        row.appendChild(title)
        albums.forEach(
            album => {
                let contDiv = document.createElement('div')
                contDiv.classList.add('p-3')
                contDiv.innerHTML = `
                <a href="album.html?q=${album.id}">
                <div class="card col-12 p-0 custom-card">
                  <img class="card-img- img-fluid" src=${album.cover_medium} alt="Card image cap">
                  <div class="card-body">
                    <p class="card-text text-black">${album.title}</p>
                  </div>
                </div></a>`

                row.appendChild(contDiv)
            }
        )
    }
}

