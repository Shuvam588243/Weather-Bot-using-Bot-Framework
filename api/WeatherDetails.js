const axios = require('axios');


module.exports.FetchWeather = async(city) => {

    let weather = {};

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    const result = await axios.get(url);
    console.log(result.data);

    weather.city = result.data.name;
    weather.weather = result.data.weather[0].main;
    weather.description = result.data.weather[0].description;
    weather.max_temp = result.data.main.temp_min;
    weather.min_temp = result.data.main.temp_max;
    weather.lat = result.data.coord.lat;
    weather.lon = result.data.coord.lon;
    weather.temp = result.data.main.temp;

    return weather;

}