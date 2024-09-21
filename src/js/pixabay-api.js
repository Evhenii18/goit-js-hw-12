// pixabay-api.js

import axios from 'axios';

const API_KEY = '45969466-58730abf31a7490a9e4f6988e';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
	try {
		const response = await axios.get(BASE_URL, {
			params: {
				key: API_KEY,
				q: query,
				image_type: 'photo',
				orientation: 'horizontal',
				safesearch: true,
				page: page,
				per_page: perPage,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching images:', error);
		throw error;
	}
}