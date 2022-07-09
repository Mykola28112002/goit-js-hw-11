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
                <svg class="likes" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
                  <b>${likes}</b>
                </p>
                <p class="info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg>
                  <b> ${views}</b>
                </p>
                <p class="info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg>
                  <b>${comments}</b>
                </p>
                <p class="info-item">
                <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<symbol id="icon-comment" viewBox="0 0 18 18">
<path d="M8.982 2.25c-3.092 0-5.607 2.523-5.607 5.625s2.516 5.625 5.591 5.625l0.067-0.004c0.062-0.004 0.124-0.008 0.186-0.011l0.378-0.016 4.123 1.236-0.708-2.793 0.581-0.841c0.652-0.944 0.997-2.050 0.997-3.197 0-3.102-2.515-5.625-5.607-5.625zM8.982 0c4.34 0 7.857 3.526 7.857 7.875 0 1.664-0.517 3.204-1.396 4.476l1.432 5.649-7.562-2.267c-0.11 0.005-0.219 0.017-0.33 0.017-4.34 0-7.857-3.526-7.857-7.875s3.518-7.875 7.857-7.875v0z"></path>
</symbol>
</defs>
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