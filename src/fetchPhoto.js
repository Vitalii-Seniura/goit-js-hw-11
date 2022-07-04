import axios from "axios";

const BASE_URL = "https://pixabay.com/api/"
const API_KEY = '28436023-a5d1ac3dfed2e17b83fc46f1a';



export const  URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent('red roses');
getJSON(URL, function(data){
if (parseInt(data.totalHits) > 0)
    each(data.hits, function(i, hit){ console.log(hit.pageURL); });
else
    console.log('No hits');
});



export const fetchCountries = (name) => {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages
`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};