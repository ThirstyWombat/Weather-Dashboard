// a function "event listener" for when the button is clicked, capture the input in the text field
// a function for if the text input is not null, add the variable containing the input to the api string in the city name position
// this function also fetches the api with the new concated text input if it's not null, it then runs a function dedicated to displaying what it's found
//run this function in the event listener
// create an empty array which is filled with searchCity's from localstorage on page load. if array != null {loop the creation of buttons for each index in the array}

// let url =
//   "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=e6e752195833b1e15bb3055c75163dfd";
// let testURL =
//   "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=e6e752195833b1e15bb3055c75163dfd";
let testURL =
  "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e6e752195833b1e15bb3055c75163dfd";
let searchBtn = document.querySelector("#searchBtn");
let searchElement = document.querySelector("#searchElement");
let historyElement = document.querySelector("#searchHistory");

console.log(searchBtn);
console.log(searchElement);

let cityHistory = JSON.parse(localStorage.getItem("cityHistory"));

if (cityHistory !== null) {
  console.log(cityHistory);
  displayHistory();
} else {
  cityHistory = [];
}

function displayHistory() {
  for (let i = 0; i < cityHistory.length; i++) {
    let historyBtn = document.createElement("button");
    historyBtn.textContent = cityHistory[i];
    historyElement.appendChild(historyBtn);
    historyBtn.addEventListener("click", function () {
      searchElement.value = historyBtn.textContent;
      getcityInfo();
    });
  }
}

function getcityInfo() {
  let searchedCity = searchElement.value.trim();

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=e6e752195833b1e15bb3055c75163dfd&units=imperial`;
  console.log(searchedCity);
  console.log(url);
  if (searchedCity != "") {
    cityHistory.push(searchedCity);

    console.log(cityHistory);

    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));

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
