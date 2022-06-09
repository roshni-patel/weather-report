'use strict';
let currentTemp = parseInt(document.getElementById('current-temp').textContent);
const increaseTemp = () => {
  currentTemp += 1;
  document.getElementById('current-temp').textContent = `${currentTemp}`;
};

const decreaseTemp = () => {
  currentTemp -= 1;
  document.getElementById('current-temp').textContent = `${currentTemp}`;
};

const registerEventHandlers = () => {
  const currentTemp = document.getElementById('current-temp');
  const increaseButton = document.getElementById('increase-button');
  const decreaseButton = document.getElementById('decrease-button');
  increaseButton.addEventListener('click', increaseTemp);
  decreaseButton.addEventListener('click', decreaseTemp);
  // currentTemp.textContent = currentTemp.value;
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
