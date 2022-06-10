'use strict';

const currentTempElement = document.getElementById('current-temp');
const landscape = document.getElementById('landscape');
const skyOptionElement = document.getElementById('sky-select');
const input = document.querySelector('input');
const cityName = document.getElementById('city-name');

const getCurrentTemp = () => parseInt(currentTempElement.textContent);

const resetCityName = () => {
  cityName.textContent = 'Seattle';
  clearInput();
};

const clearInput = () => {
  input.value = '';
};

const submitCity = (event) => {
  cityName.textContent = input.value;
  clearInput();
  event.preventDefault();
};

const updateDisplay = () => {
  const currentTemp = getCurrentTemp();
  if (currentTemp >= 80) {
    currentTempElement.style.color = 'red';
    currentTempElement.style.background = 'white';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (currentTemp >= 70) {
    currentTempElement.style.color = 'orange';
    currentTempElement.style.background = 'white';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (currentTemp >= 60) {
    currentTempElement.style.color = 'yellow';
    currentTempElement.style.background = 'teal';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (currentTemp >= 50) {
    currentTempElement.style.color = 'green';
    currentTempElement.style.background = 'white';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    currentTempElement.style.color = 'teal';
    currentTempElement.style.background = 'white';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const increaseTemp = () => {
  currentTempElement.textContent = `${getCurrentTemp() + 1}`;
};

const decreaseTemp = () => {
  currentTempElement.textContent = `${getCurrentTemp() - 1}`;
};

const skyMapping = {
  Sunny: '☀️☁️ ☀️☁️ ☀️ ☁️☀️ ☁️ ☀️ ☁️',
  Cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  Rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  Snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};

const updateSky = () => {
  document.getElementById('sky').innerText = skyMapping[skyOptionElement.value];
};

const registerEventHandlers = () => {
  const increaseButton = document.getElementById('increase-button');
  const decreaseButton = document.getElementById('decrease-button');
  const resetButton = document.getElementById('reset-button');
  const form = document.getElementById('form');

  increaseButton.addEventListener('click', increaseTemp);
  increaseButton.addEventListener('click', updateDisplay);
  decreaseButton.addEventListener('click', decreaseTemp);
  decreaseButton.addEventListener('click', updateDisplay);
  resetButton.addEventListener('click', resetCityName);
  form.addEventListener('submit', submitCity);
  skyOptionElement.addEventListener('change', updateSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
