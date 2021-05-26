
window.onload =()=>{
defaultCards()
}

const defaultCards = () =>{
    const content = document.getElementById("Album-Page")
    content.innerHTML = `<h3 class="marginTop titleMobileHomepage">#THROWBACKTHURSDAY</h3>
        <div class="row mb-3 text-center">
            <div class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
            <img
                src="Img/Italian Karaoke.jpg"
                class="img-fluid mb-1 homePageImage"
                alt=""
            />
            <p class="mt-2 font-weight-bold">Italian Karaoke</p>
            </div>
            <div class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
            <img
                src="Img/Lyricists.jpg"
                class="img-fluid mb-1 homePageImage"
                alt=""
            />
            <p class="mt-2 font-weight-bold">Lyricists</p>
            </div>
            <div class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
            <img
                src="Img/Italy's frequent rotation.jpg"
                class="img-fluid mb-1 homePageImage"
                alt=""
            />
            <p class="mt-2 font-weight-bold">Italy's Frequent Rotation</p>
            </div>
            <div class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
            <img
                src="Img/00s Italy.jpg"
                class="img-fluid mb-1 homePageImage"
                alt=""
            />
            <p class="mt-2 font-weight-bold">00s Italy</p>
            </div>
            <div class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
            <img
                src="Img/Cocktail Hour.jpg"
                class="img-fluid mb-1 homePageImage"
                alt=""
            />
            <p class="mt-2 font-weight-bold">Cocktail Hour</p>
            </div>
            <div class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
            <img
                src="Img/I Love My '90s Hip-Hop.jpg"
                class="img-fluid mb-1 homePageImage"
                alt=""
            />
            <p class="mt-2 font-weight-bold">I Love My '90s Hip-Hop</p>
            </div>
        </div>
        <!-- </div> -->

        <!-- <div class="container ml-5"> -->
        <h3>Classifiche</h3>
        <div class="row p-0 text-center">
            <div class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
            <img
                src="Img/Top 50 - Italy.jpg"
                class="img-fluid mb-1 homePageImage"
                alt=""
            />
            <p class="mt-2 font-weight-bold">Top 50 - Italy</p>
            </div>
            <div class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
            <img
                src="Img/Top 50 - Global.jpg"
                class="img-fluid mb-1 homePageImage"
                alt=""
            />
            <p class="mt-2 font-weight-bold">Top 50 - Global</p>
            </div>
            <div class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
            <img
                src="Img/Viral 50 - Global.jpg"
                class="img-fluid mb-1 homePageImage"
                alt=""
            />
            <p class="mt-2 font-weight-bold">Viral 50 - Global</p>
            </div>
            <div class="col col-12 col-sm-6 col-md-4 col-lg-2 p-2">
            <img
                src="Img/Viral 50 - Italy.jpg"
                class="img-fluid mb-1 homePageImage"
                alt=""
            />
            <p class="mt-2 font-weight-bold">Viral 50 - Italy</p>
            </div>
        </div>
        </div>`
}


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
    // console.log(uniqueAlbums)
    // console.log(uniqueAlbums)
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
                contDiv.classList.add("w-100")
                contDiv.innerHTML = `
                <a href="artist.html?q=${art.id}">
                <div class="card col-12 col-sm-6 col-md-4 col-lg-2 p-2 custom-card">
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
                contDiv.classList.add('w-100')
                contDiv.innerHTML = `
                <a href="album.html?q=${album.id}">
                <div class="card card  col-12 col-sm-6 col-md-4 col-lg-2 p-2 custom-card">
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

