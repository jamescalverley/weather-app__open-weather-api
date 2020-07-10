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
    console.log("[currentWeather fn ]");    
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
            windspeed: response.wind.speed, 
            coordLAT: response.coord.lat, 
            coordLON: response.coord.lon
        };
        let degree = String.fromCharCode(176);
        $("#cur-city-name-t").text(currentData.cityName);
        $("#cur-description-t").text(currentData.description);
        $("#cur-date-t").text(moment().format("dddd MMMM Do YYYY"))
        $("#cur-temp-t").text(`Temperature: ${currentData.temp}${degree}C`);
        $("#cur-humidity-t").text(`Humidity: ${currentData.humidity} %`);
        $("#cur-windspeed-t").text(`Windspeed: ${currentData.windspeed} km/h`);
        
        console.log(currentData)
        saveCity( currentData.cityName );
        storeCities();
        getUVIndex(currentData.coordLAT, currentData.coordLON);
    } );
};

async function getUVIndex(coordLAT, coordLON){
    console.log(` [getUVIndex] : LAT: ${coordLAT} LON: ${coordLON}`)
    let queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${coordLAT}&lon=${coordLON}`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( ( response) => {
        let uvIndex = response.value;
        $("#cur-uvIndexValue-t").text(`UV: ${uvIndex}`);
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
    console.log("[fiveDayForcast fn ]");
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( ( response ) => {
        console.log("5 day forecast data >>", response)
    // create array of objects to hold all forecast data
    let forecastData = [
        {
            dateDay: moment(response.list[3].dt_txt).format("dddd"),
            dateFull: moment(response.list[3].dt_txt).format("MM/DD/YY"),
            icon: response.list[3].weather[0].icon,
            description: response.list[3].weather[0].description,
            temp: Math.floor(response.list[3].main.temp - 273.15),
            humidity: response.list[3].main.humidity        
        },
        {
            dateDay: moment(response.list[11].dt_txt).format("dddd"),
            dateFull: moment(response.list[11].dt_txt).format("MM/DD/YY"),
            icon: response.list[11].weather[0].icon,
            description: response.list[11].weather[0].description,
            temp: Math.floor(response.list[11].main.temp - 273.15),
            humidity: response.list[11].main.humidity        
        },
        {
            dateDay: moment(response.list[19].dt_txt).format("dddd"),
            dateFull: moment(response.list[19].dt_txt).format("MM/DD/YY"),
            icon: response.list[19].weather[0].icon,
            description: response.list[19].weather[0].description,
            temp: Math.floor(response.list[19].main.temp - 273.15),
            humidity: response.list[19].main.humidity        
        },
        {
            dateDay: moment(response.list[27].dt_txt).format("dddd"),
            dateFull: moment(response.list[27].dt_txt).format("MM/DD/YY"),
            icon: response.list[27].weather[0].icon,
            description: response.list[27].weather[0].description,
            temp: Math.floor(response.list[27].main.temp - 273.15),
            humidity: response.list[27].main.humidity        
        },
        {
            dateDay: moment(response.list[35].dt_txt).format("dddd"),
            dateFull: moment(response.list[35].dt_txt).format("MM/DD/YY"),
            icon: response.list[35].weather[0].icon,
            description: response.list[35].weather[0].description,
            temp: Math.floor(response.list[35].main.temp - 273.15),
            humidity: response.list[35].main.humidity        
        }
    ]; 
    console.log(forecastData)  
    let forecastDisplay = document.getElementById('forecast-weather-t');
    let degree = String.fromCharCode(176);
    forecastDisplay.innerHTML = "";

    forecastData.forEach( (forecastDay) => {
        forecastDisplay.innerHTML += `
        <div class="forecast-day-t">
            <div class="fore-date-day-t">${forecastDay.dateDay}</div>
            <div class="fore-date-full-t">${forecastDay.dateFull}</div>
            <div class="fore-icon-t">ICON</div>
            <div class="fore-description-t">${forecastDay.description}</div>
            <div class="fore-temp-t">Temp: ${forecastDay.temp}${degree}C</div>
            <div class="fore-humidity-t">Humidity: ${forecastDay.humidity} %</div>
        </div>`
    });
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
    $('#searchField').val("");    
};

$("#searchBtn").on("click", handleClick);
document.addEventListener('keydown', (event) => {
    if( event.keyCode === 13 ) {
        handleClick();
    }
});

function handleRecentSearch(recentCity){
    console.log("[handleRecentSearch fn ]");
    currentWeather(recentCity);
    fiveDayForecast(recentCity);
};

function saveCity( city ){
    console.log("**** running saveCity() >> saving", city)

    if( searchCities.indexOf(city) !== -1 ){
        console.log("city already exists")
        return 
    } else {
        if( searchCities.length < 7 ) {
            searchCities.unshift(city)
        } if( searchCities.length >= 7 ) {
            searchCities.pop()
            searchCities.unshift(city)
        };
        console.log("saved cities: ", searchCities )
        renderSearchedList();
    };  
    };

function storeCities(){
    localStorage.setItem("searchedCities:", JSON.stringify(searchCities));
};

function renderSearchedList(){
    console.log("[renderSearchedList]")  
    document.getElementById('recent-search').innerHTML = "Recent cities:"
    searchCities.forEach( (searchCity) => {
        document.getElementById('recent-search').innerHTML += `
        <button class="btn btn-sm btn-outline-secondary" onClick="handleRecentSearch('${searchCity}')" type="button">${searchCity}</button>
        `
    })
};

function clearSearches(){
    console.log("----clearing recent searches")
    searchCities = [];
    localStorage.clear();
    renderSearchedList();
};

$('#clear-search').on('click', clearSearches)

function init(){
    let storedCities = JSON.parse(localStorage.getItem("searchedCities:"));
    console.log("getting from local storage >>>", storedCities )
    if( storedCities != null ) {
        searchCities = storedCities
    };
    console.log("searchCities", searchCities)
    renderSearchedList();
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



