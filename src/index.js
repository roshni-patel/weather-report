'use strict';

// default state
const state = {
  playgroundTemp: 60,
  displayedLiveTemp: null,
  liveTempInK: null,
  liveWeather: null,
  unit: 'F',
  city: 'Seattle',
};

// --- HTML DOM Elements ---
const playgroundTempElement = document.getElementById('playground-temp');
const skyOptionElement = document.getElementById('sky-select');
const celsiusButton = document.getElementById('celsius');
const fahrenheitButton = document.getElementById('fahrenheit');
const inputElement = document.querySelector('input');

// Other global const
const degreeSymbol = String.fromCharCode(176);

// --- City Name --- //
const displayCityName = () => {
  document.getElementById('city-name').textContent = state.city;
};

const resetCityName = () => {
  state.city = 'Seattle';
  displayCityName();
};

const submitCity = (event) => {
  // update city name from input form
  if (inputElement.value) {
    state.city = inputElement.value;
  }
  inputElement.value = '';
  event.preventDefault();
  displayCityName();
};

const cityName = document.getElementById('city-name');

const updateCityName = (e) => {
  cityName.textContent = e.target.value;
  if (e.target.value.length === 0) {
    resetCityName();
  }
};

const getCurrentCity = () => {
  // using HTML Geolocation API to get coordinates of the current location if browser permits
  const success = async (position) => {
    // This function will make an API call to LocationIQ reverse geocoding API
    // to get city name from lat & lon
    // and display the current city name
    console.log('HTML Geolocation API called.');
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const city = await getCityFromLatLon(lat, lon);
    if (city) {
      state.city = `${city}`;
    }
    displayCityName();
    await displayWeatherInfo(); // API call
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}):${err.message}`);
    alert('Your browser does not permit location sharing.');
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

const getCityFromLatLon = async (lat, lon) => {
  // This function will make an API call to LocationIQ reverse geocoding API
  try {
    const response = await axios.get(
      `https://weather-report-backend.herokuapp.com/location/reverse?lat=${lat}&lon=${lon}`
    );
    const city = response.data.address.city;
    console.log('LocationIQ Reverse Geocoding called by getCityFromLatLon');
    return city;
  } catch (error) {
    console.log(error);
    console.log('error in getCityFromLatLon');
  }
};

// --- Playground box --- //

const updatePlaygroundColor = (tempTextColor, gardenBgColor, landscapeText) => {
  const weatherGardenElement = document.getElementById('weather-garden');
  const landscapeElement = document.getElementById('landscape');

  playgroundTempElement.style.color = tempTextColor;
  weatherGardenElement.style.backgroundColor = gardenBgColor;
  landscapeElement.textContent = landscapeText;
};

const updatePlayground = () => {
  document.getElementById('weather-garden-text').style.color = 'white';
  const tempF =
    state.unit === 'F'
      ? state.playgroundTemp
      : convertCToF(state.playgroundTemp);
  if (tempF >= 80) {
    updatePlaygroundColor('red', 'red', '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂');
  } else if (tempF >= 70) {
    document.getElementById('weather-garden-text').style.color = 'black';
    updatePlaygroundColor('orange', 'yellow', '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷');
  } else if (tempF >= 60) {
    updatePlaygroundColor('#F6BE00', 'pink', '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃');
  } else if (tempF >= 50) {
    updatePlaygroundColor('green', 'teal', '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲');
  } else {
    updatePlaygroundColor('teal', 'grey', '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲');
  }
  displayPlaygroundTemp();
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

// --- Get Realtime Weather Info based on current city name --- //
const getRealWeatherInfo = async () => {
  // This function will make an API call to OpenWeather
  try {
    const [lat, lon] = await getLatLongFromCityName();
    const response = await axios.get(
      `https://weather-report-backend.herokuapp.com/weather?lat=${lat}&lon=${lon}`
    );
    state.liveTempInK = response.data.current.temp;
    state.liveWeather = response.data.current.weather[0].description;
    console.log('OpenWeather API called by getRealWeatherInfo');
  } catch (error) {
    console.log(error);
    console.log('error in getRealWeatherInfo');
  }
};

const getLatLongFromCityName = async () => {
  // This function will make an API call to LocationIQ
  try {
    const currentCityName = state.city;
    const response = await axios.get(
      `https://weather-report-backend.herokuapp.com/location?q=${currentCityName}`
    );
    console.log('LocationIQ API called by getLatLongFromCityName');
    return [response.data[0].lat, response.data[0].lon];
  } catch (error) {
    console.log(error);
    console.log('error in getLatLongFromCityName');
  }
};

const displayWeatherInfo = async () => {
  await getRealWeatherInfo(); // API call
  displayLiveWeatherDescription();
  displayLiveTemp();
  displayPlaygroundTemp();
};

const displayLiveWeatherDescription = () => {
  document.getElementById('weather-description').textContent =
    state.liveWeather;
};

// --- Live Temp of displayed city --- //
const displayLiveTemp = () => {
  state.displayedLiveTemp =
    state.unit === 'F'
      ? convertKToF(state.liveTempInK)
      : convertKToC(state.liveTempInK);

  const liveTempElement = document.getElementById('live-temp');
  liveTempElement.textContent = `${state.displayedLiveTemp}${degreeSymbol}${state.unit}`;
};

// --- Playground Temp --- //
const updatePlaygroundTemp = (change) => (state.playgroundTemp += change);

const displayPlaygroundTemp = () =>
  (playgroundTempElement.textContent = `${state.playgroundTemp}${degreeSymbol}${state.unit}`);

const updatePlaygroundRealTemp = () => {
  displayLiveTemp();
  state.playgroundTemp = state.displayedLiveTemp;
  displayPlaygroundTemp();
};

// Temperature conversion

const convertFToC = (tempF) => Math.round((5 / 9) * (tempF - 32));
const convertCToF = (tempC) => Math.round(tempC * (9 / 5) + 32);
const convertKToC = (tempK) => Math.round(tempK - 273.15);
const convertKToF = (tempK) => Math.round((tempK - 273.15) * (9 / 5) + 32);

const convertAllToCelsius = () => {
  celsiusButton.disabled = true;
  fahrenheitButton.disabled = false;
  state.unit = 'C';
  state.playgroundTemp = convertFToC(state.playgroundTemp);
  state.displayedLiveTemp = convertKToC(state.liveTempInK);
  displayPlaygroundTemp();
  displayLiveTemp();
};

const convertAllToFahrenheit = () => {
  fahrenheitButton.disabled = true;
  celsiusButton.disabled = false;
  state.unit = 'F';
  state.playgroundTemp = convertCToF(state.playgroundTemp);
  state.displayedLiveTemp = convertKToF(state.liveTempInK);
  displayPlaygroundTemp();
  updatePlayground();
};

// --- Display Live Date Time --- //
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
  const updateDateTime = () => {
    setTimeout(displayDateTime, 1000);
  };

  const todayDateElement = document.getElementById('today-date');
  const currentTimeElement = document.getElementById('current-time');
  const dateTimeString = getTodayDateAsString();
  const [date, time] = dateTimeString.split(' at ');
  todayDateElement.textContent = date;
  currentTimeElement.textContent = time;
  updateDateTime();
};

// --- Main script --- //
fahrenheitButton.disabled = true;

displayDateTime();

if (state.liveTempInK === null) {
  displayWeatherInfo();
}

const registerEventHandlers = () => {
  celsiusButton.addEventListener('click', convertAllToCelsius);
  fahrenheitButton.addEventListener('click', convertAllToFahrenheit);
  skyOptionElement.addEventListener('change', updateSky);
  inputElement.addEventListener('input', updateCityName);

  const increaseButton = document.getElementById('increase-button');
  increaseButton.addEventListener('click', () => {
    updatePlaygroundTemp(1);
    updatePlayground();
  });

  const decreaseButton = document.getElementById('decrease-button');
  decreaseButton.addEventListener('click', () => {
    updatePlaygroundTemp(-1);
    updatePlayground();
  });

  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', async () => {
    resetCityName();
    await displayWeatherInfo(); // API call
  });

  const form = document.getElementById('form');
  form.addEventListener('submit', async (e) => {
    submitCity(e);
    await displayWeatherInfo(); // API call
  });

  const getRealTimeTempButton = document.getElementById('get-realtime-temp');
  getRealTimeTempButton.addEventListener('click', async () => {
    await getRealWeatherInfo(); // API call
    updatePlaygroundRealTemp();
  });

  const currentCityButton = document.getElementById('get-current-city-button');
  currentCityButton.addEventListener('click', () => {
    getCurrentCity(); // API call
    alert('Please wait a few seconds to get your current location.');
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
