const apiKey = "7ccc44954f365068b972d414cc062eb7"

let cityNameElement = document.querySelector("#city-name")
let weatherTempElement = document.querySelector("#weather-temp")
let humidityElement = document.querySelector("#humidity")
let windElement = document.querySelector("#wind")
let weatherDescriptionElement = document.querySelector("#weather-description")
let celsiusTermometerElement = document.querySelector(".celsius-termometer")
let backgroundElement = document.querySelector(".background-container")

let weatherIconElement = document.querySelector(".weather-icon")


//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const getWeatherData = async (city) => {
  
	const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  
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

	cityNameElement.textContent = data.name;
	weatherTempElement.textContent = Math.floor(data.main.temp);
	humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
	windElement.textContent = `Wind: ${data.wind.speed}km/h`;
	weatherDescriptionElement.textContent = (data.weather[0].description).charAt(0).toUpperCase() + (data.weather[0].description).slice(1);
	weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);


	changeIcon(data)
}


showWeatherData("Kiowa")