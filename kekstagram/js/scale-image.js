const VALUE_STEP = 25;
const MIN_IMAGE_SIZE = 25;
const MAX_IMAGE_SIZE = 100;

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const currentPhoto = document.querySelector('.img-upload__preview img');

scaleInput.value = '100%';
let currentValue = parseInt(scaleInput.value, 10);

buttonSmaller.addEventListener('click', () => {
  if (currentValue <= MIN_IMAGE_SIZE) {
    return false;
  }

  currentValue = currentValue - VALUE_STEP;

  const currentScale = currentValue / 100;

  scaleInput.value = `${currentValue}%`;
  currentPhoto.style.transform = `scale(${currentScale})`;
});

buttonBigger.addEventListener('click', () => {
  if (currentValue >= MAX_IMAGE_SIZE) {
    return false;
  }

  currentValue = currentValue + VALUE_STEP;

  const currentScale = currentValue / 100;

  scaleInput.value = `${currentValue}%`;
  currentPhoto.style.transform = `scale(${currentScale})`;
});

const resetScale = () => {
  currentValue = 100;
  scaleInput.value = '100%';
  currentPhoto.style.transform = 'scale(1)';
};

export {resetScale};
