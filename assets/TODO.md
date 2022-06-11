# Task
- [x] Setup
- [x] Run yarn install
- [x] Include script tag in index.html
### Wave 1
- [x] Create Wireframe
- [x] Link things in index.html
- [x] Link index.css
- [x] Link index.js
- [x] Link ./node_modules/axios/dist/axios.min.js
- [x] Make one commit
### Wave 2
- [x] An element that displays the temperature
- [x] the temperature number changes color
- [x] the background of the temperature changes color
There must be at least five categories of distinguishable colors.
- [x] A clickable element to increase temperature
- [x] A clickable element to decrease temperature
- [x] An element that displays a landscape
Depending on what temperature it is, a different landscape should appear on the page.
Changing landscapes should replace the existing landscape. There should only be one visible landscape at a time.
There must be at least four landscapes.
- [x] Make one commit
### Wave 3
- [x] An element that displays the city name
- [x] The city name must update every time there's a change to the text input element.
Hint: This feature requires you to grab the value of the text input element.
- [x] An element that contains an <input type="text"> element, used to rename the city
- [x] Make one commit
### Wave 4
- [x] A clickable element to get the current temperature of the displayed city name
- [x] Add a button element
- [x] Get the latitude and longitude of the city using the LocationIQ API
- [x] Then use the latitude and longitude with the OpenWeather API to get current weather data
- [x] To get started and generate API tokens, create accounts and log into LocationIQ and OpenWeather.
- [x] Make axios calls to our Weather Report proxy server. (provided)
- [x] add a .env file with your API keys.
- [x] Check to make sure VS code error doesn't happen (see other tab)
- [x] Make one commit
## Wave 5
- [x] A \<select> dropdown element to set the sky type
- [x] Changing the sky should replace the existing sky. 
- [x] There should only be one visible sky at a time.
- [x] An element that displays a sky
- [x] There must be at least four skies
- [x] See Wave 5 hints (next tab)
- [x] Make one commit
### Wave 6
- [x] A clickable element to reset the city name
- [x] Make a button
- [x] When a user clicks on this button, the city name will be set to a default name.
- [x] This reset button should also affect the city name text input element.
- [x] The text input element's value should be set to the default city name, or become blank.
- [x] Make one commit

### EXTRA FEATURES:
- [x] Deployed proxy backend server to Heroku: https://weather-report-backend.herokuapp.com/
- [x] Get current location button to get current city if browser permits
- [x] Display current date and weather info of displayed city
- [x] Options to choose either C or F
- [ ] Add CSS 
- [ ] Deploy to Github Pages