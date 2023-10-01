// a function "event listener" for when the button is clicked, capture the input in the text field
// a function for if the text input is not null, add the variable containing the input to the api string in the city name position
// this function also fetches the api with the new concated text input if it's not null, it then runs a function dedicated to displaying what it's found
//run this function in the event listener

// let url =
//   "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=e6e752195833b1e15bb3055c75163dfd";
// let testURL =
//   "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=e6e752195833b1e15bb3055c75163dfd";
let testURL =
  "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e6e752195833b1e15bb3055c75163dfd";
let searchBtn = document.querySelector("#searchBtn");
let searchElement = document.querySelector("#searchElement");
console.log(searchBtn);
console.log(searchElement);

function getcityInfo() {
  let searchedCity = searchElement.value.trim();
  //   let url =
  //     "http://api.openweathermap.org/geo/1.0/direct?q=" +
  //     searchedCity +
  //     "&limit=5&appid=e6e752195833b1e15bb3055c75163dfd";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=e6e752195833b1e15bb3055c75163dfd&units=imperial`;
  console.log(searchedCity);
  console.log(url);
  if (searchedCity != "") {
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function (data) {
        console.log(data);
        let cityLat = data.coord.lat;
        console.log(cityLat);

        let cityLong = data.coord.lon;
        console.log(cityLong);
        let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLong}&appid=e6e752195833b1e15bb3055c75163dfd&units=imperial`;
        console.log(forecastUrl);
        return fetch(forecastUrl);
      })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function (data) {
        console.log(data);
      });
  } else {
    console.log("error");
  }
}
searchBtn.addEventListener("click", getcityInfo);
// let searchInput = searchElement.value.trim();
// response.json().then(function (data) {
//   console.log(data);
//   let cityLat = data[0].lat;
//   let cityLong = data[0].lon;
//   let forecastUrl = "api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLong + "&appid=e6e752195833b1e15bb3055c75163dfd";

// });
