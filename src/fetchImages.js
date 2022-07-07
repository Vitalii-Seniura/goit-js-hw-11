import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/"
let page = 1;

export const resetPage = () => {
    page = 1;
};

export const fetchImage = async name => {
  const searchParams = new URLSearchParams({
  key: '28436023-a5d1ac3dfed2e17b83fc46f1a',
  q: name,
  image_type: "photo",
  orientation: "horizontal",
  safesearch: 'true',
  page: page,
  per_page: 40,
  });
    page += 1;
    return await axios.get(`?${searchParams}`).then(response => response.data);
}