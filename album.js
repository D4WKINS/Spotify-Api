//  PREVIOUS SCRIPT FROM HERE
let parentDivs = document.querySelectorAll('body > div > div > div > div.col-12.col-md-8 > div')
// console.log(parentDivs[0].firstElementChild.innerHTML)

const changeToPlay = (e) => {
  let parent = e.currentTarget
  let iconDiv = parent.firstElementChild
  iconDiv.innerHTML = '<i class="far fa-play-circle icon-grey-md"></i>'
}
const changeToNote = (e) => {
  let parent = e.currentTarget
  let iconDiv = parent.firstElementChild
  iconDiv.innerHTML = '<i class="fas fa-music smallest-grey-text"></i>'
}

parentDivs.forEach(
  x => {
    x.onmouseover = changeToPlay
    x.onmouseout = changeToNote
  }
)
//  PREVIOUS SCRIPT ENDS HERE

// NEW SCRIPT STARTS HERE
let SearchParams = new URLSearchParams(location.search);

let id = SearchParams.get("id")

let albumId = id
let _album = {}
let albumTracks = []
let tracksSection = document.getElementById("colOfSongs")
let albumSection = document.getElementById("albumSection")
let volume = document.getElementById("volume")
let audio = document.getElementById("audio")
let bottomLeftCorner = document.getElementById("bottomLeftCorner")


window.onload = () => {
  loadAlbum(albumId)
}
// makes every number under 2 digits to appear wth zero at the begining
function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
// converts the duration (500 seconds for example is 4 mins and 20 seconds) to a more readable form "mins" : "sec"
const convertingDuration = function (dur) {
  let sec = dur % 60
  let mins = (dur - sec) / 60
  return `${mins}:${pad(sec)}`
}
const loadAlbum = function (Id) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${Id}`)
    .then(res => res.json())
    .then(album => {
      _album = album
      console.log(_album)
      albumTracks = album.tracks.data
      console.log("This is the array of tracks", albumTracks)
      displayTracks()
      displayAlbum()
    })
    .catch(err => console.log(err))
}

const displayTracks = function () {
  albumTracks.forEach(track => {
    tracksSection.innerHTML += `<div onclick="playAudio('${track.preview}','${track.title_short}','${track.artist.name}')" class="row tracks-row">  
        <div class="song-icon col-1">
          <ion-icon name="musical-note-outline"></ion-icon>
        </div>
        <div class="song-title col-10">
          ${track.title_short}
          <div class="song-artists">${track.artist.name}</div>
        </div>
        <div class="song-length col-1 ">${convertingDuration(track.duration)}</div>
      </div>`

  })
}

const displayAlbum = function () {
  albumSection.innerHTML = ` <div class="Album-Image mt-5 mt-sm-4 mt-md-0">
 <img
   class="img-fluid"
   src="${_album.cover_medium}"
   alt="${_album.title}"
 />
</div>
<div class="Album-Title text-white text-center mt-2">
 ${_album.title}
</div>
<div class="Artists text-center">${_album.artist.name}</div>
<div class="play-btn-place text-center">
 <button type="button" class="btn btn-play">PLAY</button>
</div>
<div class="Album-Year-Num-Songs mt-3">
 <span class="Album-Year">${_album.release_date}</span>
 <span class="dot">•</span>
 <span class="Album-Num-Songs">${_album.nb_tracks} SONGS</span>
</div>
<div class="Icons text-white mb-4">
 <span class="Save-to-Your-Library-Icon text-white text-center">
   <button
     type="button"
     role="switch"
     aria-checked="false"
     aria-label="Save to Your Library"
     class="btn"
     title="Save to Your Library"
   >
     <svg
       role="img"
       height="32"
       width="32"
       viewBox="0 0 32 32"
       class=""
     >
       <path
         d="M27.672 5.573a7.904 7.904 0 00-10.697-.489c-.004.003-.425.35-.975.35-.564 0-.965-.341-.979-.354a7.904 7.904 0 00-10.693.493A7.896 7.896 0 002 11.192c0 2.123.827 4.118 2.301 5.59l9.266 10.848a3.196 3.196 0 004.866 0l9.239-10.819A7.892 7.892 0 0030 11.192a7.896 7.896 0 00-2.328-5.619zm-.734 10.56l-9.266 10.848c-.837.979-2.508.979-3.346 0L5.035 16.104A6.9 6.9 0 013 11.192 6.9 6.9 0 015.035 6.28a6.935 6.935 0 014.913-2.048 6.89 6.89 0 014.419 1.605A2.58 2.58 0 0016 6.434c.914 0 1.555-.53 1.619-.585a6.908 6.908 0 019.346.431C28.277 7.593 29 9.337 29 11.192s-.723 3.6-2.062 4.941z"
       ></path>
     </svg>
   </button>
 </span>
 <span class="Three-Dot-Icon text-white text-center">
   <button
     type="button"
     aria-haspopup="menu"
     aria-label="More"
     class="btn"
     title="More"
   >
     <svg
       role="img"
       height="32"
       width="32"
       viewBox="0 0 32 32"
       class=""
     >
       <path
         d="M5.998 13.999A2 2 0 105.999 18 2 2 0 005.998 14zm10.001 0A2 2 0 1016 18 2 2 0 0016 14zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z"
       ></path>
     </svg>
   </button>
 </span>
</div>
</div>`
}
const volumeChange = function (vol) {
  audio.volume = vol / 100
}

const playAudio = function (url, title, artist) {
  audio.src = url
  bottomLeftCorner.innerHTML = `  <div class="d-flex">
    <div class="position-relative imageDimensionContainer">
      <img src="${_album.cover_small}" alt="">
    </div>
    <div class="bottomMenuWrapperLeftAlbumText">
      <h3>${title}</h3>
      <p>${artist}</p>
    </div>
    <div class="bottomMenuWrapperLeftIcons">
      <ul>
        <li><i class="far fa-heart"></i></li>
        <li><i class="fas fa-laptop"></i></li>  
      </ul>
    </div>
  </div>`

}