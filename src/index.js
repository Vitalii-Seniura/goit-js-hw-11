
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImage, resetPage } from './fetchImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let name = '';
  
form.addEventListener("submit", onSubmit);

loadMore.addEventListener("click", () => {
  fetchImage(name).then(data => {
    
    return data.hits
  })
  .then(hits => {gallery.insertAdjacentHTML("beforeend" , createMarkup(hits))
    lightbox.refresh();}).catch(error =>
  console.log(error));
})


function onSubmit(event) {
  event.preventDefault();
  resetPage();
  loadMore.classList.remove('is-visible');
  const name = form.elements.searchQuery.value;
  if (name === "") {gallery.innerHTML = "";
    return Notify.failure
      ('Sorry, there are no images matching your search query. Please try again.');
  }
  
  fetchImage(name).then(data => {
    return data.hits
  })
  .then(hits => {gallery.innerHTML = createMarkup(hits)
    lightbox.refresh();
  loadMore.classList.add('is-visible')}).catch(error =>
  console.log(error));
};

  
function createMarkup(hits){
    const markup = hits.map(({name, webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `
       <div class="photo-card">
       <a class="gallery__link" href="${largeImageURL}">
       <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
       </a>
       <div class="info">
         <p class="info-item">
           <b>Likes: ${likes}</b>
         </p>
         <p class="info-item">
           <b>Views: ${views}</b>
         </p>
         <p class="info-item">
           <b>Comments: ${comments}</b>
         </p>
         <p class="info-item">
           <b>Downloads: ${downloads}</b>
         </p>
       </div>
     </div>`;}).join("");
    return markup;
     
};
 
let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});




