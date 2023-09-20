//DOM
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');


// Play & Pause ----------------------------------- //
function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');//show play button instead of pause
    playBtn.setAttribute('title', 'Play')//show title on button play
}

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');//show pause button instead of play
        playBtn.setAttribute('title', 'Pause');//show title on button pause
    } else {
        video.pause();
        showPlayIcon();
    }
}

// On video End, show play button icon
video.addEventListener('ended', showPlayIcon);


// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    //console.log(minutes, seconds);
    return `${minutes}:${seconds}`;
}


// Update Progress Bar as the video plays
function updateProgress() {
    //console.log('current time', video.currentTime, 'duration', video.duration)
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`//Change css width property of progressBar in %
    currentTime.textContent = `${displayTime(video.currentTime)} /`; //Change the text of the currentTime
    duration.textContent = `${displayTime(video.duration)}`; //Change the text of the duration
}

// Click to seek within the video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth; //Catch the position in progress bar in %
    progressBar.style.width = `${newTime * 100}%`; //Change the width of progress bar in %
    video.currentTime = newTime * video.duration; //Change the current time of video playing
    //console.log(newTime);
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume Bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth; //Catch the volume
    // Rounding volume up or down
    if (volume < 0.1) {
        volume = 0
    }
    if (volume > 0.9) {
        volume = 1
    }
    volumeBar.style.width = `${volume * 100}%`; //Change the width of volume bar
    video.volume = volume; //Change volume of video
    // Change icon depending on volume
    volumeIcon.className = '';
    // Add a different icon depending on volume
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off')
    }
    //Tracking the volume and store it in a variable
    lastVolume = volume;
}

//Mute and Unmute video
function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
    // console.log('video playback rate', video.playbackRate)
    // console.log('selected valuse', speed.value)
    video.playbackRate = speed.value; //Set video speed as playback rate
}


// Fullscreen ------------------------------- //


// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed)