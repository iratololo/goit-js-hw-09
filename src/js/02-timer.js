import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const selectors = {
    container: document.querySelector("body"),
    timerButton: document.querySelector("button[data-start]"),
    timerButtonStop: document.querySelector("button[data-stop]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
}

selectors.timerButton.disabled = true;
selectors.container.style.backgroundColor = '#ffd54f';

const timerInterval = 1000;

let result = 0;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose([selectedDate]) {
        if (selectedDate.getTime() < Date.now()) {
            selectors.timerButton.disabled = true;
        Report.failure(
            'Invalid date',
            'Please choose a date in the future',
            'Okay',
            );
        } else {
            selectors.timerButton.disabled = false;
            selectors.timerButton.addEventListener("click", handlerTimer);
            result = selectedDate.getTime() - Date.now();
        }
    },
};

flatpickr("#datetime-picker", options);

function handlerTimer() {
    selectors.timerButton.disabled = true;
    const timerId = setInterval(() => {
        result -= timerInterval;
        const timeData = convertMs(result);
        const { days, hours, minutes, seconds } = timeData;
        // console.log('result',result);
        selectors.days.textContent = addLeadingZero(days);
        selectors.hours.textContent = addLeadingZero(hours);
        selectors.minutes.textContent = addLeadingZero(minutes);
        selectors.seconds.textContent = addLeadingZero(seconds);
       if (result < timerInterval) {
           clearInterval(timerId);
           Report.success(
            'Time is over 🎉',
            'Please choose new date',
            'Okay',
           );
        }
   }, timerInterval)
}


function addLeadingZero(value) {
   return value.toString().padStart(2, '0');
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

    
