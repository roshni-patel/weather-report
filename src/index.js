'use strict';

const currentTempElement = document.getElementById('current-temp');
const landscape = document.getElementById('landscape');

const getCurrentTemp = () => parseInt(currentTempElement.textContent);

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
  increaseButton.addEventListener('click', increaseTemp);
  decreaseButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
