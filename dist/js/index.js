// API 03
const topNewsStories = document.querySelector(".api-02");
const weather = document.querySelector(".api-03");
const date = document.querySelector(".currentDate");
const clock = document.querySelector(".animatedClock");
setInterval(displayClock, 500);

function theCurrentday() {
  let d = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  date.innerHTML =
    days[d.getDay()] +
    " " +
    months[d.getMonth()] +
    " " +
    d.getDate() +
    ", " +
    d.getFullYear();
}
function clockIn() {
  let d = new Date();
  let t = d.toLocaleTimeString();
  alert("You've Clocked In at: " + t);
}

function clockOut() {
  let d = new Date();
  let t = d.toLocaleTimeString();
  alert("You've Clocked Out at: " + t);
}

function displayClock() {
  let time = new Date();
  let hrs = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let en = "AM";

  if (hrs > 12) {
    en = "PM";
  }
  if (hrs > 12) {
    hrs = hrs - 12;
  }

  if (hrs == 0) {
    hrs = 12;
  }
  if (hrs < 10) {
    hrs = "0" + hrs;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  clock.innerHTML = hrs + ":" + min + ":" + sec + " " + en;
}

function newsHeadlinesData() {
  const url = `
    https://newsapi.org/v2/top-headlines?country=us&apiKey=4022ff600d7e43d097033fddc678d0c9`;
  fetch(url)
    .then(res => res.json())
    .then(topHeadlines => {
      renderHeadlines(topHeadlines);
    })
    .catch(err => console.log(err));
}

function renderHeadlines(topHeadlines) {
  topNewsStories.innerHTML = topHeadlines.articles
    .map(newsStory => {
      return `<div class="accordian">
        <div class="header"><a href="${newsStory.url}">${
        newsStory.title
      }</a></div>
        <section id="movie">
        <div><span class="header">Story: </span>${newsStory.description}</div>
        
        </section>
    </div>
    <hr>
    `;
    })
    .join("");
}

function currentWeatherData() {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?zip=34953,us&appid=4817b8a1df35479309ffcdb8959d4f8e"
  )
    .then(res => res.json())
    .then(data => {
      renderCurrentWeatherDisplay(data);
    })
    .catch(err => console.log(err));
}

function renderCurrentWeatherDisplay(data) {
  const currentWeather = `
    <div class="">
        <h2>Current Weather</h2>
      </div>
      <h3>${data.name}</h3>
      <p>${data.weather.description}</p>
      <img src="${data.weather.icon}" alt="">
      <p>Temperature: ${data.main.temp}</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  weather.innerHTML = currentWeather;
}

newsHeadlinesData();
currentWeatherData();
theCurrentday();
