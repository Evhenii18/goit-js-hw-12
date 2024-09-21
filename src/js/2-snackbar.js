import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Находим элементы формы
const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stateInputs = document.querySelectorAll('input[name="state"]');

// Обработчик события для отправки формы
form.addEventListener('submit', (event) => {
	event.preventDefault(); // Отключаем перезагрузку страницы

	// Получаем значение задержки из input
	const delay = parseInt(delayInput.value, 10);

	// Получаем выбранное состояние промиса (fulfilled/rejected)
	let selectedState;
	stateInputs.forEach(input => {
		if (input.checked) {
			selectedState = input.value;
		}
	});

	// Создаем промис с заданной задержкой
	createPromise(delay, selectedState)
		.then((delay) => {
			iziToast.success({
				title: 'Success',
				message: `✅ Fulfilled promise in ${delay}ms`,
			});
		})
		.catch((delay) => {
			iziToast.error({
				title: 'Error',
				message: `❌ Rejected promise in ${delay}ms`,
			});
		});
});

// Функция для создания промиса
function createPromise(delay, state) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (state === 'fulfilled') {
				resolve(delay);
			} else {
				reject(delay);
			}
		}, delay);
	});
}
