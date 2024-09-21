// pixabay-api.js

const API_KEY = '45969466-58730abf31a7490a9e4f6988e';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page = 1, perPage = 40) {
	const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch images');
			}
			return response.json();
		})
		.catch(error => {
			console.error('Error:', error);
			throw error;
		});
}
