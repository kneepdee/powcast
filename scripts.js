const message = document.querySelector('.message');
const locationInput = document.querySelector('.location-input');

// check if key === enter
const enterPressed = event => {
  if (event.key === 'Enter') {
    displayResult();
  }
}

// listen for key pressed while in search box
locationInput.addEventListener('keyup', enterPressed);

const displayResult = () => {
  const apiKey = 'ae498ec7d2c12a488f23a06e510990ad'
  const place = locationInput.value;
  // number of 3h forecasts. 8 * 3 = 24h
  const lines = 8;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&APPID=${apiKey}&cnt=${lines}`;
  console.log(place);
  fetch(url).then(function (result) {
    return result.json();
  }).then(function (json) {
    console.log(json);
    let total = 0;
    json.list.forEach(element => {
      if (element.hasOwnProperty('snow')) {
        const volumeThreeHours = element.snow['3h'];
        if (volumeThreeHours !== undefined) {
          total += volumeThreeHours;
        }
      } else {
        console.log('no snow');
      }
    });
    console.log(total);
    message.innerHTML = `${json.city.name}, ${json.city.country}, ${total}`;
  });
}


// fetch the json weather data

// fetch(url).then(function (result) {
//   return result.json();
// }).then(function (json) {
//   console.log(json);
//   let total = 0;
//   // add any function you wanna run here
//   json.list.forEach(element => {
//     const volumeThreeHours = element.snow['3h'];
//     if (volumeThreeHours !== undefined) {
//       total += volumeThreeHours;
//     }
//   });
//   console.log(total);
// });


// INFOS

// list.snow.3h Snow volume for last 3 hours

// TODO

// get snowfall amount for next 24h

// user can choose his location and get forecast
// or user can choose any location and get forecast

// shows amount of snow in cm

// if snow > 10cm -> POWDAY
// else 
// show amount of snow
// or show NO SNOW