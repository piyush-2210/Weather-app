let isCelsius = true;
let currentTemp = null;

const apiKey = "YOUR_API_KEY";

function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const resultDiv = document.getElementById("weatherResult");

  const city = cityInput.value.trim();


  if (city.length < 2) {
    resultDiv.innerHTML = "<p>Please enter a valid city name.</p>";
    return;
  }

  const encodedCity = encodeURIComponent(city);

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`;

  resultDiv.innerHTML = "<p>Loading...</p>";

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
        currentTemp = data.main.temp;

        resultDiv.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p id="temp">🌡️ Temperature: ${currentTemp}°C</p>
            <p>🌥️ Condition: ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
        `;

    })
    .catch(error => {
      resultDiv.innerHTML = "<p>City not found. Try again.</p>";
    });
}

const toggleBtn = document.getElementById("unitToggle");

toggleBtn.addEventListener("click", () => {
  if (currentTemp === null) return;

  const tempElement = document.getElementById("temp");

  if (isCelsius) {
    const fahrenheit = (currentTemp * 9/5 + 32).toFixed(1);
    tempElement.innerHTML = `🌡️ Temperature: ${fahrenheit}°F`;
    toggleBtn.textContent = "°C";
  } else {
    tempElement.innerHTML = `🌡️ Temperature: ${currentTemp}°C`;
    toggleBtn.textContent = "°F";
  }

  isCelsius = !isCelsius;
});

const cityInput = document.getElementById("cityInput");

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather();
  }
});
