//! TODO 
//* COMPLETE pass all api data
// create list of searched cities
// disallow duplicates in search array
//* COMPLETE add UV index function
// add dates (use moment.js)
// add alert for search with no match

// research designs (dark and light theme)
// currentWeather("Toronto");
// fiveDayForecast("Toronto");

//const currentDisplay = document.getElementById('current-weather');

//require('dotenv').config();
//console.log("PROCESS.ENV", process.env )
//let apiKey = process.env.API_KEY

let searchCities = [];
let apiKey = "4e033b3f0bf4413196c595a89671e437";

async function currentWeather(searchCity){
   // console.log("[currentWeather fn ]");    
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;
    $.ajax({
        url: queryURL, 
        method: "GET"
    }).then( ( response ) => {
        //console.log("Current weather data >>", response )
        
        let currentData = {
            cityName: response.name, 
            description: response.weather[0].description,
            iconCode: response.weather[0].id,
            temp: Math.floor(response.main.temp - 273.15),
            feelsLike: Math.floor(response.main.feels_like - 273.15),
            humidity: response.main.humidity,
            windspeed: response.wind.speed, 
            pressure: response.main.pressure / 10,
            coordLAT: response.coord.lat, 
            coordLON: response.coord.lon    
        };
        let degree = String.fromCharCode(176);
        $("#cur-city-name-t").text(currentData.cityName);
        $("#cur-description-t").text(currentData.description);
        $("#cur-date-t").text(moment().format("dddd MMMM Do YYYY"));
        $("#current-icon").attr("src", selectIconCurrent(currentData.iconCode));

        $("#cur-temp-t").text(`${currentData.temp}${degree}C`);
        $("#cur-feelsLike-t").text(`${currentData.feelsLike}${degree}C`)
        $("#cur-humidity-t").text(`${currentData.humidity} %`);
        $("#cur-windspeed-t").text(`${currentData.windspeed} km/h`);
        $("#cur-pressure-t").text(`${currentData.pressure} kPa`)
        
        
        //console.log(currentData)
        saveCity( currentData.cityName );
        storeCities();
        getUVIndex(currentData.coordLAT, currentData.coordLON);
    } );
};

async function getUVIndex(coordLAT, coordLON){
    //console.log(` [getUVIndex] : LAT: ${coordLAT} LON: ${coordLON}`)
    let queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${coordLAT}&lon=${coordLON}`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( ( response) => {
        let uvIndex = response.value;
        $("#cur-uvIndexValue-t").text(`${uvIndex}`);
        // document.getElementById('uvIndexValue').innerText = uvIndex;
        // if(uvIndex <= 3){
        //     document.getElementById('uvIndexValue').className = "badge badge-success";
        // }if(uvIndex > 3 && uvIndex <= 7){
        //     document.getElementById('uvIndexValue').className = "badge badge-warning";
        // }if(uvIndex > 7){
        //     document.getElementById('uvIndexValue').className = "badge badge-danger";
        // }
    });
}

async function fiveDayForecast(searchCity){
   // console.log("[fiveDayForcast fn ]");
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( ( response ) => {
        //console.log("5 day forecast data >>", response)
    // create array of objects to hold all forecast data
    let forecastData = [
        {
            dateDay: moment(response.list[3].dt_txt).format("dddd"),
            dateFull: moment(response.list[3].dt_txt).format("MM/DD/YY"),
            icon: selectIconForecast(response.list[3].weather[0].id),
            description: response.list[3].weather[0].description,
            temp: Math.floor(response.list[3].main.temp - 273.15),
            humidity: response.list[3].main.humidity        
        },
        {
            dateDay: moment(response.list[11].dt_txt).format("dddd"),
            dateFull: moment(response.list[11].dt_txt).format("MM/DD/YY"),
            icon: selectIconForecast(response.list[11].weather[0].id),
            description: response.list[11].weather[0].description,
            temp: Math.floor(response.list[11].main.temp - 273.15),
            humidity: response.list[11].main.humidity        
        },
        {
            dateDay: moment(response.list[19].dt_txt).format("dddd"),
            dateFull: moment(response.list[19].dt_txt).format("MM/DD/YY"),
            icon: selectIconForecast(response.list[19].weather[0].id),
            description: response.list[19].weather[0].description,
            temp: Math.floor(response.list[19].main.temp - 273.15),
            humidity: response.list[19].main.humidity        
        },
        {
            dateDay: moment(response.list[27].dt_txt).format("dddd"),
            dateFull: moment(response.list[27].dt_txt).format("MM/DD/YY"),
            icon: selectIconForecast(response.list[27].weather[0].id),
            description: response.list[27].weather[0].description,
            temp: Math.floor(response.list[27].main.temp - 273.15),
            humidity: response.list[27].main.humidity        
        },
        {
            dateDay: moment(response.list[35].dt_txt).format("dddd"),
            dateFull: moment(response.list[35].dt_txt).format("MM/DD/YY"),
            icon: selectIconForecast(response.list[35].weather[0].id),
            description: response.list[35].weather[0].description,
            temp: Math.floor(response.list[35].main.temp - 273.15),
            humidity: response.list[35].main.humidity        
        }
    ]; 
    //console.log(forecastData)  
    let forecastDisplay = document.getElementById('forecast-weather-t');
    let degree = String.fromCharCode(176);
    forecastDisplay.innerHTML = "";

    forecastData.forEach( (forecastDay) => {
        forecastDisplay.innerHTML += `
        <div class="forecast-day-t">
            <div class="fore-date-day-t">${forecastDay.dateDay}</div>
            <div class="fore-date-full-t">${forecastDay.dateFull}</div>
            <div class="fore-icon-t">
            <img class="forecast-icon" src="${forecastDay.icon}" alt="forecast-weather-icon">
            </div>
            <div class="fore-description-t">${forecastDay.description}</div>
            <div class="fore-temp-t">Temp: ${forecastDay.temp}${degree}C</div>
            <div class="fore-humidity-t">Humidity: ${forecastDay.humidity} %</div>
        </div>`
    });
    });
};

// ASSIGNS WEATHER ICONS

function selectIconCurrent(code) {
    const filePath = "./Assets/current/";
    const icon = {
        brokenClouds: "broken-clouds-128.png", 
        clearSky: "clear-sky-128.png",
        fewClouds: "few-clouds-128.png",
        mist: "mist-128.png", 
        rain: "rain-128.png", 
        scatteredClouds: "scattered-clouds-128.png", 
        showerRain: "shower-rain-128.png", 
        snow: "snow-128.png", 
        thunderstorm: "thunderstorm-128.png"
    };
    if( code >= 200 && code <= 232) {
        //console.log("ICON == thunderstorm")
        return filePath + icon.thunderstorm
    } if( code >= 300 && code <= 321) {
        //console.log("ICON == shower-rain")
        return filePath + icon.showerRain
    } if( code >= 500  && code <= 531) {
        //console.log("ICON == rain")
        return filePath + icon.rain
    } if( code >= 600  && code <= 622) {
        //console.log("ICON == snow")
        return filePath + icon.snow
    } if( code >= 701  && code <= 781) {
        //console.log("ICON == mist")
        return filePath + icon.mist
    } if( code == 800 ) {
        //console.log("ICON == clear-sky")
        return filePath + icon.clearSky
    } if( code == 801 ) {
        //console.log("ICON == few-clouds")
        return filePath + icon.fewClouds
    } if( code == 802 ) {
        //console.log("ICON == scattered-clouds")
        return filePath + icon.scatteredClouds
    } if( code == 803 ) {
        //console.log("ICON == broken-clouds")
        return filePath + icon.brokenClouds
    } if( code == 804 ) {
        //console.log("ICON == broken-clouds (overcast)")
        return filePath + icon.brokenClouds
    } 
};

function selectIconForecast(code) {
    const filePath = "./Assets/forecast/";
    const icon = {
        brokenClouds: "broken-clouds-48.png", 
        clearSky: "clear-sky-48.png",
        fewClouds: "few-clouds-48.png",
        mist: "mist-48.png", 
        rain: "rain-48.png", 
        scatteredClouds: "scattered-clouds-48.png", 
        snow: "snow-48.png", 
        thunderstorm: "thunderstorm-48.png"
    };
    if( code >= 200 && code <= 232) {
       // console.log("ICON == thunderstorm")
        return filePath + icon.thunderstorm
    } if( code >= 300 && code <= 321) {
        //console.log("ICON == shower-rain")
        return filePath + icon.rain
    } if( code >= 500  && code <= 531) {
        //console.log("ICON == rain")
        return filePath + icon.rain
    } if( code >= 600  && code <= 622) {
        //console.log("ICON == snow")
        return filePath + icon.snow
    } if( code >= 701  && code <= 781) {
        //console.log("ICON == mist")
        return filePath + icon.mist
    } if( code == 800 ) {
       // console.log("ICON == clear-sky")
        return filePath + icon.clearSky
    } if( code == 801 ) {
        //console.log("ICON == few-clouds")
        return filePath + icon.fewClouds
    } if( code == 802 ) {
        //console.log("ICON == scattered-clouds")
        return filePath + icon.scatteredClouds
    } if( code == 803 ) {
        //console.log("ICON == broken-clouds")
        return filePath + icon.brokenClouds
    } if( code == 804 ) {
        //console.log("ICON == broken-clouds (overcast)")
        return filePath + icon.brokenClouds
    } 
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
    $('#searchField').val("");    
};

$("#searchBtn").on("click", handleClick);
document.addEventListener('keydown', (event) => {
    if( event.keyCode === 13 ) {
        handleClick();
    }
});

function handleRecentSearch(recentCity){
    //console.log("[handleRecentSearch fn ]");
    currentWeather(recentCity);
    fiveDayForecast(recentCity);
};

function saveCity( city ){
    //console.log("**** running saveCity() >> saving", city)
    if( searchCities.indexOf(city) !== -1 ){
        return 
    } else {
        if( searchCities.length < 6 ) {
            searchCities.unshift(city)
        } if( searchCities.length >= 6 ) {
            searchCities.pop()
            searchCities.unshift(city)
        };
        renderSearchedList();
        displayClearBtn();
    };  
    };

function storeCities(){
    localStorage.setItem("searchedCities:", JSON.stringify(searchCities));
};

function renderSearchedList(){
   // console.log("[renderSearchedList]")  
   document.getElementById('recent-search').innerHTML = " "; 
   searchCities.forEach( (searchCity) => {
        document.getElementById('recent-search').innerHTML += `
        <button class="btn btn-outline-secondary" onClick="handleRecentSearch('${searchCity}')" type="button">${searchCity}</button>
        `
    })
};

function clearSearches(){
    console.log("----clearing recent searches")
    searchCities = [];
    localStorage.clear();
    renderSearchedList();
    displayClearBtn();
};

$('#clear-search').on('click', clearSearches)

function displayClearBtn(){
    if( searchCities.length == 0 ) {
        document.getElementById('clear-search').style.display = "none";
    } if( searchCities.length > 0 ) {
        document.getElementById('clear-search').style.display = "inline-block";
    }
};

function init(){
    let storedCities = JSON.parse(localStorage.getItem("searchedCities:"));
    //document.getElementById('clear-search').style.display = "none";
    // console.log("getting from local storage >>>", storedCities )
    if( storedCities != null ) {
        searchCities = storedCities
    };
    // console.log("searchCities", searchCities)
    renderSearchedList();
    displayClearBtn();
};

// let themeSlider = document.getElementById("theme-slider");
// let testBox = document.getElementById("test-box");

// function themeSelect(){
//     if( themeSlider.checked ) {
//         console.log("slider CHECKED")
//         testBox.className = "test-dark"
//     } if( !themeSlider.checked) {
//         console.log("slider NOT CHECKED")
//         testBox.className = "test-light"
//     };
// };

// document.getElementById("theme-slider").addEventListener('change', themeSelect );
// themeSlider.addEventListener('change', themeSelect );

// for working on UI
function uiWork(){
    currentWeather("Toronto");
    fiveDayForecast("Toronto");
};

uiWork();
init();



