import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = Date.now();
let intervalID = 0;
const input = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (selectedDates[0].getTime() < Date.now()) {
      buttonStart.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });
    }
    else {
      buttonStart.disabled = false;
    }
  },
};

flatpickr(input, options)

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

const timerValues = document.querySelectorAll('.field .value');

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, '0'); 
  }
  return value.toString();
}

function fillInterface(ms) {
  const option = convertMs(ms)
  timerValues.forEach(e => {
    if (e.hasAttribute('data-days')) {
      e.textContent = addLeadingZero(option.days);
    }
    else if (e.hasAttribute('data-hours')) {
      e.textContent = addLeadingZero(option.hours);
    }
    else if (e.hasAttribute('data-minutes')) {
      e.textContent = addLeadingZero(option.minutes);
    }
    else if (e.hasAttribute('data-seconds')) {
      e.textContent = addLeadingZero(option.seconds);
    }
  })
}

buttonStart.addEventListener('click', e => {
  input.disabled = true;
  buttonStart.disabled = true;
  intervalID = setInterval(() => {
    if (userSelectedDate.getTime() - Date.now() > 0) {
      fillInterface(userSelectedDate.getTime() - Date.now());
    }
    else {
      clearInterval(intervalID);
      input.disabled = false;
      buttonStart.disabled = false;
    }
  }, 1000);
})