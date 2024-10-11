import {isEscapeKey} from './util.js';
import {clearForm} from './util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.body;
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeOverlayButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const previewImage = document.querySelector('.img-upload__preview img');
const previewFilterMiniatures = document.querySelectorAll('.effects__preview');

const isInputFocused = () => {
  const activeElement = document.activeElement;
  return activeElement.classList.contains('text__hashtags') || activeElement.classList.contains('text__description');
};

const onDocumentKeydown = (evt) => {
  const errorAlert = document.querySelector('.error');

  if (isEscapeKey(evt) && !isInputFocused() && !errorAlert) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const resetForm = () => {
  form.reset();
};

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    previewImage.src = URL.createObjectURL(file);
    previewFilterMiniatures.forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }

  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
});

function closeUploadOverlay () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = '';
  clearForm();

  document.removeEventListener('keydown', onDocumentKeydown);
}

closeOverlayButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  closeUploadOverlay();
});

export {closeUploadOverlay, resetForm};
