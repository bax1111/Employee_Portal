// API 03
const topNewsStories = document.querySelector(".api-02");
const bitcoin = document.querySelector(".api-03");
const clock = document.querySelector(".animatedClock");
setInterval(displayClock, 500);
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
  const url =
    "https://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=4022ff600d7e43d097033fddc678d0c9";
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

function bitcoinPrice() {
  fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then(res => res.json())
    .then(data => {
      renderBitcoinDisplay(data);
    })
    .catch(err => console.log(err));
}

function renderBitcoinDisplay(data) {
  const price = `
    <div class="">
        <h3>Current Bitcoin Price</h3>
      </div>
      <p>Description: ${data.chartName}</p>
      <p>Price in ${data.bpi.USD.code}: ${data.bpi.USD.symbol}${
    data.bpi.USD.rate_float
  }
    `;
  bitcoin.innerHTML = price;
}

newsHeadlinesData();
bitcoinPrice();
