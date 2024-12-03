const songs = [
    {
        name: "Song 1",
        link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        artist: "Artist 1",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Song 2",
        link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        artist: "Artist 2",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Song 3",
        link: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        artist: "Artist 3",
        image: "https://via.placeholder.com/150"
    },
    
];

let index = 0;
let audio = document.getElementById('audio');
let playBtn = document.getElementById('playBtn');
let nextBtn = document.getElementById('nextBtn');
let prevBtn = document.getElementById('prevBtn');
let progress = document.getElementById('progress');
let startTime = document.getElementById('start');
let endTime = document.getElementById('end');
let title = document.getElementById('title');
let artist = document.getElementById('musician');
let thumb = document.getElementById('thumb');

function loadSong(songIndex) {
    audio.src = songs[songIndex].link;
    title.innerText = songs[songIndex].name;
    artist.innerText = songs[songIndex].artist;
    thumb.src = songs[songIndex].image;
    audio.load();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="bx bx-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="bx bx-play"></i>';
    }
}

function nextSong() {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
}

function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
}

audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);
    let totalMinutes = Math.floor(audio.duration / 60);
    let totalSeconds = Math.floor(audio.duration % 60);

    startTime.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
    endTime.innerText = `${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

playBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Initial load
loadSong(index);
