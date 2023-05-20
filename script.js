const apiKey = "40bb75794a32e2d8a6d3f2e70b3cb224" // API was deleted

let cityNameElement = document.querySelector("#city-name")
let weatherTempElement = document.querySelector("#weather-temp")
let humidityElement = document.querySelector("#humidity")
let windElement = document.querySelector("#wind")
let weatherDescriptionElement = document.querySelector("#weather-description")
let celsiusTermometerElement = document.querySelector(".celsius-termometer")
let backgroundElement = document.querySelector(".background-container")

let weatherIconElement = document.querySelector(".weather-icon")

let searchButtonElement = document.querySelector("#search-button")
let searchBarElement = document.querySelector("#search-bar")

let openModalButton = document.getElementById("openModal");
let modal = document.getElementById("myModal");
let closeButton = document.getElementsByClassName("close")[0];
let modalTitleElement = document.querySelector("#modal-title")
let modalDescriptionElement = document.querySelector("#modal-description")

const getWeatherData = async (city) => {
  
	const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;
  
	const response = await fetch(apiWeatherURL);
	const data = await response.json();

	return data;
  };

const changeElements = (cityName, weatherTemp, celsiusTerm, humidity, wind,
						weatherDescription,backgroundImg, backgroundColor)=>{
	cityNameElement.style.color = cityName;
	weatherTempElement.style.color = weatherTemp;
	celsiusTermometerElement.style.color = celsiusTerm;
	humidityElement.style.color = humidity;
	windElement.style.color = wind;
	weatherDescriptionElement.style.color = weatherDescription;
	backgroundElement.style.backgroundImage = backgroundImg;
	backgroundElement.style.backgroundColor = backgroundColor;
					
}
  
const changeIcon = async(city)=>{

	let weatherDescription = city.weather[0].main


	if(weatherDescription == "Clouds"){
		changeElements("black", "black", "black", "black", "black", "black", "none", "rgb(192,181,169)")
	}
	else if(weatherDescription == "Clear"){
		changeElements("black", "black", "black", "black", "black", "black", "none", "rgb(184,230,240)")
	}
	else if(weatherDescription == "Thunderstorm"  || weatherDescription == "Squall"){
		changeElements("white", "white", "white", "#70757a", "#70757a", "#70757a", "url(./style/src/thunderstorm-gif.gif", "none")
	}
	else if(weatherDescription == "Drizzle"){
		changeElements("white", "white", "white", "#70757a", "#70757a", "#70757a", "url(./style/src/drizzle-gif.gif", "none")
	}
	else if (weatherDescription == "Rain"){
		changeElements("white", "white", "white", "#70757a", "#70757a", "#70757a", "url(./style/src/rain-gif.gif", "none")
	}
	else if (weatherDescription == "Snow"){
		changeElements("black", "black", "black", "black", "black", "black", "url(./style/src/snow-gif.gif", "none")
	}
	else if (weatherDescription == "Tornado"){
		changeElements("black", "black", "black", "black", "black", "black", "url(./style/src/tornado-gif.gif", "none")
	}
	else if (weatherDescription == "Mist" || weatherDescription == "Smoke" || weatherDescription == "Haze" || weatherDescription == "Fog"){
		changeElements("black", "black", "black", "black", "black", "black", "url(./style/src/mist-gif.gif", "none")
	}
	else if (weatherDescription == "Dust" || weatherDescription == "Sand"){
		changeElements("black", "black", "black", "black", "black", "black","none", "rgb(234,162,091)")
	}
	else if (weatherDescription == "Ash"){
		changeElements("black", "black", "black", "black", "black", "black","url(./style/src/volcanic-ash-gif.gif)", "none")
	}

}


const showWeatherData = async (city)=>{
	let data = await getWeatherData(city)

	let kmPerSecWindSpeed = Math.floor((data.wind.speed * 3600) / 1000);

	cityNameElement.textContent = data.name;
	weatherTempElement.textContent = Math.floor(data.main.temp);
	humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
	windElement.textContent = `Wind: ${kmPerSecWindSpeed}km/h`;
	weatherDescriptionElement.textContent = (data.weather[0].description).charAt(0).toUpperCase() + (data.weather[0].description).slice(1);
	weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

	changeIcon(data)
}

const loadPage = ()=>{
	if (localStorage.getItem("lastCityResearched") != null){
		lastCityResearched = localStorage.getItem("lastCityResearched")
		showWeatherData(lastCityResearched)
	} else {
		showWeatherData("Lisbon")
	}
}

searchButtonElement.addEventListener("click", searchCityWeather)
searchBarElement.addEventListener("keydown", (event)=>{
	if (event.key == "Enter"){
		searchCityWeather();
	}
})

async function searchCityWeather() {
	let searchedContent = searchBarElement.value;
	try {
	  const response = await getWeatherData(searchedContent);
	  if (response.cod === "404"){
		throw new Error("Not Found");
	  } else if (response.cod === "400"){
		throw new Error("Bad Request")
	  }
	  else {
		showWeatherData(searchedContent);
		localStorage.setItem("lastCityResearched", searchedContent);  
	  }
	} catch (error) {
	  if (error instanceof Error && error.message === "Not Found") {
		modalTitleElement.textContent = "Oops!"
		modalDescriptionElement.textContent = "The requested city could not be found."
		modal.classList.add("show");
	  } else if (error instanceof Error && error.message === "Bad Request") {
		modalTitleElement.textContent = "Oops!"
		modalDescriptionElement.textContent = "What are you waiting for? Type something!"
		modal.classList.add("show");
	  }
	  else {
		modalTitleElement.textContent = "Oops!"
		modalDescriptionElement.textContent = "An unexpected error occurred..."
		modal.classList.add("show");
	  }
	  
	  // Stop the function execution
	  return;
	}
  }

closeButton.addEventListener("click", function() {
	modal.classList.remove("show");
});
  
window.addEventListener("click", function(event) {
	if (event.target === modal) {
		modal.classList.remove("show");
	}
});