import axios from 'axios';
const fetchRequest = async (value, page) => {
  const fetchTask = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: '46731058-8e313f89df23f954200132c0b',
      q: value,
      page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return fetchTask.data;
};
export default fetchRequest;
