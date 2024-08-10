import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const outputDays = document.querySelector('span[data-days]');
const outputHours = document.querySelector('span[data-hours]');
const outputMinutes = document.querySelector('span[data-minutes]');
const outputSeconds = document.querySelector('span[data-seconds]');

btn.addEventListener('click', startTimer);

let userSelectedDate = null;
let timerId = null;

function startTimer() {
  timerId = setInterval(updatedTimer, 1000);
}

function updatedTimer() {
  const time = userSelectedDate - new Date();

  if (time <= 0) {
    clearInterval(timerId);
    input.disabled = false;
    iziToast.success({
      message: 'Time is up!',
      position: 'topRight',
    });

    return;
  }

  const { days, hours, minutes, seconds } = convertMs(time);

  outputDays.textContent = String(days).padStart(2, 0);
  outputHours.textContent = String(hours).padStart(2, 0);
  outputMinutes.textContent = String(minutes).padStart(2, 0);
  outputSeconds.textContent = String(seconds).padStart(2, 0);

  input.setAttribute('disabled', true);
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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      return;
    }
    userSelectedDate = selectedDates[0];

    btn.disabled = false;
    iziToast.success({
      message: 'Date has been successfully selected!',
      position: 'topRight',
    });
  },
};

flatpickr(input, options);