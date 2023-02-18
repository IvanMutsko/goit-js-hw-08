import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.on(
  'timeupdate',
  throttle(evt => {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(evt));
    console.log(evt);
  }, 1000)
);

const savedTime = localStorage.getItem('videoplayer-current-time');
let startPlayTime = JSON.parse(savedTime);

player.setCurrentTime(startPlayTime.seconds);
