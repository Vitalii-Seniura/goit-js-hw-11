
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

axios.defaults.baseURL = "https://pixabay.com/api/"

const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
  
form.addEventListener("submit", onSubmit);
// loadMore.addEventListener("click", onMore);


function onSubmit(event) {
  event.preventDefault();
  const name = form.elements.searchQuery.value;
  if (name === "") {gallery.innerHTML = "";
    return Notify.failure
      ('Sorry, there are no images matching your search query. Please try again.');
  }
  fetchImage(name).then(data => {
    return data.hits
  })
  .then(hits => {gallery.innerHTML = createMarkup(hits)
    lightbox.refresh();}).catch(error =>
  console.log(error));
};



function fetchImage(name) {
  const searchParams = new URLSearchParams({
  key: '28436023-a5d1ac3dfed2e17b83fc46f1a',
  q: name,
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
});
  return axios.get(`?${searchParams}`).then(response => response.data);
}
  
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




