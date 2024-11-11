import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchRequest from './js/pixabay-api';
import drawMarkup from './js/render-functions';

const main = document.querySelector('main');
const searchForm = document.forms.searchForm;
const inp = searchForm.elements.input;
const submitBtn = searchForm.elements.submitButton;
const outputList = document.querySelector('.general-list');

const moreBtn = document.querySelector('button[data-more]');
const loader = document.createElement('span');
loader.classList.add('loader');
const elemsPerPage = 15;
let pageNumber;
let inpVal;

async function handleRequest(value, page) {
  main.append(loader);
  moreBtn.hidden = true;
  const photosArr = await fetchRequest(value, page);
  loader.remove();
  if (!photosArr.hits.length) {
    throw new Error(
      'Sorry, there are no images matching your search query. Please, try again'
    );
  }

  const markup = drawMarkup(photosArr.hits);
  if (page === 1) outputList.innerHTML = markup;
  else outputList.insertAdjacentHTML('beforeend', markup);
  lightboxGallery.refresh();

  if (page * elemsPerPage >= photosArr.totalHits) {
    throw new Error(
      "We're sorry, but you've reached the end of search results."
    );
  }
  moreBtn.hidden = false;
  pageNumber += 1;
}

submitBtn.addEventListener('click', async e => {
  e.preventDefault();
  inpVal = inp.value.trim();
  if (!inpVal) {
    return;
  }
  submitBtn.disabled = true;
  pageNumber = 1;
  try {
    await handleRequest(inpVal, pageNumber);
  } catch (error) {
    outputList.innerHTML = '';
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    submitBtn.disabled = false;
  }
});

moreBtn.addEventListener('click', async () => {
  submitBtn.disabled = true;
  try {
    await handleRequest(inpVal, pageNumber);
    const listElemHeight = document
      .querySelector('.general-list-item')
      .getBoundingClientRect().height;
    scrollBy({ top: listElemHeight * 2 + 32, behavior: 'smooth' });
  } catch (error) {
    iziToast.info({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    submitBtn.disabled = false;
  }
});
const lightboxGallery = new SimpleLightbox('.general-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});
