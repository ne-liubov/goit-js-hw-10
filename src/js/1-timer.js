import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    // вибір минулої дати
    if (selectedDates[0] < Date.now()) {
      iziToast.show({
        // повідомлення-помилка
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        theme: 'dark',
        timeout: 3000,
      });
      btnEl.disabled = true; // кнопка неактивна
    } else {
      // вибір майбутньої дати
      userSelectedDate = selectedDates[0];
      btnEl.disabled = false; // кнопка активна
    }
  },
};

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button');

btnEl.disabled = true; // кнопка неактивна

flatpickr(inputEl, options);

// конвертація часу
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
}

btnEl.addEventListener('click', () => {
  // блок елементів при запуску таймера
  btnEl.disabled = true;
  inputEl.setAttribute('disabled', true);

  // оновлення DOM
  const daysEl = document.querySelector('[data-days]');
  const hoursEl = document.querySelector('[data-hours]');
  const minutesEl = document.querySelector('[data-minutes]');
  const secondsEl = document.querySelector('[data-seconds]');

  // призводимо значення часу до рядка та додаємо 0 на початку
  const addLeadingZero = value => String(value).padStart(2, '0');

  const timerId = setInterval(() => {
    const diff = userSelectedDate - Date.now(); // різниця в часі

    if (diff <= 0) {
      clearInterval(timerId); // зупинка таймера
      return; // вихід з функції
    }

    // присвоєння значення для змінної
    const { days, hours, minutes, seconds } = convertMs(diff);

    // оновлюємо інтерфейс
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
});

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
