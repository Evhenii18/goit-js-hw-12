import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');
const datePicker = document.querySelector('#datetime-picker');

let userSelectedDate = null;
let intervalId = null;

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		const selectedDate = selectedDates[0];

		if (selectedDate <= new Date()) {
			iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
			startBtn.disabled = true;
		} else {
			userSelectedDate = selectedDate;
			startBtn.disabled = false;
		}
	}
};

flatpickr(datePicker, options);

// Обробка кліку на кнопку "Start"
startBtn.addEventListener('click', startCountdown);

function startCountdown() {
	startBtn.disabled = true;
	datePicker.disabled = true;

	intervalId = setInterval(() => {
		const currentTime = new Date();
		const timeDifference = userSelectedDate - currentTime;

		if (timeDifference <= 0) {
			clearInterval(intervalId);
			iziToast.success({ title: 'Success', message: 'Countdown finished!' });
			resetTimer();
			return;
		}

		const timeData = convertMs(timeDifference);
		updateTimerUI(timeData);
	}, 1000);
}

// Оновлення інтерфейсу таймера
function updateTimerUI({ days, hours, minutes, seconds }) {
	daysValue.textContent = addLeadingZero(days);
	hoursValue.textContent = addLeadingZero(hours);
	minutesValue.textContent = addLeadingZero(minutes);
	secondsValue.textContent = addLeadingZero(seconds);
}

// Додавання 0 до значень менше 10
function addLeadingZero(value) {
	return String(value).padStart(2, '0');
}

// Функція для конвертації мілісекунд
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

// Скидання таймера
function resetTimer() {
	startBtn.disabled = true;
	datePicker.disabled = false;
	daysValue.textContent = '00';
	hoursValue.textContent = '00';
	minutesValue.textContent = '00';
	secondsValue.textContent = '00';
}
