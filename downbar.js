let playPauseBtn = document.querySelector(".play-pause")
let slider = document.querySelector(".slider")
let currTime = document.querySelector(".current-time")
let totalDur = document.querySelector(".total-duration")
let isPlaying = false

let song = document.createElement('audio')
song.src = 'the house of the rising sun.mp3'



const playPause = () => {
    if (!isPlaying) {
        song.play()
        isPlaying = true
        playPauseBtn.innerHTML = '<i class="far fa-pause-circle icon-grey-lg mx-2"></i>'
    } else {
        song.pause();
        isPlaying = false   
        playPauseBtn.innerHTML = '<i class="far fa-play-circle icon-grey-lg mx-2"></i>' 
    }
}

const update = () => {
    slider.value = (song.currentTime * 100) / song.duration 
    slider.style.background = 'linear-gradient(to right, #1db954 0%, #1db954 '+slider.value +'%, black ' + slider.value + '%, black 100%)'
    
    let currMin = Math.floor(song.currentTime / 60);
    let currSec = Math.floor(song.currentTime - currMin * 60);
    let durMin = Math.floor(song.duration / 60);
    let durSec = Math.floor(song.duration - durMin * 60);
    
    if (currSec < 10) { currSec = "0" + currSec; }
    if (durSec < 10) { durSec = "0" + durSec; }
    if (currMin < 10) { currMin = "0" + currMin; }
    if (durMin < 10) { durMin = "0" + durMin; }
    
    currTime.innerHTML = `${currMin}:${currSec}` 
    totalDur.innerHTML = `${durMin}:${durSec}` 
}

const sliderToCurrTime = () => {
    song.currentTime = (song.duration * slider.value) / 100
    update()
}

playPauseBtn.onclick = playPause
slider.onchange = sliderToCurrTime; update;
setInterval(update, 500)

