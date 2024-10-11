const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const currentPhoto = document.querySelector('.img-upload__preview img');
const effectsRadio = document.querySelectorAll('.effects__radio');

const filterList = {
  none: {
    min: 0,
    max: 0,
    start: 0,
    step: 1,
    filter: '',
    units: ''
  },
  chrome: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    filter: 'grayscale',
    units: ''
  },
  sepia: {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    filter: 'sepia',
    units: ''
  },
  marvin: {
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    filter: 'invert',
    units: '%'
  },
  phobos: {
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    filter: 'blur',
    units: 'px'
  },
  heat: {
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    filter: 'brightness',
    units: ''
  }
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  sliderValue.value = sliderElement.noUiSlider.get();
});

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
  sliderElement.removeAttribute('disabled');
};

const hideSlider = () => {
  sliderElement.setAttribute('disabled', true);
  sliderContainer.classList.add('hidden');
};

const clearStyle = () => {
  currentPhoto.style.filter = '';
  sliderValue.value = '';
};

let currentSettings = {};

effectsList.addEventListener('change', (evt) => {
  const currentFilter = filterList[evt.target.value];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentFilter.min,
      max: currentFilter.max,
    },
    start: currentFilter.start,
    step: currentFilter.step,
  });

  currentSettings = {
    filter: currentFilter.filter,
    units: currentFilter.units
  };

  currentPhoto.classList.add(`effects__preview--${currentFilter.filter}`);

  effectsRadio.forEach((effect) => {
    effect.addEventListener('click', () => {
      if (currentPhoto.classList.contains(`effects__preview--${currentFilter.filter}`)) {
        currentPhoto.classList.remove(`effects__preview--${currentFilter.filter}`);
      }
    });
  });

  showSlider();

  if (evt.target.value === 'none') {
    currentPhoto.className = '';
    hideSlider();
    clearStyle();
  }

  currentPhoto.style.filter = `${currentFilter.filter}(${currentFilter.max}${currentFilter.units})`;
});

sliderElement.noUiSlider.on('update', () => {
  sliderValue.value = sliderElement.noUiSlider.get();
  currentPhoto.style.filter = `${currentSettings.filter}(${sliderValue.value}${currentSettings.units})`;
});

const resetFilter = () => {
  currentPhoto.className = '';
  hideSlider();
  clearStyle();
};

hideSlider();

export {resetFilter};
