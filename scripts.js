const message = document.querySelector('.message');
const locationInput = document.querySelector('.location-input');
const myLocationBtn = document.querySelector('.my-location-btn');

const apiKey = 'ae498ec7d2c12a488f23a06e510990ad'
const lines = 8;

// check if key === enter
const enterPressed = event => {
  if (event.key === 'Enter') {
    displayResultInput();
  }
}


const getMyLocation = () => {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latLon = [position.coords.latitude, position.coords.longitude];
    return latLon;
    // console.log(latLon);
  });
}

const loc = getMyLocation();
console.log(loc);

// let lat, lon;
// const loc = getMyLocation();
// console.log(loc);
// [lat, lon] = getMyLocation();
// console.log(lat, lon);



const displayResultMyLocation = () => {
  if (!navigator.geolocation) {
    message.innerHTML = 'Geolocation is not supported by your browser';
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${apiKey}&cnt=${lines}`;
  fetchData(url);
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
    message.innerHTML = `${json.city.name}, ${json.city.country}, ${totalSnow}`;
  })
}

// listen for key pressed while in search box
locationInput.addEventListener('keyup', enterPressed);
myLocationBtn.addEventListener('click', displayResultMyLocation);


// INFOS

// list.snow.3h Snow volume for last 3 hours

// TODO

// or user can choose any location and get forecast

// if snow > 10cm -> POWDAY
// else 
// show amount of snow
// or show NO SNOW

// add error message when location not found