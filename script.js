'use strict';

const sliderEl = document.querySelector('#range');
const sliderValue = document.querySelector('.length__value');

const btnCopy = document.querySelector('.btn-copy');
const copiedTextEl = document.querySelector('.copied');
const passwordEl = document.querySelector('.password');

const btnGenerate = document.querySelector('#generate');
const lowercase = document.getElementById('lowercase');
const uppercase = document.getElementById('uppercase');
const symbols = document.getElementById('symbols');
const numbers = document.getElementById('numbers');

const generatePassword = function () {
  let charSet = '';
  let password = [];
  const length = +sliderValue.textContent;

  const lowercaseSet = `abcdefghijklmnopqrstuvwxyz`;
  const uppercaseSet = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  const numbersSet = `0123456789`;
  const symbolsSet = `!@#$&*?|%+-_./:;=()[]{}`;

  if (lowercase.checked) charSet += lowercaseSet;
  if (uppercase.checked) charSet += uppercaseSet;
  if (symbols.checked) charSet += symbolsSet;
  if (numbers.checked) charSet += numbersSet;

  for (let i = 0; i < length; i++) {
    password.push(charSet[Math.trunc(Math.random() * charSet.length)]);
  }
  passwordEl.textContent = password.join('');
};
const copyPassword = function () {
  navigator.clipboard.writeText(passwordEl.textContent);
  copiedTextEl.classList.add('show');

  setTimeout(() => {
    copiedTextEl.classList.remove('show');
  }, 2000);
};

const renderPasswordLengthBar = function (e) {
  const tempSliderValue = e.target.value;
  sliderValue.textContent = tempSliderValue;

  const progress = ((tempSliderValue - 4) * 100) / (sliderEl.max - 4);

  sliderEl.style.background = `linear-gradient(to right, #a4ffaf ${progress}%, #18171f ${progress}%)`;
};

//EVENT LISTENERS

sliderEl.addEventListener('input', (e) => {
  renderPasswordLengthBar(e);
});

btnCopy.addEventListener('click', copyPassword);
btnGenerate.addEventListener('click', generatePassword);
