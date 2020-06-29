//! TODO 
// add dates (use moment.js)

//currentWeather("Toronto");
//fiveDayForecast("Toronto");

async function currentWeather(searchCity){
    console.log("[currentWeather fn ]");

    let apiKey = "4e033b3f0bf4413196c595a89671e437";
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;

    $.ajax({
        url: queryURL, 
        method: "GET"
    }).then( ( response ) => {
        console.log("Current weather data >>", response )
        let currentData = {
            cityName: response.name, 
            description: response.weather[0].description,
            temp: response.main.temp,
            humidity: response.main.humidity,
            windspeed: response.wind.speed
        };
        
        console.log(currentData)
    
    } );
};

async function fiveDayForecast(searchCity){
    console.log("[fiveDayForcast fn ]");

    let apiKey = "4e033b3f0bf4413196c595a89671e437";
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( ( response ) => {
        console.log("5 day forecast data >>", response)

    // create array of objects to hold all forecast data

    let forecastData = [
        {
            date: response.list[3].dt_txt,
            icon: response.list[3].weather[0].icon,
            description: response.list[3].weather[0].description,
            temp: response.list[3].main.temp,
            humidity: response.list[3].main.humidity        
        },
        {
            date: response.list[11].dt_txt,
            icon: response.list[11].weather[0].icon,
            description: response.list[11].weather[0].description,
            temp: response.list[11].main.temp,
            humidity: response.list[11].main.humidity        
        },
        {
            date: response.list[19].dt_txt,
            icon: response.list[19].weather[0].icon,
            description: response.list[19].weather[0].description,
            temp: response.list[19].main.temp,
            humidity: response.list[19].main.humidity        
        },
        {
            date: response.list[27].dt_txt,
            icon: response.list[27].weather[0].icon,
            description: response.list[27].weather[0].description,
            temp: response.list[27].main.temp,
            humidity: response.list[27].main.humidity        
        },
        {
            date: response.list[35].dt_txt,
            icon: response.list[35].weather[0].icon,
            description: response.list[35].weather[0].description,
            temp: response.list[35].main.temp,
            humidity: response.list[35].main.humidity        
        }
    ]; 

    console.log(forecastData)    
    // add div to display each forecast day 
    // forEach object in array >> display a card in the above div    
    forecastData.forEach((day) => {
        console.log(day)
        console.log(day.date)
    })
    });
};

let searchBtn = document.getElementById('searchBtn');

function handleClick(){
    let searchValue = document.getElementById('searchField').value;
    console.log("search value:", searchValue)
    currentWeather(searchValue);
    fiveDayForecast(searchValue);
};

searchBtn.addEventListener('click', handleClick );

