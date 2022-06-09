'use strict';
const state = {
  currentTemp: 70,
};

const currentTempElement = document.getElementById('current-temp');

const getCurrentTemp = () =>
  parseInt(document.getElementById('current-temp').textContent);

const increaseTemp = () => {
  state.currentTemp += 1;
  document.getElementById('current-temp').textContent = `${state.currentTemp}`;
};

const decreaseTemp = () => {
  state.currentTemp -= 1;
  document.getElementById('current-temp').textContent = `${state.currentTemp}`;
};

const weatherGarden = document.getElementById('weather-garden');

const registerEventHandlers = () => {
  const increaseButton = document.getElementById('increase-button');
  const decreaseButton = document.getElementById('decrease-button');
  increaseButton.addEventListener('click', increaseTemp);
  decreaseButton.addEventListener('click', decreaseTemp);
  console.log(state.currentTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
