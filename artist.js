
// "https://striveschool-api.herokuapp.com/api/deezer/artist/412
// "https://striveschool-api.herokuapp.com/api/deezer/search?q=album/"

window.onload = () =>{
    artistProfile()
  }

  const artistProfile = () => {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + getURLQuery())
  .then(response => response.json())
  .then(artist =>{ 
    changeArtistImg(artist)
    changeArtistName(artist)
  })
}


  const getURLQuery = () =>{
    let query = window.location.search
    return query = query.slice(3,query.length)
  }

  const changeArtistImg = (obj)=>{
    const artistImg = document.getElementById("artist-img")
      artistImg.setAttribute("src",obj.picture_xl)
  }
  const changeArtistName = (obj) =>{
    const artistName = document.getElementById("artist-name")
      artistName.innerText = `${obj.name}`
  }
  const albumCards = ()=>{
   `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
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


            </div>  `
  }