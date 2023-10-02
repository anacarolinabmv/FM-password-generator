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

const strengthBars = document.querySelector('.strength__rating-box');
const strengthLevel = document.querySelector('.strength__level');

// FUNCTIONS
const testPasswordStrength = function (password) {
  const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{10,})/; //Must contain at least: 1 number, 1 uppercase character, 1 lower case character and 1 especial character and minimum length of 10 characters

  const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{8,})/; //Must contain at least: 1 number, 1 uppercase character, 1 lower case character and 1 especial character and minimum length of 8 characters

  const regexWeek = /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0123456789])|(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~]))(?=.{6,})/; //Must contain at least: 1 number or 1 uppercase character or 1 lower case character or 1 especial character and minimum length of 6 characters

  if (regexStrong.test(password)) return 'strong';
  if (regexMedium.test(password)) return 'medium';
  if (regexWeek.test(password)) return 'week';
  else return 'too-week';
};

const renderPasswordStrengh = function (password) {
  const strength = testPasswordStrength(password);

  strengthBars.setAttribute('class', 'strength__rating-box');
  strengthBars.classList.add(strength);

  strengthLevel.textContent = strength === 'too-week' ? 'too week!' : strength;
};

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
  if (numbers.checked) charSet += numbersSet;
  if (symbols.checked) charSet += symbolsSet;

  for (let i = 0; i < length; i++) {
    password.push(charSet[Math.trunc(Math.random() * charSet.length)]);
  }
  passwordEl.classList.remove('empty');
  passwordEl.textContent = password.join('');

  renderPasswordStrengh(password.join(''));
};

const copyPassword = function () {
  if (passwordEl.classList.contains('empty')) return;

  navigator.clipboard.writeText(passwordEl.textContent);
  copiedTextEl.classList.add('show');

  setTimeout(() => {
    copiedTextEl.classList.remove('show');
  }, 2000);
};

const renderPasswordLengthBar = function (e) {
  const tempSliderValue = e.target.value;
  sliderValue.textContent = tempSliderValue;

  const progress = ((tempSliderValue - sliderEl.min) * 100) / (sliderEl.max - sliderEl.min);

  sliderEl.style.background = `linear-gradient(to right, #a4ffaf ${progress}%, #18171f ${progress}%)`;
};
//EVENT LISTENERS

sliderEl.addEventListener('input', (e) => {
  renderPasswordLengthBar(e);
});

btnCopy.addEventListener('click', copyPassword);

btnGenerate.addEventListener('click', generatePassword);
