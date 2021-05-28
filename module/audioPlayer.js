export const audioPlayerInit = () => {

    const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioPlayBtn = document.querySelector('.audio-button__play'),
        audioProgressBar = document.querySelector('.audio-progress'),
        audioProgressTime = document.querySelector('.audio-progress__timing'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioTimeTotal = document.querySelector('.audio-time__total');


    const playList = ['hello', 'flow', 'speed'];

    let trackIndex = 0;


    const playTrack = () => {
        const isPlaying = audioPlayer.paused;
        const track = playList[trackIndex];

        audioPlayer.src = `./audio/${track}.mp3`;
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();

        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const nextSong = () => {
        if (trackIndex === playList.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        audioProgressTime.style.width = 0;

        playTrack();
    };

    const prevSong = () => {
        if (trackIndex) {
            trackIndex--;
        } else {
            trackIndex = playList.length - 1;
        }
        audioProgressTime.style.width = 0;

        playTrack();
    };

    const addZero = n => n < 10 ? '0' + n : n;


    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioPlayBtn.classList.toggle('fa-play');
            audioPlayBtn.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

            const track = playList[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevSong();
        }

        if (target.classList.contains('audio-button__next')) {
            nextSong();
        } 
    });

    audioPlayer.addEventListener('ended', () => {
        nextSong();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;

        const progressBar = (currentTime / duration) * 100;

        audioProgressTime.style.width = progressBar + '%';

        let minutesPassed = Math.floor(currentTime / 60) || '0';
        let secondsPassed = Math.floor(currentTime % 60) || '0';
        let minutesTotal = Math.floor(duration / 60) || '0';
        let secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    });

    audioProgressBar.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgressBar.clientWidth;
        const progressBar = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progressBar;
    });


    audioPlayerInit.stop = () => {
       if (!audioPlayer.paused) {
           audioPlayer.pause();
           audio.classList.remove('play');
           audioPlayBtn.classList.add('fa-play');
           audioPlayBtn.classList.remove('fa-pause');
       }
    };

};