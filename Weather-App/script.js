const apiKey = "4cfb4f75432aa7e8f62d23985aa6bb27"

const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");

async function getWeather(cityName){

  const city =
    cityName || document.getElementById("cityInput").value;

  if(city === ""){
    alert("Please enter city name");
    return;
  }

  showLoading();

  const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try{

    const response = await fetch(url);
    const data = await response.json();

    if(data.cod == "404"){
      hideLoading();
      alert("City not found");
      return;
    }

    displayWeather(data);

  }

  catch(error){

    hideLoading();
    alert("Something went wrong");

  }

}

function displayWeather(data){

  document.getElementById("cityName").innerText =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("temperature").innerText =
    `${Math.round(data.main.temp)}°C`;

  document.getElementById("description").innerText =
    data.weather[0].description;

  document.getElementById("humidity").innerText =
    `${data.main.humidity}%`;

  document.getElementById("wind").innerText =
    `${data.wind.speed} km/h`;

  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  changeBackground(data.weather[0].main);

  hideLoading();

  weatherCard.style.display = "block";
}

function showLoading(){
  loading.style.display = "block";
  weatherCard.style.display = "none";
}

function hideLoading(){
  loading.style.display = "none";
}

function changeBackground(weather){

  if(weather === "Clear"){
    document.body.style.background =
      "linear-gradient(135deg,#f6d365,#fda085)";
  }

  else if(weather === "Clouds"){
    document.body.style.background =
      "linear-gradient(135deg,#bdc3c7,#2c3e50)";
  }

  else if(weather === "Rain"){
    document.body.style.background =
      "linear-gradient(135deg,#4b79a1,#283e51)";
  }

  else if(weather === "Snow"){
    document.body.style.background =
      "linear-gradient(135deg,#e6dada,#274046)";
  }

  else{
    document.body.style.background =
      "linear-gradient(135deg,#74ebd5,#ACB6E5)";
  }

}

function getLocationWeather(){

  if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(async position => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      showLoading();

      const url =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      try{

        const response = await fetch(url);
        const data = await response.json();

        displayWeather(data);

      }

      catch(error){

        hideLoading();
        alert("Location weather failed");

      }

    });

  }

  else{
    alert("Geolocation not supported");
  }

}