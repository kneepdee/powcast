const apiKey = 'ae498ec7d2c12a488f23a06e510990ad'
const place = 'mayrhofen';

const url = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&APPID=${apiKey}&cnt=6`;

// fetch the json weather data
fetch(url).then(function (result) {
  return result.json();
}).then(function (json) {
  console.log(json);
  const three = '3h';
  let total = 0;
  // add any function you wanna run here
  // console.log(json.list[6].snow[three]);
  json.list.forEach(element => {
    console.log(element.snow[three]);
    const volumeThreeHours = element.snow[three];
    if (volumeThreeHours !== undefined) {
      total += volumeThreeHours;
    }
  });
  console.log(total);
});

const snowAmount = document.querySelector('p');
console.log(snowAmount);
snowAmount.innerHTML = 'pede';

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
