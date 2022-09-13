import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const daysData = document.querySelector('span[data-days]');
const hoursData = document.querySelector('span[data-hours]');
const minutesData = document.querySelector('span[data-minutes]');
const secondsData = document.querySelector('span[data-seconds]');

let selectedDataStart = null;
let currentTime = null;
let timeId = null;

btnStart.disabled = true;

flatpickr('input#datetime-picker', {
    
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDataStart = selectedDates[0].getTime();
   
      if (selectedDataStart < Date.now()) {
        
        btnStart.disabled = true;
        Notiflix.Notify.warning('Please choose a date in the future');
          
    } else {
     
      btnStart.disabled = false;
          
          btnStart.addEventListener('click', onStartClick);
          
        function onStartClick() {
          Notiflix.Notify.success(`Let's go`);
           timeId = setInterval(checkDates, 1000);
          updateClockFace();
      }
    }
  },
});




function checkDates() {
  currentTime = Date.now();

  if (selectedDataStart <= currentTime) {
    clearInterval(timeId);
    Notiflix.Notify.info('Finished!!!');
    return;
    
  }
   btnStart.disabled = true;
  const ms = selectedDataStart - currentTime;
  const time = convertMs(ms);
    updateClockFace(time);
        

}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
};

 
function updateClockFace({ days, hours, minutes, seconds }) {
  daysData.textContent = `${days}`;
  hoursData.textContent = `${hours}`;
  minutesData.textContent = `${minutes}`;
  secondsData.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
