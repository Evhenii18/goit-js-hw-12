import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function renderImages(images, galleryElement) {
	const markup = images
		.map(
			({
				webformatURL,
				largeImageURL,
				tags,
				likes,
				views,
				comments,
				downloads,
			}) => `
    <li class="gallery-item">
            <a href="${largeImageURL}" >
                <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p><b>Likes</b> ${likes}</p>
                    <p><b>Views</b> ${views}</p>
                    <p><b>Comments</b> ${comments}</p>
                    <p><b>Downloads</b> ${downloads}</p>
                </div>
            </a>
        </li>
  `
		)
		.join('');

	galleryElement.insertAdjacentHTML('beforeend', markup);

	if (!lightbox) {
		lightbox = new SimpleLightbox('.gallery a');
	} else {
		lightbox.refresh();
	}
}

export function clearGallery(galleryElement) {
	galleryElement.innerHTML = '';
}
