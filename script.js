const apiKey = "7ccc44954f365068b972d414cc062eb7"

let cityNameElement = document.querySelector("#city-name")
let weatherTempElement = document.querySelector("#weather-temp")
let humidityElement = document.querySelector("#humidity")
let windElement = document.querySelector("#wind")
let weatherDescriptionElement = document.querySelector("#weather-description")

let backgroundElement = document.querySelector(".background-container")


//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const getWeatherData = async (city) => {
  
	const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  
	const response = await fetch(apiWeatherURL);
	const data = await response.json();

	return data;
  };

  
const changeIcon = async(city)=>{

	//let weatherDescription = "Thunderstorm"
	let weatherDescription = city.weather[0].main


	if(weatherDescription == "Clouds"){
		backgroundElement.style.backgroundColor = "rgb(228,228,228)";
	}
	else if(weatherDescription == "Clear"){
		backgroundElement.style.backgroundColor = "rgb(184,230,240)";
	}
	else if(weatherDescription == "Thunderstorm"){
		backgroundElement.style.backgroundColor = "rgb(109,109,109)";
	}

}


const showWeatherData = async (city)=>{
	let data = await getWeatherData(city)

	cityNameElement.textContent = data.name;
	weatherTempElement.textContent = Math.floor(data.main.temp);
	humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
	windElement.textContent = `Wind: ${data.wind.speed}km/h`;
	weatherDescriptionElement.textContent = (data.weather[0].description).charAt(0).toUpperCase() + (data.weather[0].description).slice(1);

	changeIcon(data)
}


showWeatherData("Moscow")