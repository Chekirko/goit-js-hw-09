import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let currentTime = new Date();
console.log(currentTime.getTime());

refs.btn.setAttribute('disabled', true);
let yourDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentTime,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= currentTime.getTime()) {
      refs.btn.setAttribute('disabled', true);
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.btn.removeAttribute('disabled');
      return (yourDate = selectedDates[0].getTime());
    }
  },
};

flatpickr('#datetime-picker', options);

refs.btn.addEventListener('click', onBtnClick);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onBtnClick(evt) {
  refs.btn.setAttribute('disabled', true);
  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = yourDate - currentTime;
    if (deltaTime <= 0) {
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
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
