import {resetScale} from './scale-image.js';
import {resetFilter} from './filters.js';
import {closeUploadOverlay, resetForm} from './user-form.js';

const templateSuccess = document.querySelector('#success')
  .content
  .querySelector('.success');
const templateError = document.querySelector('#error')
  .content
  .querySelector('.error');

const isEscapeKey = (evt) => evt.key === 'Escape';

const clearForm = () => {
  resetForm();
  resetFilter();
  resetScale();
};

const showLoadingError = () => {
  const alert = templateError.cloneNode(true);
  const buttonAlert = alert.querySelector('[type=button]');

  alert.querySelector('h2').textContent = 'Ошибка сервера.';
  buttonAlert.textContent = 'Закрыть';

  const closeAlert = () => {
    alert.remove();
  };

  const onButtonClick = () => {
    closeAlert();
    buttonAlert.removeEventListener('click', onButtonClick);
  };

  buttonAlert.addEventListener('click', onButtonClick);

  document.body.appendChild(alert);
};

const showAlert = (template) => {
  const alert = template.cloneNode(true);
  const buttonAlert = alert.querySelector('[type=button]');
  const buttonSuccess = buttonAlert.classList.contains('success__button');

  const closeAlert = () => {
    alert.remove();
  };

  const onButtonClick = () => {
    if (buttonSuccess) {
      clearForm();
    }

    closeAlert();
    removeEventListeners();
  };

  const onDocumentClick = (evt) => {
    if (evt.target === alert) {
      closeAlert();
      removeEventListeners();
    }

    if (buttonSuccess) {
      clearForm();
    }
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeAlert();
      removeEventListeners();
    }

    if (buttonSuccess) {
      clearForm();
    }
  };

  function removeEventListeners () {
    buttonAlert.removeEventListener('click', onButtonClick);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  buttonAlert.addEventListener('click', onButtonClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);

  document.body.appendChild(alert);
};

const showSuccess = () => {
  showAlert(templateSuccess);
  closeUploadOverlay();
};

const showError = () => {
  showAlert(templateError);
};

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, clearForm, showSuccess, showError, showLoadingError, debounce};
