import axios from 'axios';
const API_KEY = '26835333-f3f2e8c3d3f3fe0d53393333d';
const BASE_URL = 'https://pixabay.com/api/';
const PROPERTIES = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
    
export default class PicturesApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };
    
    async fetchPictures(page) {
        let url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${PROPERTIES}&page=${this.page}`;
        return await axios.get(url)
            .then(response => response.data)
            .then(({hits}) => {                
                this.incrementPage();
                return hits;
            })
            .catch(error=>console.log(error));
        
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
