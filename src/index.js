import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.images');

let searchTopic = '';


formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();

    searchTopic = evt.currentTarget.searchQuery.value.trim();

    if(searchTopic === '') {
        Notify.failure('Enter interested topic');
        return;
    };
}