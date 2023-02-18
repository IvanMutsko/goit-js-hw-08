import Player from '@vimeo/player';
import { throttle } from 'lodash';

// пошук плеєра
const iframe = document.querySelector('iframe');
// створення екземпляра
const player = new Player(iframe);
// збереження в локалсторедж даних кожну 1 секунду
player.on(
  'timeupdate',
  throttle(evt => {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(evt));
  }, 1000)
);
// отримання даних з локалсторедж
const savedTime = localStorage.getItem('videoplayer-current-time');
// розпарсити в об'єкт
let startPlayTime = JSON.parse(savedTime);
// встановити початковий час
player.setCurrentTime(startPlayTime.seconds);
