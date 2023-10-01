'use strict';

const sliderEl = document.querySelector('#range');
const sliderValue = document.querySelector('.length__value');

const btnCopy = document.querySelector('.btn-copy');
const passwordEl = document.querySelector('.password');

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

btnCopy.addEventListener('click', function () {
  navigator.clipboard.writeText(passwordEl.textContent);
});
