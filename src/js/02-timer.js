import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentTime,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= currentTime.getTime()) {
      alert('error');
    } else {
      refs.btn.removeAttribute('disabled');
      return (deltaTime = selectedDates[0].getTime() - currentTime.getTime());
    }
  },
};

flatpickr('#datetime-picker', options);

refs.btn.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  console.log(deltaTime);
  console.log(convertMs(deltaTime));
  const totalTime = convertMs(deltaTime);
  timer({ totalTime });
}

const timer = function (obj) {
  setInterval(obj => {
    refs.days.textContent = obj.days;
  }, 1000);
};
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
