const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyBox = document.querySelector('body');


startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

let intervalId = null;

startBtn.style.padding = '10px';
stopBtn.style.padding = '10px';


function onStartClick() {

    startBtn.disabled = true;
    stopBtn.disabled = false;

       intervalId = setInterval(() => {
         const colorOfRandom = getRandomHexColor();
         bodyBox.style.backgroundColor = `${colorOfRandom}`;
         
       }, 1000);
    
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};


function onStopClick() {

    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    clearInterval(intervalId);
}