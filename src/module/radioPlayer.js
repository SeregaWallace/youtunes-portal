export const radioPlayerInit = () => {
    const radioPlayer = document.querySelector('.radio'),
        radioCover = document.querySelector('.radio-cover__img'),
        radioHeader = document.querySelector('.radio-header__big'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioItems = document.querySelectorAll('.radio-item'),
        stopBtn = document.querySelector('.radio-stop'),
        radioVolume = document.querySelector('.radio-volume'),
        radioMuteBtn = document.querySelector('.radio-mute');


    const audio = new Audio();
    audio.type = 'audio/aac';

    stopBtn.disabled = true;


    const playPauseIcon = () => {
        if (audio.paused) {
            radioPlayer.classList.remove('play');
            stopBtn.classList.add('fa-play');
            stopBtn.classList.remove('fa-stop');
        } else {
            radioPlayer.classList.add('play');
            stopBtn.classList.remove('fa-play');
            stopBtn.classList.add('fa-stop');
        }
    };


    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        const radioTitle = parrent.querySelector('.radio-name').textContent;
        const radioLabel = parrent.querySelector('.radio-img').src;

        radioCover.src = radioLabel;
        radioHeader.textContent = radioTitle;
        radioItems.forEach(item => item.classList.remove('select'));
        parrent.classList.add('select');
        audio.src = target.dataset.radioStation;
        stopBtn.disabled = false;

        audio.play();
        playPauseIcon();
    });

    stopBtn.addEventListener('click', event => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }

        playPauseIcon();
    });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        audio.muted = false;
    });

    radioMuteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
    });


    radioPlayerInit.stop = () => {
        audio.pause();
        playPauseIcon();
    };
};