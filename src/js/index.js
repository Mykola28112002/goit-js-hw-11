

import './../css/styles.css';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './pixabayAPI';
import { gallery, renderGallery, clearGalleryMarkup } from './galleryMarkup';

Notify.init({ cssAnimationStyle: 'from-right', showOnlyTheLastOne: true });

const formRef = document.querySelector('.search-form');
formRef.addEventListener('submit', onFormSubmit);

const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', onloadMoreBtnClick);


const observerOptions = { rootMargin: '100px', treshold: 1.0 };
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImages();
    }
  });
}, observerOptions);

const pixabayAPI = new PixabayAPI();

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

async function onFormSubmit(e) {
  e.preventDefault();

  pixabayAPI.searchQuery = e.target.elements.searchQuery.value.trim();
  if (!pixabayAPI.searchQuery) return Notify.info('Input some to search');

  clearGalleryMarkup();
  pixabayAPI.resetPage();
  loadImages();
  e.target.reset();
}

async function loadImages() {
  onStartLoadingImages();

  try {
    const { hits, totalHits } = await pixabayAPI.fetchImages();
    if (!totalHits) {
      onFinishLoadingImages();
      formRef.reset();
      loadMoreBtn.style.display = 'none';
      return Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (pixabayAPI.page === 2) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    if (loadMoreBtn && hits.length < totalHits) {
      loadMoreBtn.textContent = `Load more ${pixabayAPI.searchQuery || ''}`;
      loadMoreBtn.style.display = 'block';
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    if (gallery.childElementCount >= totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.style.display = 'none';
    }

    renderGallery(hits);
    lightbox.refresh();

    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (err) {
    console.log(err.message);
    if (err.message === 'Request failed with status code 400') {
      Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.style.display = 'none';
    }
  }
  onFinishLoadingImages();
}

function onStartLoadingImages() {
  Loading.dots();
  formRef.elements.submitBtn.disabled = true;
  formRef.elements.searchQuery.disabled = true;
}

function onFinishLoadingImages() {
  Loading.remove();
  formRef.elements.submitBtn.disabled = false;
  formRef.elements.searchQuery.disabled = false;
}

function onloadMoreBtnClick() {
  loadImages();
}
