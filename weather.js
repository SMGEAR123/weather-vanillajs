function getWeather(){
console.log('getting weather')


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
          console.log(response)
        }

      }

    }
    weatherRequest();
  }

}

getWeather();
