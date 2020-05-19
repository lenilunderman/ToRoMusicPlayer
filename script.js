const controls = document.querySelector('.controls');
const music = document.querySelector('audio');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('nextsong');
const progressBar = document.querySelector('.music-progress input');
const timeStamp = document.querySelector('.timeStamp');
const musicOn = document.querySelector('.dashboard-music h1')
const playlistList = document.querySelector('ul');
const playlist = document.querySelectorAll('.item');

//counter
let counterCurrentSong = 0;

// music data
 const musicData = [
     {id:1,     musicTrack:'The Beginning and the End',     src:'./audio/music1.mp3',   band:'Anathema'},
     {id:2,     musicTrack:'The Scientist',                 src:'./audio/music2.mp3',   band:'Coldplay'},
     {id:3,     musicTrack:'Waving Through a window',       src:'./audio/music3.mp3',   band:'Dear Evan Hansen'},
     {id:4,     musicTrack:'Just my Imagination',           src:'./audio/music4.mp3',   band:'The Cranberries'},
    ];


// function to toggle Play and Pause the music
function togglePlay(e) {
    if(music.paused){
        music.play();
        playBtn.innerHTML = '<button><img src="./img/svg/pause-circle.svg" alt=""> <span class="playsong"> Pause </span></button>';
    }
    else{
        music.pause();
        playBtn.innerHTML = '<button><img src="./img/svg/play.svg" alt=""> <span class="playsong"> Play</span></button>';
    }
}

// function to Stop the music
function stopMusic(){
    music.currentTime = 0;
    playBtn.innerHTML = '<button><img src="./img/svg/play.svg" alt=""> <span class="playsong"> Play</span></button>';
    music.pause();
}

// Update UI, update the title of the current song
function updateTitleUI(counterCurrentSong){
    const musicTrackList = musicData.map( musicList => musicList.musicTrack);
    musicOn.innerText = musicTrackList[counterCurrentSong];
}

// Play the Previous Song based on the current music
function previousMusic(e){
    //get the track sources
    const musicSources = musicData.map( musicSRC => musicSRC.src);
    const musicSourcesLength = musicSources.length; 

    // Update counter backwards
    --counterCurrentSong;
    // Check if counter went back too far
    if(counterCurrentSong==-1) counterCurrentSong = musicSourcesLength-1;

    // Get path to desired song
    let musicSrc = musicSources[counterCurrentSong];
    // Set the player to the right path
    music.setAttribute("src", `${musicSrc}`);
    // Update the play button
    playBtn.innerHTML = '<button><img src="./img/svg/pause-circle.svg" alt=""> <span class="playsong"> Pause </span></button>';
    // Start music player
    music.play(); 
    // Reset progress bar
    progressBar.setAttribute("value", 0);
    // Update current song title
    updateTitleUI(counterCurrentSong);
}

// Play the Next Song based on the current music
function nextSong(e){
    //get the track sources
    const musicSources = musicData.map(music => music.src);
    const musicSourcesLength = musicSources.length; 

    // Update counter forwards
    ++counterCurrentSong;
    // Check if counter went too far
    if(counterCurrentSong>=musicSourcesLength) counterCurrentSong = 0;

    // Get path to desired song
    let musicSrc = musicSources[counterCurrentSong];
    // Set the player to the right path
    music.setAttribute("src", `${musicSrc}`);
    // Update the play button
    playBtn.innerHTML = '<button><img src="./img/svg/pause-circle.svg" alt=""> <span class="playsong"> Pause </span></button>';
    // Start music player
    music.play(); 
    // Reset progress bar
    progressBar.setAttribute("value", 0);
    // Update current song title
    updateTitleUI(counterCurrentSong);   
}

function updateProgress(){
     progressBar.value = ( music.currentTime / music.duration) * 100;
    // get the time of the song
     let mins = Math.floor(music.currentTime / 60);
     if(mins <10){
         mins = '0' + String(mins);
     }

     let secs = Math.floor(music.currentTime % 60);
     if(secs <10){
         secs = '0' + String(secs);
     }
     timeStamp.innerHTML = `${mins}: ${secs}`;
}

// Get the current duration of the audio in play
function setAudioProgress(){
    music.currentTime = (+progressBar.value * music.duration) / 100;
}

// Update the UI with the name of the artist, band and list of songs
function updateUI(){
    musicData.forEach(item => {
        const htmlTemplate = `
            <li class="item"><img src="./img/svg/music.svg" alt="" data-id="${item.id}"> 
                <span class="title"> ${item.musicTrack} </span> - 
                <span class="artist"> ${item.band} </span> 
            </li>`;
            playlistList.innerHTML += htmlTemplate;
    });
    updateTitleUI(counterCurrentSong);
}


// event listeners

playBtn.addEventListener('click', togglePlay);
stopBtn.addEventListener('click', stopMusic);
previousBtn.addEventListener('click', previousMusic);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('change', setAudioProgress);


// callFunctions
updateUI();


