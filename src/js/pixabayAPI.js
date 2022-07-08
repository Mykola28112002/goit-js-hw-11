import axios from 'axios';

const APIKEY = '28484893-533bc63a458af3cd59f9c6cd5';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class PixabayAPI {
  #searchQuery;
  constructor() {
    this.#searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const params = new URLSearchParams({
      key: APIKEY,
      q: this.#searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });
    if (this.#searchQuery) {
      const { data } = await axios.get(`?${params}`);
      this.incrementPage();
      return data;
    }
  }

  get searchQuery() {
    return this.#searchQuery;
  }

  set searchQuery(searchQuery) {
    this.#searchQuery = searchQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}