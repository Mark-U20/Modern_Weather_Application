//moment.js to get the current date




var currentWeatherBox = document.getElementsByClassName("current-weather-box")[0];
var forecastRow = document.getElementById("forecast-row");
var currentCity = document.getElementById("current-city");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentUv = document.getElementById("current-uv");
var currentHumidity = document.getElementById("current-humidity");
var searchBar = document.getElementById("search-bar");
//fetches weather data from the OpenWeather API and returns data to be used in the createForecast function
var apiKey = "ed888dba6518e5d289bd7fdcdf8345ee";
var globalCity;
var dayArray = [];
var searchHistory = [];
var localSearchData = JSON.parse(localStorage.getItem("searchData"));
console.log("local search data: " + localSearchData);
//need function to get weather data from the OpenWeather api and put it into an array
async function getWeatherData(lat, lon) {
    var test;

    //coords of minneapolis
    // var lat = 44.9778;
    // console.log(lat);
    // var lon = 93.2667;
    // console.log(lon);
    var temp;
    var humidity;
    var wind;
    var uv;
    var date;
    var weatherData;


    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=" + apiKey;
    // console.log(url);










    fetch(url)
        .then((response) => {
            // console.log(response);
            response = response.json();
            // console.log(response);

            return response;

        })
        .then((data) => {
            //data is [object Object] because
            // console.log("data is " + data);
            // console.log(data);

            //set the weather data for the forecast
            for (var i = 1; i <= 5; i++) {

                // console.log(dayArray);
                dayArray[i - 1].childNodes[1].src = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                dayArray[i - 1].childNodes[2].innerText = "Temp: " + data.daily[i + 1].temp.max + "°";
                dayArray[i - 1].childNodes[3].innerText = "Wind: " + data.daily[i + 1].wind_speed + "mph";
                dayArray[i - 1].childNodes[4].innerText = "Humidity: " + data.daily[i + 1].humidity + "%";

            }

            //set the weather data for the current day
            currentCity.innerText = globalCity.charAt(0).toUpperCase() + globalCity.slice(1);
            currentTemp.innerText = "Temp: " + data.current.temp + "°";
            currentWind.innerText = "Wind: " + data.current.wind_speed + "mph";
            currentUv.innerText = "UV: " + data.current.uvi;
            currentHumidity.innerText = "Humidity: " + data.current.humidity + "%";

            // console.log("switch for uvi icon");
            // console.log(typeof data.current.uvi);
            // console.log(data.current.uvi);


            if (data.current.uvi < 3) {
                //need to remove any bootstrap classes from the uv icon
                currentUv.classList.remove("badge", "badge-danger", "badge-orange");

                currentUv.classList.add("badge", "badge-success");
                console.log("uv is less than 6");
            }
            else if (data.current.uvi < 6) {
                currentUv.classList.remove("badge", "badge-success, badge-danger");
                currentUv.classList.add("badge", "badge-orange");
            }
            else {
                currentUv.classList.remove("badge", "badge-success", "badge-orange");

                currentUv.classList.add("badge", "badge-danger");
                console.log("uv is greater than 6");
            }


        })
        .catch((err) => {
            console.log(err);
        });


}

//create a function that gets the current weather data from the api and returns a data value when called


//need a function to create stylized divs based off the weather data
function createForecast() {
    // weatherData = getWeatherData(city);
    // while (weatherData === undefined) { };
    // console.log("weather data just logged" + weatherData);
    // // console.log(weather.fetchWeather(data));
    // console.log("logging weather data after await" + weatherData);
    // // var city = weatherData[0].name;
    // console.log(city);










    for (var i = 0; i < 5; i++) {
        // need to add h4 information to each div
        var day = document.createElement("div");
        day.classList.add("day", "col-2");
        //now add h4 for each detail in the day div
        var date = document.createElement("h4");
        date.innerText = moment().add(i + 1, 'days').format("MMM Do, YYYY");
        // console.log(date.innerText);


        // console.log("right before call" + weatherData[i].weather[0]);






        var img = document.createElement("img");
        img.setAttribute("id", "day-" + i);
        // console.log("creating id day-x for each day");
        img.classList.add("imageIcon");
        temp = document.createElement("h4");
        humidity = document.createElement("h4");
        wind = document.createElement("h4");









        day.appendChild(date);
        // console.log("appending img to day");
        day.appendChild(img);
        day.appendChild(temp);
        day.appendChild(wind);
        day.appendChild(humidity);
        dayArray.push(day);
        forecastRow.appendChild(day);
    }
}


document.querySelector('#searchBtn').onclick = (e) => {
    e.preventDefault();
    let city = document.querySelector('#city').value.trim();
    city = city.toLowerCase();
    globalCity = city;
    console.log(city);
    //add city to search history
    addSearchedCity(city);









    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    ).then(
        res => data = res.json()
    ).then(data => {
        console.log(data)


        var lat = data.coord.lat;
        // console.log("lat: " + lat)
        var lon = data.coord.lon;



        getWeatherData(lat, lon);
    }
        // console.log("lon: " + lon)

        // console.log("return true");

    );


}

function addSearchedCity(city) {
    //check if city is in the local search data array
    if (localSearchData.includes(city)) {
        //remove that city from the array
        console.log("removing duplicate");
        // localSearchData.splice(localSearchData.indexOf(city), 1);

    }
    else {
        //add the city to the array
        console.log("adding city");
        localSearchData.push(city);
        console.log("adding" + city);
        var row = document.createElement("div");
        row.classList.add("row-12");
        var button = document.createElement("button");
        button.classList.add("btn", "btn-dark-blue", "w-100", "mb-2");
        button.innerText = city.charAt(0).toUpperCase() + city.slice(1);
        row.appendChild(button);
        searchBar.appendChild(row);
        var jsonData = JSON.stringify(localSearchData);
        localStorage.setItem("searchData", jsonData);
    }
}

function loadSearchHistory() {
    console.log("loading search history");

    if (localSearchData === null) {
        localSearchData = [];
    }
    console.log(localSearchData);
    for (var i = 0; i < localSearchData.length; i++) {
        //remove duplicates
        // if (localSearchData.includes(localSearchData[i])) {
        //     //remove that city from the array
        //     console.log("removing duplicate");
        //     localSearchData = localSearchData.splice(i, 1);
        //     continue;
        // }
        console.log("adding city to search history");
        var row = document.createElement("div");
        row.classList.add("row-12");
        var button = document.createElement("button");
        button.classList.add("btn", "btn-dark-blue", "w-100", "mb-2");
        button.innerText = localSearchData[i].charAt(0).toUpperCase() + localSearchData[i].slice(1);
        row.appendChild(button);
        searchBar.appendChild(row);
    }

}


//event listener for side bar buttons
searchBar.addEventListener("click", (e) => {

    console.log("clicked");
    if (e.target.tagName === "BUTTON" && e.target.innerText !== "" && e.target.innerText !== "Search") {
        e.preventDefault();
        let city = e.target.innerText;
        city = city.toLowerCase();
        globalCity = city;
        console.log(city);
        //add city to search history









        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        ).then(
            res => data = res.json()
        ).then(data => {
            console.log(data)


            var lat = data.coord.lat;
            // console.log("lat: " + lat)
            var lon = data.coord.lon;



            getWeatherData(lat, lon);
        }

        ).catch(err => {
            console.log(err);
        });
    }
});









createForecast();
loadSearchHistory();

