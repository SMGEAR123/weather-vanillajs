function getWeather(){
console.log('getting weather')

var weatherDiv = document.querySelector('.weather');

var weatherImage = document.querySelector('.weather-image');

var locationHeader = document.querySelector('.location');

var tempParagraph = document.querySelector('.temp');

var weatherParagraph = document.querySelector('.weather-type');

var measure = document.querySelector('.measure');

var celciusButton = document.querySelector('.celcius-button');
var buttonFlag = false;

/* Getting location information  using built in geolocation for HTML5  Source: https://www.w3schools.com/html/html5_geolocation.asp */
  function getLocation() {
    console.log('getting location')
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log( "Geolocation not supported by browser.");
    }
  }

getLocation();

  function showPosition (position) {
    /* Logging location and storing it to a variable */
    console.log(position.coords.latitude);
    var lat = position.coords.latitude;
    console.log(position.coords.longitude);
    var long = position.coords.longitude;

    function weatherRequest() {
      /* Creating a request for weather data from FreeCodeCamp Weather API https://fcc-weather-api.glitch.me/api/ */
      console.log('Retrieving Weather!')
      console.log("Current Latitude is " + lat)
      console.log("Current Longitude is " + long)
      var url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`
      console.log(url);

      /* Starting XML HttpRequestRequest below */
      var xmlHttp = new XMLHttpRequest();

      xmlHttp.open('GET', url, true)
      xmlHttp.send();

      xmlHttp.addEventListener('readystatechange', processRequest, false);

      function processRequest(e) {
        console.log(xmlHttp.readyState);
        console.log(xmlHttp.status);

 /* Checking for readyState 4 */
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          console.log('Request is DONE and was successful!')
          var response = JSON.parse(xmlHttp.responseText);
          console.log(response);

          weatherImage.src = response.weather[0].icon;

          weatherImage.alt = response.weather[0].description;

          locationHeader.innerText = response.name;

          tempParagraph.innerText = response.main.temp;

          weatherParagraph.innerText = response.weather[0].description.toUpperCase();

/* Click event to change the measure */
          celciusButton.addEventListener('click', function changeMeasure(){

              console.log('Changing from Celcius to Fahrenheit');
              var tempValue = parseFloat(response.main.temp);
              console.log(tempValue);
              var fahrenheit = (tempValue * 1.8 + 32);
              console.log(fahrenheit);

              tempParagraph.innerText = fahrenheit.toFixed(2);

              /* Code to change the symbol to Fahrenheit in the button Source: https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it*/

              function decodeHTML(html){
                celciusButton.innerHTML = html;
                return celciusButton.value;
              }

              decodeHTML('Measure: &#8457;');

            });




        }

      }

    }
    weatherRequest();
  }

}

getWeather();
