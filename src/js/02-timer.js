
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDataEl = document.querySelector('input#datetime-picker');
const buttonStartEl = document.querySelector('[data-start]');
const timerTextEls = document.querySelectorAll('span.value');

let choiseDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choiseDate = selectedDates[0].getTime();
    checkDate(choiseDate);
  },
};

buttonStartEl.addEventListener('click', intervalStart);
buttonStartEl.disabled = true;

flatpickr(inputDataEl, options);

function checkDate(checkedDate) {
  const deltaDate = checkedDate - Date.now();
  //console.log(deltaDate);
  if (deltaDate > 0) {
    buttonStartEl.disabled = false;
    return deltaDate;
  } else {
    //window.alert("Please choose a date in the future");
    Notiflix.Notify.failure('Please choose a date in the future');
    buttonStartEl.disabled = true;
    return null;
  }
}

function intervalStart() {
  if (choiseDate != null) {
    const timeToEnd = checkDate(choiseDate);
    if (timeToEnd) {
      //console.log('start', convertMs(timeToEnd));
      inputDataEl.disabled = true;
      buttonStartEl.disabled = true;
      intervalId = setInterval(timeTick, 1000); 
    }
  }
}

function timeTick() {
  const deltaDate = choiseDate - Date.now();
  if (deltaDate > 0) {
    updateClockface(convertMs(deltaDate));
  } else {
    clearInterval(intervalId);
  }
}

function updateClockface({ days, hours, minutes, seconds }) {
  //xx:xx:xx:xx
  timerTextEls[0].textContent = addLeadingZero(days);
  timerTextEls[1].textContent = addLeadingZero(hours);
  timerTextEls[2].textContent = addLeadingZero(minutes);
  timerTextEls[3].textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
