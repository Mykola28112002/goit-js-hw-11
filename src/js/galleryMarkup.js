export const galleryRef = document.querySelector('.gallery');

function makeGallaryMarkup(searchedImages) {
  return searchedImages
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" /> 
              <div class="info">
                <p class="info-item">
                <svg>
                  <use href="./images/symbol-defs.svg#icon-heart"></use>
                </svg>
                  <b>${likes}</b>
                </p>
                <p class="info-item">
                <svg>
                  <use href="./images/symbol-defs.svg#icon-eye"></use>
                </svg>
                  <b> ${views}</b>
                </p>
                <p class="info-item">
                <svg>
                  <use href="./images/symbol-defs.svg#icon-bubble"></use>
                </svg>
                  <b>${comments}</b>
                </p>
                <p class="info-item">
                <svg>
                  <use href="./images/symbol-defs.svg#icon-download"></use>
                </svg>
                  <b>${downloads}</b>
                </p>
              </div>

              
        </a>      
        </div>`
    )
    .join('');
}

export function renderGallery(searchedImages) {
  galleryRef.insertAdjacentHTML('beforeend', makeGallaryMarkup(searchedImages));
}

export function clearGalleryMarkup() {
  galleryRef.innerHTML = '';
}