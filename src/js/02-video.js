import Player from '@vimeo/player';
let throttle = require('lodash.throttle');

let currentTime;
try {
  currentTime = Number(localStorage.getItem('videoplayer-current-time'));
} catch (error) {
  currentTime = 0;
}

let iframe = document.querySelector('iframe');
let player = new Player(iframe);

player
  .setCurrentTime(Number(currentTime))
  .then(function (seconds) {
    console.log(`ok - ${seconds}`);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        currentTime = 0;
        break;

      default:
        console.log(error);
        break;
    }
  });

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }, 1000),
);
