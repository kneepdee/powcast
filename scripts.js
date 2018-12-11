const message = document.querySelector('.message');
const locationInput = document.querySelector('.location-input');
const myLocationBtn = document.querySelector('.my-location-btn');
const searchBtn = document.querySelector('.search-btn');

const apiKey = 'ae498ec7d2c12a488f23a06e510990ad'
const lines = 8;

// check if key === enter
const enterPressed = event => {
  if (event.key === 'Enter') {
    displayResultInput();
  }
}

const displayResultMyLocation = () => {
  if (!navigator.geolocation) {
    message.innerHTML = 'Geolocation is not supported by your browser';
    return;
  }

  const success = position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${apiKey}&cnt=${lines}`;
    fetchData(url);
  }

  const error = () => {
    message.innerHTML = 'Could not retrieve your location';
  }

  navigator.geolocation.getCurrentPosition(success, error);

  message.innerHTML = 'Fetching location...';

}

const displayResultInput = () => {
  const place = locationInput.value;
  // number of 3h forecasts. 8 * 3 = 24h
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&APPID=${apiKey}&cnt=${lines}`;
  console.log(place);
  fetchData(url);
}

const fetchData = url => {
  fetch(url).then(function (result) {
    return result.json();
  }).then(function (json) {
    console.log(json);
    let totalSnow = 0;
    if (json.message === 'city not found') {
      console.log('not found');
      message.innerHTML = 'Location not found';
      return;
    }
    json.list.forEach(element => {
      if (element.hasOwnProperty('snow')) {
        const volumeThreeHours = element.snow['3h'];
        if (volumeThreeHours !== undefined) {
          totalSnow += volumeThreeHours;
        }
      } else {
        console.log('no snow');
      }
    });
    console.log(totalSnow);
    message.innerHTML = `${json.city.name}, ${json.city.country}, ${totalSnow.toFixed(2)} mm`;
  })
}

// listen for key pressed while in search box
locationInput.addEventListener('keyup', enterPressed);
myLocationBtn.addEventListener('click', displayResultMyLocation);
searchBtn.addEventListener('click', displayResultInput)