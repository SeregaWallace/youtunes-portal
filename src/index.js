import { radioPlayerInit } from './module/radioPlayer.js';
import { videoPlayerInit } from './module/videoPlayer.js';
import { audioPlayerInit } from './module/audioPlayer.js';


const playerBtns = document.querySelectorAll('.player-btn');
const playersBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');


const deactivatePlayer = () => {

    playerBtns.forEach(player => player.classList.remove('active'));
    playersBlock.forEach(player => player.classList.remove('active'));

    temp.style.display = 'none';

    videoPlayerInit.stop();
    radioPlayerInit.stop();
    audioPlayerInit.stop();
};

playerBtns.forEach((player, i) => {
    player.addEventListener('click', () => {
        deactivatePlayer();
        player.classList.add('active');
        playersBlock[i].classList.add('active');
    });
});


videoPlayerInit();
radioPlayerInit();
audioPlayerInit();