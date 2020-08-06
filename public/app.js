
let searchCities = [];
let apiKey = "4e033b3f0bf4413196c595a89671e437";

async function currentWeather(searchCity){
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;
    $.ajax({
        url: queryURL, 
        method: "GET"
    }).then( ( response ) => {
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
        $("#cur-city-name-t").text(currentData.cityName);
        $("#cur-description-t").text(currentData.description);
        $("#cur-date-t").text(moment().format("dddd MMMM Do YYYY"));
        $("#current-icon").attr("src", selectIconCurrent(currentData.iconCode));
        $("#cur-temp-t").html(`${currentData.temp}<span class="metric-unit-lg"> &degC</span>`);
        $("#cur-feelsLike-t").html(`${currentData.feelsLike}<span class="metric-unit-lg"> &degC</span>`);
        $("#cur-humidity-t").html(`${currentData.humidity}<span class="metric-unit-lg"> %</span>`);
        $("#cur-windspeed-t").html(`${currentData.windspeed}<span class="metric-unit-sm"> km/h</span>`);
        $("#cur-pressure-t").html(`${currentData.pressure}<span class="metric-unit-sm"> kpa</span>`);
        saveCity( currentData.cityName );
        storeCities();
        getUVIndex(currentData.coordLAT, currentData.coordLON);
    } );
};

async function getUVIndex(coordLAT, coordLON){
    let queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${coordLAT}&lon=${coordLON}`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( ( response) => {
        let uvIndex = response.value;
        $("#cur-uvIndexValue-t").text(`${uvIndex}`);
    });
};

async function fiveDayForecast(searchCity){
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( ( response ) => {
    let forecastData = [
        {
            dateDay: moment(response.list[3].dt_txt).format("dddd"),
            dateFull: moment(response.list[3].dt_txt).format("MM/DD/YY"),
            icon: selectIconForecast(response.list[3].weather[0].id),
            description: response.list[3].weather[0].description,
            temp: Math.floor(response.list[3].main.temp - 273.15),
            feelsLike: Math.floor(response.list[3].main.feels_like - 273.15),
            humidity: response.list[3].main.humidity        
        },
        {
            dateDay: moment(response.list[11].dt_txt).format("dddd"),
            dateFull: moment(response.list[11].dt_txt).format("MM/DD/YY"),
            icon: selectIconForecast(response.list[11].weather[0].id),
            description: response.list[11].weather[0].description,
            temp: Math.floor(response.list[11].main.temp - 273.15),
            feelsLike: Math.floor(response.list[11].main.feels_like - 273.15),
            humidity: response.list[11].main.humidity        
        },
        {
            dateDay: moment(response.list[19].dt_txt).format("dddd"),
            dateFull: moment(response.list[19].dt_txt).format("MM/DD/YY"),
            icon: selectIconForecast(response.list[19].weather[0].id),
            description: response.list[19].weather[0].description,
            temp: Math.floor(response.list[19].main.temp - 273.15),
            feelsLike: Math.floor(response.list[19].main.feels_like - 273.15),
            humidity: response.list[19].main.humidity        
        },
        {
            dateDay: moment(response.list[27].dt_txt).format("dddd"),
            dateFull: moment(response.list[27].dt_txt).format("MM/DD/YY"),
            icon: selectIconForecast(response.list[27].weather[0].id),
            description: response.list[27].weather[0].description,
            temp: Math.floor(response.list[27].main.temp - 273.15),
            feelsLike: Math.floor(response.list[27].main.feels_like - 273.15),
            humidity: response.list[27].main.humidity        
        },
        {
            dateDay: moment(response.list[35].dt_txt).format("dddd"),
            dateFull: moment(response.list[35].dt_txt).format("MM/DD/YY"),
            icon: selectIconForecast(response.list[35].weather[0].id),
            description: response.list[35].weather[0].description,
            temp: Math.floor(response.list[35].main.temp - 273.15),
            feelsLike: Math.floor(response.list[35].main.feels_like - 273.15),
            humidity: response.list[35].main.humidity        
        }
    ]; 
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
            <div class="fore-temp-t">${forecastDay.temp}${degree}C / ${forecastDay.feelsLike}${degree}C</div>
            <div class="fore-temp-desc-t">Temp. / feels like</div>
        </div>`
    });
    });
};

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
        return filePath + icon.thunderstorm
    } if( code >= 300 && code <= 321) {
        return filePath + icon.showerRain
    } if( code >= 500  && code <= 531) {
        return filePath + icon.rain
    } if( code >= 600  && code <= 622) {
        return filePath + icon.snow
    } if( code >= 701  && code <= 781) {
        return filePath + icon.mist
    } if( code == 800 ) {
        return filePath + icon.clearSky
    } if( code == 801 ) {
        return filePath + icon.fewClouds
    } if( code == 802 ) {
        return filePath + icon.scatteredClouds
    } if( code == 803 ) {
        return filePath + icon.brokenClouds
    } if( code == 804 ) {
        return filePath + icon.brokenClouds
    }; 
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
        return filePath + icon.thunderstorm
    } if( code >= 300 && code <= 321) {
        return filePath + icon.rain
    } if( code >= 500  && code <= 531) {
        return filePath + icon.rain
    } if( code >= 600  && code <= 622) {
        return filePath + icon.snow
    } if( code >= 701  && code <= 781) {
        return filePath + icon.mist
    } if( code == 800 ) {
        return filePath + icon.clearSky
    } if( code == 801 ) {
        return filePath + icon.fewClouds
    } if( code == 802 ) {
        return filePath + icon.scatteredClouds
    } if( code == 803 ) {
        return filePath + icon.brokenClouds
    } if( code == 804 ) {
        return filePath + icon.brokenClouds
    }; 
};

function handleClick(ev){
    let searchValue = $('#searchField').val();
    if( !searchValue ) {
        console.log("no search value!")
        //! add alert !!! 
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
        $('#searchField').val(""); 
    };
});

function handleRecentSearch(recentCity){
    currentWeather(recentCity);
    fiveDayForecast(recentCity);
};

function saveCity( city ){
    if( searchCities.indexOf(city) !== -1 ){
        return 
    } else {
        if( searchCities.length < 5 ) {
            searchCities.unshift(city)
        } if( searchCities.length >= 5 ) {
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
   document.getElementById('recent-search').innerHTML = " "; 
   searchCities.forEach( (searchCity) => {
        document.getElementById('recent-search').innerHTML += `
        <button class="btn btn-outline-secondary recent-btn" onClick="handleRecentSearch('${searchCity}')" type="button">${searchCity}</button>`
    });
};

function clearSearches(){
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

function hideNav(){
    let maxWidth = document.body.clientWidth;
    if( maxWidth > 970 ){
        $(".nav-burger").css("display", "none");
        $(".collapse").addClass("active").removeClass("collapse");
    } if(maxWidth < 970 && maxWidth > 768 ) {
        $(".recent-btn").addClass("btn-sm");
    } else if( maxWidth < 768 ){
        $(".active").addClass("collapse").removeClass("active");
        $(".nav-burger").css("display", "block");
        $(".recent-btn").addClass("btn-sm");
    };
};

window.addEventListener('resize', hideNav);

function themeSelect(toggle){
    switch (toggle) {
        case "dark" : 
            $(".light").addClass("dark").removeClass("light");
            $(".bg-light").addClass("bg-dark").removeClass("bg-light");
            break;
        case "light" : 
            $(".dark").addClass("light").removeClass("dark");
            $(".bg-dark").addClass("bg-light").removeClass("bg-dark");
            break;
    };
    localStorage.setItem("theme", toggle);
};

$("#darkToggle").on('click', () => {
    themeSelect("dark");
});
$("#lightToggle").on('click', () => {
    themeSelect("light") 
});

function initTheme(){
    let savedTheme = localStorage.getItem("theme");
    if(savedTheme) {
        themeSelect(savedTheme);
    } else {
        themeSelect("light");
    };
};

function init(){
    let storedCities = JSON.parse(localStorage.getItem("searchedCities:"));
    if( storedCities != null ) {
        searchCities = storedCities
    };
    hideNav();
    renderSearchedList();
    displayClearBtn();
    initTheme();
};

// for working on UI
function uiWork(){
    const search = "Toronto";
    currentWeather(search);
    fiveDayForecast(search);
};

uiWork();
init();



