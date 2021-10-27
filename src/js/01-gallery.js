// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');
galleryRef.innerHTML = createMarkup();

let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

function createMarkup() {
  let markup = '';
  for (const { preview, original, description } of galleryItems) {
    markup += `
    <a class="gallery__item"  href="${original}"> 
        <img class="gallery__image" src="${preview}" alt="${description}" title="${description}>" />
    </a>`;
  }

  return markup;
}
