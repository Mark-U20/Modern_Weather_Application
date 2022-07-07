//moment.js to get the current date




var currentWeatherBox = document.getElementsByClassName("current-weather-box")[0];
var forecastRow = document.getElementById("forecast-row");
var currentCity = document.getElementById("current-city");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentUv = document.getElementById("current-uv");
var currentHumidity = document.getElementById("current-humidity");
//fetches weather data from the OpenWeather API and returns data to be used in the createForecast function
var apiKey = "ed888dba6518e5d289bd7fdcdf8345ee";
var globalCity;
var dayArray = [];

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
    console.log(url);










    fetch(url)
        .then((response) => {
            console.log(response);
            response = response.json();
            console.log(response);

            return response;

        })
        .then((data) => {
            //data is [object Object] because
            console.log("data is " + data);
            console.log(data);

            //set the weather data for the forecast
            for (var i = 1; i <= 5; i++) {
                
                console.log(dayArray);
                dayArray[i-1].childNodes[1].src = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"; 
                dayArray[i-1].childNodes[2].innerText = "Temp: " + data.daily[i + 1].temp.max + "°";
                dayArray[i-1].childNodes[3].innerText = "Wind: " + data.daily[i + 1].wind_speed + "mph";
                dayArray[i-1].childNodes[4].innerText = "Humidity: " + data.daily[i + 1].humidity + "%";

            }

            //set the weather data for the current day
            currentCity.innerText = globalCity;
            currentTemp.innerText = "Temp: " + data.current.temp + "°";
            currentWind.innerText = "Wind: " + data.current.wind_speed + "mph";
            currentUv.innerText = "UV: " + data.current.uvi;
            currentHumidity.innerText = "Humidity: " + data.current.humidity + "%";


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
        date.innerText = moment().add(i + 1, 'days').format("dddd");
        console.log(date.innerText);


        // console.log("right before call" + weatherData[i].weather[0]);







        var img = document.createElement("img");
        img.setAttribute("id", "day-" + i);
        console.log("creating id day-x for each day");
        img.classList.add("imageIcon");
        temp = document.createElement("h4");
        humidity = document.createElement("h4");
        wind = document.createElement("h4");


       






        day.appendChild(date);
        console.log("appending img to day");
        day.appendChild(img);
        day.appendChild(temp);
        day.appendChild(wind);
        day.appendChild(humidity);
        dayArray.push(day);
        forecastRow.appendChild(day);
    }
}


document.querySelector('#searchBtn').onclick=(e)=>{
        e.preventDefault();
        let city= document.querySelector('#city').value.trim();
        globalCity = city;
        console.log(city);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
          ).then(
            res => data= res.json()
          ).then( data=> 
            
            {console.log(data)
          
          
           var lat = data.coord.lat;
          // console.log("lat: " + lat)
          var lon = data.coord.lon;
        
        
        
          getWeatherData(lat, lon);
        }
          // console.log("lon: " + lon)
      
          // console.log("return true");
          
          );
        
    }

    



function updateWeatherData() {


    // console.log("appending img to day");
    // day.appendChild(img);
    // day.appendChild(temp);
    // day.appendChild(wind);
    // day.appendChild(humidity);



    var childArray = Array.from(document.getElementById("forecast-row"));
    for (var i = 0; i < childArray.length; i++) {
        var subChildArray = Array.from(childArray[i]);

        subChildArray[1].src = "http://openweathermap.org/img/w/" + weatherData[i].weather[0].icon + ".png";
        subChildArray[2].innerText = weatherData[i].daily[i + 1].temp.max + "°";
        subChildArray[3].innerText = weatherData[i].daily[i + 1].wind_speed + "mph";
        subChildArray[4].innerText = weatherData[i].daily[i + 1].humidity + "%";
    }






}











createForecast();


updateWeatherData();


// weather.fetchWeather("denver");