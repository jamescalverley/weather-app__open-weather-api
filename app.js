//! TODO 
// add dates (use moment.js)

//currentWeather("Toronto");
//fiveDayForecast("Toronto");

function currentWeather(searchCity){
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
        }
        
        console.log(currentData)
    
    } );

   

};

function fiveDayForecast(searchCity){
    console.log("[fiveDayForcast fn ]");

    let apiKey = "4e033b3f0bf4413196c595a89671e437";
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( ( response ) => {
        console.log("5 day forecast data >>", response)

        

    });

    
};

function handleClick(){
    console.log("getting weather data")
    currentWeather("Toronto");
    fiveDayForecast("Toronto");
};

const testBtn = document.getElementById('testBtn');

testBtn.addEventListener('click', handleClick );

