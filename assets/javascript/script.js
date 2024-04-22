let searchBtn = document.querySelector("#searchBtn");
let searchElement = document.querySelector("#searchElement");
let historyElement = document.querySelector("#searchHistory");
let currentWeather = document.querySelector("#currentWeather");
let citynameEl = document.querySelector("#citynameEl");
let citytempEl = document.querySelector("#citytempEl");
let citywindEl = document.querySelector("#citywindEl");
let cityhumEl = document.querySelector("#cityhumEl");
let fivedaySection = document.querySelector("#fivedaySection");
let fivedayTitle = document.querySelector("#fivedayTitle");

// console.log(searchBtn);
// console.log(searchElement);

let cityHistory = JSON.parse(localStorage.getItem("cityHistory"));

if (cityHistory !== null) {
  console.log(cityHistory);
  displayHistory();
} else {
  cityHistory = [];
}

function displayHistory() {
  historyElement.innerHTML = "";
  for (let i = 0; i < cityHistory.length; i++) {
    let historyBtn = document.createElement("button");
    historyBtn.classList.add("m-2");
    historyBtn.textContent = cityHistory[i];
    historyElement.appendChild(historyBtn);
    historyBtn.addEventListener("click", function () {
      searchElement.value = historyBtn.textContent;
      getcityInfo();
    });
  }
}

function getcityInfo() {
  fivedaySection.innerHTML = "";
  let searchedCity = searchElement.value.trim();
  fivedaySection.classList.remove("is-hidden");
  fivedayTitle.classList.remove("is-hidden");
  currentWeather.classList.remove("is-hidden");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=e6e752195833b1e15bb3055c75163dfd&units=imperial`;

  console.log(url);
  if (searchedCity != "") {
    cityHistory.push(searchedCity);

    // console.log(cityHistory);

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
        // console.log(data);

        let cityName = data.name;

        citynameEl.textContent = cityName;

        let cityTemp = data.main.temp;

        citytempEl.textContent = `Temp: ${cityTemp}°F`;

        let cityHumidity = data.main.humidity;

        cityhumEl.textContent = `Humidity: ${cityHumidity} %`;

        let cityWind = data.wind.speed;

        citywindEl.textContent = `Wind: ${cityWind} MPH`;
        // console.log(cityName);
        // console.log(cityTemp);
        // console.log(cityHumidity);
        // console.log(citytempEl.textContent);
        let cityLat = data.coord.lat;

        // console.log(cityLat);

        let cityLong = data.coord.lon;

        // console.log(cityLong);

        let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLong}&appid=e6e752195833b1e15bb3055c75163dfd&units=imperial`;
        // console.log(forecastUrl);

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
        for (let i = 0; i < data.list.length; i++) {
          let hourCheck = data.list[i].dt_txt;

          if (hourCheck.includes("00:00:00")) {
            let dayDate = hourCheck.split(" ")[0];
            let dayTemp = data.list[i].main.temp;
            let dayWind = data.list[i].wind.speed;
            let dayHumidity = data.list[i].main.humidity;
            // console.log(dayDate);
            // console.log(dayTemp);
            // console.log(dayWind);
            // console.log(dayHumidity);
            let dayCard = document.createElement("div");

            dayCard.className =
              "card has-background-link-dark has-text-white m-2";

            let daycardDate = document.createElement("h1");

            daycardDate.textContent = dayDate;

            let daycardContent = document.createElement("div");

            daycardContent.className = "card-content";

            let daytempEl = document.createElement("p");

            daytempEl.textContent = `Temp: ${dayTemp}°F`;

            daycardContent.appendChild(daytempEl);

            let daywindEl = document.createElement("p");

            daywindEl.textContent = `Wind: ${dayWind}MPH`;

            daycardContent.appendChild(daywindEl);

            let dayhumidityEl = document.createElement("p");

            dayhumidityEl.textContent = `Humidity: ${dayHumidity}%`;

            daycardContent.appendChild(dayhumidityEl);

            daycardDate.appendChild(daycardContent);

            dayCard.appendChild(daycardDate);

            fivedaySection.appendChild(dayCard);
          }
        }
      });
  } else {
    console.log("error");
  }
}
searchBtn.addEventListener("click", function () {
  getcityInfo();
  displayHistory();
});
