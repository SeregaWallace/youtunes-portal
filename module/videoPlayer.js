export const videoPlayerInit = () => {
    
    const videoPlayer = document.querySelector('.video-player'),
        videoBtnPlay = document.querySelector('.video-button__play'),
        videoBtnStop = document.querySelector('.video-button__stop'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoProgressBar = document.querySelector('.video-progress'),
        videoTimeTotal = document.querySelector('.video-time__total'),
        videoVolume = document.querySelector('.video-volume'),
        videoFullscreen = document.querySelector('.video-fullscreen');


    const playPauseIcon = () => {
        if (videoPlayer.paused) {
            videoBtnPlay.classList.remove('fa-pause');
            videoBtnPlay.classList.add('fa-play');
        } else {
            videoBtnPlay.classList.add('fa-pause');
            videoBtnPlay.classList.remove('fa-play');
        }
    };

    const playPauseMode = (e) => {
        e.preventDefault();
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlaying = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    const videoVolumeBar = () => {
        const videoVolumeValue = videoVolume.value;
        videoPlayer.volume = videoVolumeValue / 100;
    };

    const addZero = n => n < 10 ? '0' + n : n;


    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        let minutesPassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);
        let minutesTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoProgressBar.value = (currentTime / duration) * 100;

        videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`; 
        videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    videoProgressBar.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgressBar.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoFullscreen.addEventListener('click', () => {
        if (videoPlayer.requestFullScreen) {
            videoPlayer.requestFullScreen();
        } else if (videoPlayer.webkitRequestFullScreen) {
            videoPlayer.webkitRequestFullScreen();
        }  else if (videoPlayer.mozRequestFullScreen) {
            videoPlayer.mozRequestFullScreen();
            videoPlayer.controls = true;
        } else {
            videoPlayer.controls = false;
        }
    });

    videoPlayer.addEventListener('volumechange', () => {
        videoVolume.value = Math.floor(videoPlayer.volume * 100);
    });

    videoVolume.addEventListener('input', videoVolumeBar);
    videoPlayer.addEventListener('click', playPauseMode);
    videoBtnPlay.addEventListener('click', playPauseMode);
    videoBtnStop.addEventListener('click', stopPlaying);
    videoPlayer.addEventListener('play', playPauseIcon);
    videoPlayer.addEventListener('pause', playPauseIcon);


    videoVolumeBar();


    videoPlayerInit.stop = () => {
        videoPlayer.pause();
        playPauseIcon();
    };
};