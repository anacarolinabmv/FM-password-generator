'use strict';

const sliderEl = document.querySelector('#range');
const sliderValue = document.querySelector('.length__value');

const btnCopy = document.querySelector('.btn-copy');
const copiedTextEl = document.querySelector('.copied');
const passwordEl = document.querySelector('.password');

const copyPassword = function () {
  navigator.clipboard.writeText(passwordEl.textContent);
  copiedTextEl.classList.add('show');

  setTimeout(() => {
    copiedTextEl.classList.remove('show');
  }, 2000);
};

const renderPasswordLength = function (e) {
  const tempSliderValue = e.target.value;
  sliderValue.textContent = tempSliderValue;

  const progress = ((tempSliderValue - 4) * 100) / (sliderEl.max - 4);

  sliderEl.style.background = `linear-gradient(to right, #a4ffaf ${progress}%, #18171f ${progress}%)`;
};

//EVENT LISTENERS

sliderEl.addEventListener('input', (e) => {
  renderPasswordLength(e);
});

btnCopy.addEventListener('click', copyPassword);
