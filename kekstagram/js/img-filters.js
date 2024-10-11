import {showDefaultPosts, showRandomPosts, showDiscussedPosts} from './thumbnails.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const formFilters = document.querySelector('.img-filters__form');

const setFilterType = (posts, filterType) => {
  if (filterType === 'filter-default') {
    showDefaultPosts(posts);
  } else if (filterType === 'filter-random') {
    showRandomPosts(posts);
  } else if (filterType === 'filter-discussed') {
    showDiscussedPosts(posts);
  }
};

const debouncedSort = debounce(setFilterType, RERENDER_DELAY);

const setFilterClickListener = (posts) => {
  formFilters.addEventListener('click', (evt) => {

    debouncedSort(posts, evt.target.id);

    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  });
};

const showFilters = (posts) => {
  imgFilters.classList.remove('img-filters--inactive');
  setFilterClickListener(posts);
};

export {showFilters, setFilterType};
