

getWeatherData("Toronto")

async function getWeatherData(searchCity){
    console.log("[getWeatherData fn ]")

    let apiKey = "4e033b3f0bf4413196c595a89671e437";
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;

    let response = await fetch(queryURL);
    let weatherData = response.json();
    
    console.log("API DATA", weatherData)
};

function currentWeather(){
    console.log("[currentWeather fn ] ")
};

function fiveDayForecast(){
    console.log("[fiveDayForcast fn ]")
};