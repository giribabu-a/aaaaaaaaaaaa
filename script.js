const apiKey = "9e61937f98c2ae7d4e7c158c0efc3957";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherImage = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // invalid city name
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    // valid city name
    else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === 'Clear') {
            weatherImage.src = "./images/clear.png";
        }
        else if (data.weather[0].main === 'Clouds') {
            weatherImage.src = "./images/clouds.png";
        }
        else if (data.weather[0].main === 'Rain') {
            weatherImage.src = "./images/rain.png";
        }
        else if (data.weather[0].main === 'Drizzle') {
            weatherImage.src = "./images/drizzle.png";
        }
        else if (data.weather[0].main === 'Mist') {
            weatherImage.src = "./images/mist.png";
        }

        document.querySelector(".weather").style.display = 'block';
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})