import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-function.js';
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
	event.preventDefault();
	const searchQuery = event.target.elements.searchQuery.value.trim();

	if (searchQuery === '') {
		iziToast.warning({
			timeout: 1000,
			close: true,
			position: 'topRight',
			transitionIn: 'fadeIn',
			transitionOut: 'fadeOut',
			displayMode: 2,
			message: 'Please enter a search query!',
		});
		return;
	}

	currentQuery = searchQuery;
	currentPage = 1;
	totalHits = 0;

	clearGallery(gallery);
	clearInput();
	hideLoadMoreButton();
	showLoader();

	try {
		const data = await fetchImages(currentQuery, currentPage);
		totalHits = data.totalHits;

		if (data.hits.length === 0) {
			iziToast.error({
				timeout: 1000,
				close: true,
				position: 'topRight',
				transitionIn: 'fadeIn',
				transitionOut: 'fadeOut',
				displayMode: 2,
				message: 'Sorry, there are no images matching your search query. Please, try again!',
			});
			return;
		}

		renderImages(data.hits, gallery);
		if (totalHits > 15) showLoadMoreButton();

	} catch (error) {
		iziToast.error({
			timeout: 1000,
			close: true,
			position: 'topRight',
			transitionIn: 'fadeIn',
			transitionOut: 'fadeOut',
			displayMode: 2,
			message: 'Something went wrong. Please try again later.',
		});
		console.error('Error fetching images:', error);
	} finally {
		hideLoader();
	}
}

async function onLoadMore() {
	currentPage += 1;
	showLoader();

	try {
		const data = await fetchImages(currentQuery, currentPage);
		renderImages(data.hits, gallery);
		smoothScroll();

		if (currentPage * 15 >= totalHits) {
			hideLoadMoreButton();
			iziToast.info({
				timeout: 5000,
				close: true,
				position: 'topRight',
				message: "We're sorry, but you've reached the end of search results.",
			});
		}
	} catch (error) {
		iziToast.error({
			timeout: 10000,
			close: true,
			position: 'topRight',
			transitionIn: 'fadeIn',
			transitionOut: 'fadeOut',
			displayMode: 2,
			message: 'Something went wrong. Please try again later.',
		});
		console.error('Error fetching more images:', error);
	} finally {
		hideLoader();
	}
}

function showLoader() {
	loader.style.display = 'block';
}

function hideLoader() {
	loader.style.display = 'none';
}

function clearInput() {
	form.elements.searchQuery.value = '';
}

function showLoadMoreButton() {
	loadMoreButton.style.display = 'block';
}

function hideLoadMoreButton() {
	loadMoreButton.style.display = 'none';
}

function smoothScroll() {
	const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
	window.scrollBy({
		top: cardHeight * 2,
		behavior: 'smooth',
	});
}
