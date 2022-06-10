'use strict';

const currentTempElement = document.getElementById('current-temp');
const landscape = document.getElementById('landscape');

const getCurrentTemp = () => parseInt(currentTempElement.textContent);

const input = document.querySelector('input');
const cityName = document.getElementById('city-name');

// We don't need this since we decided we only want the city name to display once we submit
// const updateCityName = (e) => {
//   if (e.target.value.length > 0) {
//     cityName.textContent = e.target.value;
//   } else {
//     cityName.textContent = 'Seattle';
//   }
// };
// input.oninput = updateCityName;

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
  updateDisplay();
};

const decreaseTemp = () => {
  currentTempElement.textContent = `${getCurrentTemp() - 1}`;
  updateDisplay();
};

const registerEventHandlers = () => {
  updateDisplay();
  const increaseButton = document.getElementById('increase-button');
  const decreaseButton = document.getElementById('decrease-button');
  const resetButton = document.getElementById('reset-button');
  const form = document.getElementById('form');
  increaseButton.addEventListener('click', increaseTemp);
  decreaseButton.addEventListener('click', decreaseTemp);
  resetButton.addEventListener('click', resetCityName);
  form.addEventListener('submit', submitCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
