//  PREVIOUS SCRIPT FROM HERE
// let parentDivs = document.querySelectorAll('body > div > div > div > div.col-12.col-md-8 > div')
// // console.log(parentDivs[0].firstElementChild.innerHTML)

// const changeToPlay = (e) => {
//     let parent = e.currentTarget 
//     let iconDiv = parent.firstElementChild
//     iconDiv.innerHTML = '<i class="far fa-play-circle icon-grey-md"></i>'
// }
// const changeToNote = (e) => {
//     let parent = e.currentTarget 
//     let iconDiv = parent.firstElementChild
//     iconDiv.innerHTML = '<i class="fas fa-music smallest-grey-text"></i>'
// }

// parentDivs.forEach (
//     x => {
//         x.onmouseover = changeToPlay
//         x.onmouseout = changeToNote
//     }
// )
//  PREVIOUS SCRIPT ENDS HERE

// NEW SCRIPT STARTS HERE
let albumId = 75621062
let albumTracks = []
let tracksSection = document.getElementById("colOfSongs")

window.onload = () => {
    loadAlbum(albumId)
}
// makes every number under 2 digits to appear wth zero at the begining
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
// converts the duration (500 seconds for example) to a more readable form "mins" : "sec"
const convertingDuration = function (dur) {
    let sec = dur % 60
    let mins = (dur - sec) / 60
    return `${mins}:${pad(sec)}`
}
const loadAlbum = function (Id) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${Id}`)
        .then(res => res.json())
        .then(album => {
            // console.log(album)
            albumTracks = album.tracks.data
            console.log("This is the array of tracks", albumTracks)
            displayAlbum()
        })
        .catch(err => console.log(err))
}

const displayAlbum = function () {
    albumTracks.forEach(track => {
        tracksSection.innerHTML += `<div class="row">
        <div class="song-icon col-1">
          <ion-icon name="musical-note-outline"></ion-icon>
        </div>
        <div class="song-title col-10">
          ${track.title_short}
          <div class="song-artists">${track.artist.name}</div>
        </div>
        <div class="song-length col-1">${convertingDuration(track.duration)}</div>
      </div>`
    })


}