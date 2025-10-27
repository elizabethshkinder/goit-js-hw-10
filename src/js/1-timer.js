import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');


let selectedTime = null;
let intervalID = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    let userSelectedDate = selectedDates[0];

if (userSelectedDate.getTime() <= Date.now()) {
    iziToast.error({
        message: 'Please choose a date in the future',
    });
    startBtn.disabled = true;
    selectedTime = null;
} else {
      startBtn.disabled = false;
      selectedTime = userSelectedDate.getTime();
  }
 },
};

flatpickr(input, options);

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    input.disabled = true;

    intervalID = setInterval(() => {
        const diff = selectedTime - Date.now();

       if (diff <= 0) {
            clearInterval(intervalID);

            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';

            input.disabled = false;
            return;
        }

        const { days: d, hours: h, minutes: m, seconds: s } = convertMs(diff);

        days.textContent = d;
        hours.textContent = addLeadingZero(h);
        minutes.textContent = addLeadingZero(m);
        seconds.textContent = addLeadingZero(s);
         
    }, 1000);
});

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };

};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
