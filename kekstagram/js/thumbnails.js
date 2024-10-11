import {openModal} from './user-modal.js';

const POSTS_NUMBER = 10;

const templatePictures = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const renderPostsList = (usersPosts) => {
  const photoFragment = document.createDocumentFragment();

  usersPosts.forEach(({url, likes, comments}, index) => {
    const postElement = templatePictures.cloneNode(true);
    postElement.querySelector('.picture__img').src = url;
    postElement.querySelector('.picture__likes').textContent = likes;
    postElement.querySelector('.picture__comments').textContent = comments.length;
    photoFragment.appendChild(postElement);
    openModal(postElement, usersPosts[index]);
  });

  picturesList.appendChild(photoFragment);
};

const clearPosts = () => {
  const allPosts = document.querySelectorAll('.picture');

  return allPosts.forEach((element) => {
    element.remove();
  });
};

const sortPosts = (postA, postB) => {
  const postOne = postA.comments.length;
  const postTwo = postB.comments.length;

  return postTwo - postOne;
};

const showDefaultPosts = (posts) => {
  clearPosts();
  renderPostsList(posts);
};

const showRandomPosts = (posts) => {
  clearPosts();

  const randomArray = posts.slice().sort(() => Math.random() - 0.5).slice(0, POSTS_NUMBER);

  renderPostsList(randomArray);
};

const showDiscussedPosts = (posts) => {
  clearPosts();
  const discussedArray = posts.slice().sort(sortPosts);

  renderPostsList(discussedArray);
};

export {renderPostsList, sortPosts, showDefaultPosts, showRandomPosts, showDiscussedPosts};
