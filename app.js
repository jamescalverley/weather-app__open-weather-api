//! TODO 
// pass all api data
// create list of searched cities
// add UV index function
// add dates (use moment.js)

// research designs (dark and light theme)
//currentWeather("Toronto");
//fiveDayForecast("Toronto");

//const currentDisplay = document.getElementById('current-weather');



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
            temp: Math.floor(response.main.temp - 273.15),
            humidity: response.main.humidity,
            windspeed: response.wind.speed
        };
        $("#cur-city-name-t").text(currentData.cityName);
        $("#cur-description-t").text(currentData.description);
        $("#cur-temp-t").text(currentData.temp);
        $("#cur-humidity-t").text(currentData.humidity);
        $("#cur-windspeed-t").text(currentData.windspeed);
        
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
            temp: Math.floor(response.list[3].main.temp - 273.15),
            humidity: response.list[3].main.humidity        
        },
        {
            date: response.list[11].dt_txt,
            icon: response.list[11].weather[0].icon,
            description: response.list[11].weather[0].description,
            temp: Math.floor(response.list[11].main.temp - 273.15),
            humidity: response.list[11].main.humidity        
        },
        {
            date: response.list[19].dt_txt,
            icon: response.list[19].weather[0].icon,
            description: response.list[19].weather[0].description,
            temp: Math.floor(response.list[19].main.temp - 273.15),
            humidity: response.list[19].main.humidity        
        },
        {
            date: response.list[27].dt_txt,
            icon: response.list[27].weather[0].icon,
            description: response.list[27].weather[0].description,
            temp: Math.floor(response.list[27].main.temp - 273.15),
            humidity: response.list[27].main.humidity        
        },
        {
            date: response.list[35].dt_txt,
            icon: response.list[35].weather[0].icon,
            description: response.list[35].weather[0].description,
            temp: Math.floor(response.list[35].main.temp - 273.15),
            humidity: response.list[35].main.humidity        
        }
    ]; 
    console.log(forecastData)  
    console.log("array length:", forecastData.length)  
    // for( i = 0; i < forecastData.length; i++) {
    //     console.log("running ")
    //     $(".fore-date-t").text(forecastData[i].date);
    //     $(".fore-description-t").text(forecastData[i].description);
    // }
  
    forecastData.forEach( (forecastDay) => {
        
        document.getElementById('forecast-weather-t').innerHTML += `
        <div class="forecast-day-t">
            <div class="fore-date-t">${forecastDay.date}</div>
            <div class="fore-icon-t">${forecastDay.icon}</div>
            <div class="fore-description-t">${forecastDay.description}</div>
            <div class="fore-temp-t">${forecastDay.temp}</div>
            <div class="fore-humidity-t">${forecastDay.humidity}</div>
        </div>`
       
        

    })

    });
};

function handleClick(){
    let searchValue = $('#searchField').val();
    if( !searchValue ) {
        console.log("no search value!")
        return 
    } else {
        console.log("search value:", searchValue)
        currentWeather(searchValue);
        fiveDayForecast(searchValue);
    }
};

$("#searchBtn").on("click", handleClick);
