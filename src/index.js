'use strict';

const currentTempElement = document.getElementById('current-temp');
const landscapeElement = document.getElementById('landscape');
const weatherGardenElement = document.getElementById('weather-garden');
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

const updateDisplay = (tempTextColor, gardenBgColor, landscapeText) => {
  currentTempElement.style.color = tempTextColor;
  weatherGardenElement.style.backgroundColor = gardenBgColor;
  landscapeElement.textContent = landscapeText;
};
const updateAll = () => {
  const currentTemp = getCurrentTemp();
  if (currentTemp >= 80) {
    updateDisplay('red', 'red', '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂');
  } else if (currentTemp >= 70) {
    updateDisplay('orange', 'yellow', '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷');
  } else if (currentTemp >= 60) {
    updateDisplay('yellow', 'pink', '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃');
  } else if (currentTemp >= 50) {
    updateDisplay('green', 'teal', '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲');
  } else {
    updateDisplay('teal', 'grey', '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲');
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

const convertKToF = (kelvinTemp) => {
  return Math.floor((kelvinTemp * 9) / 5 - 459.67);
};

const getLatLongFromCityName = async () => {
  const currentCityName = cityName.textContent;
  const response = await axios.get(
    `https://weather-report-backend.herokuapp.com/location?q=${currentCityName}}`
  );

  const lat = response.data[0].lat;
  const lon = response.data[0].lon;

  return {
    lat: lat,
    lon: lon,
  };
};

const getRealTimeTemp = async () => {
  const { lat, lon } = await getLatLongFromCityName();

  axios
    .get(
      `https://weather-report-backend.herokuapp.com/weather?lat=${lat}&lon=${lon}`
    )
    .then((response) => {
      const kelvinTemp = response.data.current.temp;
      currentTempElement.textContent = convertKToF(kelvinTemp);
    });
};

const registerEventHandlers = () => {
  const increaseButton = document.getElementById('increase-button');
  const decreaseButton = document.getElementById('decrease-button');
  const resetButton = document.getElementById('reset-button');
  const form = document.getElementById('form');
  const getRealTimeTempButton = document.getElementById('get-realtime-temp');

  increaseButton.addEventListener('click', increaseTemp);
  increaseButton.addEventListener('click', updateAll);
  decreaseButton.addEventListener('click', decreaseTemp);
  decreaseButton.addEventListener('click', updateAll);
  resetButton.addEventListener('click', resetCityName);
  form.addEventListener('submit', submitCity);
  skyOptionElement.addEventListener('change', updateSky);
  getRealTimeTempButton.addEventListener('click', getRealTimeTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
