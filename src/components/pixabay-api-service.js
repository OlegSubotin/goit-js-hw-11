const API_KEY = '26835333-f3f2e8c3d3f3fe0d53393333d';
const BASE_URL = 'https://pixabay.com/api/';
const PROPERTIES = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
    
export default class PicturesApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };
    
    fetchPictures(page) {
        let url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${PROPERTIES}&page=${this.page}`;
        return fetch(url)
            .then(response => response.json())
            .then(({hits}) => {                
                this.incrementPage();
                return hits;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}