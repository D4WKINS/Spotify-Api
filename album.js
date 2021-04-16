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

window.onload = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
        .then(res => res.json())
        .then(album => {
            console.log(album)
            albumTracks = album.tracks.data
            console.log("This is the array of tracks", albumTracks)


        })
        .catch(err => console.log(err))
}
