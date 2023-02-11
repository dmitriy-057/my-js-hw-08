
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY = "videoplayer-current-time";

player.on('timeupdate', throttle(onUpdateCurrentTime, 1000));

onSaveCurrentTime();

function onUpdateCurrentTime(time) {
    const seconds = time.seconds;
    console.log('time:',Math.round(seconds), 'seconds');

    localStorage.setItem(KEY, JSON.stringify(seconds));
   
};

function onSaveCurrentTime() {
    const savedTime = localStorage.getItem(KEY);
    if(savedTime) {
        const parsedTime = JSON.parse(savedTime);
        console.log('parsedTime',parsedTime);
        player.setCurrentTime(parsedTime);
    }

};


