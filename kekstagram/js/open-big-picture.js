const COUNT_STEP = 5;
let currentCount = 0;
let currentComments = [];

const bigPictureUrl = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const commentsSection = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comments');
const commentFragment = document.createDocumentFragment();

const showNextComments = () => {
  const renderedComments = currentComments.slice(currentCount, currentCount + COUNT_STEP);

  renderedComments.forEach(({avatar, name, message}) => {
    const comment = document.createElement('li');
    const commentImage = document.createElement('img');
    const commentContent = document.createElement('p');

    comment.classList.add('social__comment');
    commentImage.classList.add('social__picture');
    commentContent.classList.add('social__text');

    commentImage.src = avatar;
    commentImage.alt = name;

    commentContent.textContent = message;

    comment.append(commentImage);
    comment.append(commentContent);
    commentFragment.append(comment);
  });
  commentsSection.append(commentFragment);

  socialCommentCount.innerHTML = `${renderedComments.length + currentCount} из <span class="comments-count">${commentsCount.textContent}</span> комментариев`;

  if (renderedComments.length + currentCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
};

const showComments = (commentsArray) => {
  currentComments = commentsArray;
  showNextComments();

  commentsLoader.addEventListener('click', showNextComments);
};

const clearComments = () => {
  currentCount = 0;
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  socialComments.innerHTML = '';
};

const openBigPicture = ({url, likes, comments, description}) => {
  bigPictureUrl.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  showComments(comments);
  socialCaption.textContent = description;
};

export {openBigPicture, clearComments};
