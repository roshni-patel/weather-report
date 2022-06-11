'use strict';

// default state
const state = {
  playgroundTemp: 60,
  displayedLiveTemp: null,
  liveTempInK: 295,
  liveweather: null,
  unit: 'F',
  cityName: 'Seattle',
};

// --- HTML DOM Elements ---
const playgroundTempElement = document.getElementById('playground-temp');
const cityName = document.getElementById('city-name');
const liveTempElement = document.getElementById('live-temp');
const celsiusButton = document.getElementById('celsius');
const fahrenheitButton = document.getElementById('fahrenheit');
const skyOptionElement = document.getElementById('sky-select');

fahrenheitButton.disabled = true;
let currentTempScale = 'Fahrenheit';

// --- Playground Temp --- //
const updatePlaygroundTemp = (change) => (state.playgroundTemp += change);

const displayPlaygroundTemp = () => {
  playgroundTempElement.textContent = `${
    state.playgroundTemp
  } ${String.fromCharCode(176)} ${state.unit}`;
};

const updatePlaygroundRealTemp = () => {
  getRealWeatherInfo();
  displayLiveTemp();
  state.playgroundTemp = state.displayedLiveTemp;
  displayPlaygroundTemp();
};

// -- Input for city name -- //

const displayCityName = () => {
  document.getElementById('city-name').textContent = state.city;
};

const resetCityName = () => {
  state.cityName = 'Seattle';
  displayCityName();
};

const submitCity = (event) => {
  const input = document.querySelector('input');
  if (input.value) {
    state.city = input.value;
  }
  input.value = '';
  event.preventDefault();
  displayCityName();
};

// -- Update playground text color, landscape, garden bg color --
const updatePlayground = (tempTextColor, gardenBgColor, landscapeText) => {
  const weatherGardenElement = document.getElementById('weather-garden');
  const landscapeElement = document.getElementById('landscape');

  playgroundTempElement.style.color = tempTextColor;
  weatherGardenElement.style.backgroundColor = gardenBgColor;
  landscapeElement.textContent = landscapeText;
};

const updateAll = () => {
  const currentTemp = state.temp;
  displayPlaygroundTemp();
  if (currentTemp >= 80) {
    updatePlayground('red', 'red', '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂');
  } else if (currentTemp >= 70) {
    updatePlayground('orange', 'yellow', '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷');
  } else if (currentTemp >= 60) {
    updatePlayground('yellow', 'pink', '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃');
  } else if (currentTemp >= 50) {
    updatePlayground('green', 'teal', '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲');
  } else {
    updatePlayground('teal', 'grey', '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲');
  }
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
  try {
    const currentCityName = cityName.textContent;
    const response = await axios.get(
      `https://weather-report-backend.herokuapp.com/location?q=${currentCityName}`
    );

    return [response.data[0].lat, response.data[0].lon];
  } catch (error) {
    console.log(error);
    console.log('error in getLatLongFromCityName!');
  }
};

const getRealWeatherInfo = async () => {
  try {
    const [lat, lon] = await getLatLongFromCityName();

    const response = await axios.get(
      `https://weather-report-backend.herokuapp.com/weather?lat=${lat}&lon=${lon}`
    );
    state.liveTempInK = response.data.current.temp;
    state.liveweather = response.data.current.weather[0].description;
  } catch (error) {
    console.log(error);
    console.log('error in getRealWeatherInfo!');
  }
};

const getCityFromLatLon = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://weather-report-backend.herokuapp.com/location/reverse?lat=${lat}&lon=${lon}`
    );
    const city = response.data.address.city;
    return city;
  } catch (error) {
    console.log(error);
    console.log('error in findLatitudeAndLongitude!');
  }
};

const getCurrentCity = () => {
  // using HTML Geolocation API to get current location if browser permits
  navigator.geolocation.getCurrentPosition(displayCurrentCity);
};

const displayCurrentCity = async (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const city = await getCityFromLatLon(lat, lon);
  if (city) {
    state.cityName = `${city}`;
  }
  displayCityName();
};

// --- Display Live Date Time ---
const getTodayDateAsString = () => {
  const utcDateTime = new Date();
  const pstDateTime = utcDateTime.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'full',
    timeStyle: 'long',
  });
  return pstDateTime;
};

const displayDateTime = () => {
  const todayDateElement = document.getElementById('today-date');
  const currentTimeElement = document.getElementById('current-time');
  const dateTimeString = getTodayDateAsString();
  const [date, time] = dateTimeString.split(' at ');
  todayDateElement.textContent = date;
  currentTimeElement.textContent = time;
  updateDateTime();
};

const updateDateTime = () => {
  setTimeout(displayDateTime, 1000);
};

//--- Display live weather info ---

const displayLiveWeatherDescription = () => {
  getRealWeatherInfo();
  const weatherInfoElement = document.getElementById('weather-description');
  weatherInfoElement.textContent = state.liveweather;
};

const displayLiveTemp = async () => {
  state.displayedLiveTemp =
    state.unit === 'F'
      ? convertKToF(state.liveTempInK)
      : convertKToC(state.liveTempInK);
  const degreeSymbol = String.fromCharCode(176);
  liveTempElement.textContent = `${state.displayedLiveTemp} ${degreeSymbol} ${state.unit}`;
};

const displayWeatherInfo = () => {
  displayLiveWeatherDescription();
  getRealWeatherInfo();
  displayLiveTemp();
  displayPlaygroundTemp();
};

const convertFToC = (tempF) => Math.round((5 / 9) * (tempF - 32));
const convertCToF = (tempC) => Math.round((tempC * 9) / 5 + 32);
const convertKToC = (tempK) => Math.round(tempK - 273.15);

const convertToCelsius = () => {
  celsiusButton.disabled = true;
  fahrenheitButton.disabled = false;
  state.unit = 'C';
  state.playgroundTemp = convertFToC(state.playgroundTemp);
  state.displayedLiveTemp = convertKToC(state.liveTempInK);
  displayPlaygroundTemp();
  displayLiveTemp();
};

const convertToFahrenheit = () => {
  fahrenheitButton.disabled = true;
  celsiusButton.disabled = false;
  state.unit = 'F';
  state.playgroundTemp = convertCToF(state.playgroundTemp);
  state.displayedLiveTemp = convertKToF(state.liveTempInK);
  displayPlaygroundTemp();
  displayLiveTemp();
};

const registerEventHandlers = () => {
  const increaseButton = document.getElementById('increase-button');
  const decreaseButton = document.getElementById('decrease-button');
  const resetButton = document.getElementById('reset-button');
  const form = document.getElementById('form');
  const getRealTimeTempButton = document.getElementById('get-realtime-temp');
  const currentCityButton = document.getElementById('get-current-city-button');

  increaseButton.addEventListener('click', () => updatePlaygroundTemp(1));
  increaseButton.addEventListener('click', updateAll);
  decreaseButton.addEventListener('click', () => updatePlaygroundTemp(-1));
  decreaseButton.addEventListener('click', updateAll);
  resetButton.addEventListener('click', resetCityName);
  form.addEventListener('submit', submitCity);
  form.addEventListener('submit', displayWeatherInfo);
  skyOptionElement.addEventListener('change', updateSky);
  getRealTimeTempButton.addEventListener('click', updatePlaygroundRealTemp);
  currentCityButton.addEventListener('click', getCurrentCity);
  currentCityButton.addEventListener('click', displayWeatherInfo);
  celsiusButton.addEventListener('click', convertToCelsius);
  fahrenheitButton.addEventListener('click', convertToFahrenheit);
};

updateDateTime();
if (state.liveweather === null) {
  displayWeatherInfo();
}
document.addEventListener('DOMContentLoaded', registerEventHandlers);
