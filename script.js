var weatherChart;
function getWeatherData(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2c57365225eb7cf1835f9b833f23d56`
  )
    .then((response) => response.json())
    .then((data) => {
      const icon =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
      document.getElementById("title").innerText = city;
      document.getElementById("pic").src = icon;
      const temperature = parseFloat(data.main.temp - 273.15).toFixed(1);
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      document.getElementById("feel").innerText =
        parseFloat(data.main.feels_like - 273.15).toFixed(1) + "℃";
      document.getElementById("humid").innerText = humidity + "%";
      document.getElementById("temp").innerText = temperature + "℃";

      const ctx = document.getElementById("myChart").getContext("2d");
      weatherChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Temperature", "Humidity", "Pressure"],
          datasets: [
            {
              label: "Weather Data",
              data: [temperature, humidity, pressure],
              backgroundColor: ["red", "blue", "gray"],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => console.error(error));
}
function getLocation() {
  weatherChart.destroy();
  if (document.getElementById("city").value !== " ")
    getWeatherData(document.getElementById("city").value);
}
getWeatherData("Delhi");
