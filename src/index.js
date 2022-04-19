import cardTpl from './templates/images.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PicturesApiService from './components/pixabay-api-service.js';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')
const picturesApiService = new PicturesApiService();

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

btnIsHidden();

function onFormSubmit(evt) {
    evt.preventDefault();

    clearImagesMarkup();

    picturesApiService.query = evt.currentTarget.searchQuery.value.trim();

    if(picturesApiService.query === '') {
        Notify.failure('Enter interested topic');
        return;
    };

    picturesApiService.resetPage();
    picturesApiService.fetchPictures()
        .then((array) => {
            if (array.length === 0) {
                Notify.info('Sorry, there are no images matching your search query. Please try again.');
                return;
            }
            if (array.length < 40) {
                Notify.info("We're sorry, but you've reached the end of search results.");
                appendImagesMarkup(array);
                btnIsHidden();
                return;
            }
            appendImagesMarkup(array);
            btnIsOpen();
        }
    ).catch(error=>console.log(error));

    formEl.reset();
}

function onLoadMore() {
    picturesApiService.fetchPictures()
        .then((array) => {
            if (array.length < 40) {
                Notify.info("We're sorry, but you've reached the end of search results.");
                btnIsHidden();
            }
            appendImagesMarkup(array);
    });
}

function appendImagesMarkup(array){
    galleryEl.insertAdjacentHTML('beforeend', cardTpl(array));
}

function clearImagesMarkup() {
    galleryEl.innerHTML = '';
}

function btnIsHidden(){
    loadMoreBtn.classList.add('is-hidden');
}
function btnIsOpen(){
    loadMoreBtn.classList.remove('is-hidden');
}
