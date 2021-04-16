{/* <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <div class="card mb-4">
                <img
                  src="https://i.scdn.co/image/ab67616d00001e02e8b066f70c206551210d902b"
                  alt="Bohemian Rhapsody (The Original Soundtrack)"
                />
                <div class="card-body">
                  <p class="card-text text-center">
                    Bohemian Rhapsody (The Original Soundtrack)
                  </p>
                  <p class="card-text text-center card-artist">Queen</p>
                </div>
              </div>


            </div>  */}
// "https://striveschool-api.herokuapp.com/api/deezer/artist/412
// "https://striveschool-api.herokuapp.com/api/deezer/search?q=album/"

let artistId = 'queen'

window.onload = () =>{
    
            fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=album/"+ artistId )
            .then(artistAlbums => artistAlbums.json())
            .then(artistAlbums2 =>{

                let albumContainer = document.getElementById('albums')
                 console.log(artistAlbums2.data)

                    artistAlbums2.data.forEach(album => {
                        albumContainer.innerHTML += 
                        `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                            <div class="card mb-4">
                                <img
                                src=${album.album.cover}
                                alt=${album.artist.title}
                                />
                                <div class="card-body">
                                <p class="card-text text-center">
                                ${album.title}
                                </p>
                                <p class="card-text text-center card-artist">${album.artist.name}</p>
                                </div>
                            </div>
                            </div> `
                    });
               return artistAlbums2
            })
            // .then(artistAlbums3 =>{
            //     //Change Header Background img and text
            //         let albums = document.getElementById('albums').children
            //         console.log(albums)
            //         for(let i =0; i <albums.length; i++){
            //             albums[i].addEventListener("click", ()=>{
            //             })
            //         }
            // })
            
        }



