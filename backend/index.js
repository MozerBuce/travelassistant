const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const OPENWEATHER_API_KEY = "7928324f9ec5286e8b262ccd2c8d8531";
const GEOCODING_API_ENDPOINT = "https://api.openweathermap.org/geo/1.0/direct?limit=1";
const EXCHANGERATE_API_KEY = "fde12ddc6c941c790160aff9a402e406";
const EXCHANGERATE_API_ENDPOINT = "http://api.exchangeratesapi.io/v1/latest";



// Route for returning the data
app.get(`/:city_name`, (req, res) => {
    const city_name = req.params.city_name;
    const encodedCityName = encodeURIComponent(city_name);

    // Fetch weather data using Axios
    // const resposta = await axios.get(GEOCODING_API_ENDPOINT + `&q=${encodedCityName}` + `&appid=${OPENWEATHER_API_KEY}`)

    axios.get(GEOCODING_API_ENDPOINT + `&q=${encodedCityName}` + `&appid=${OPENWEATHER_API_KEY}`)
        .then(response => {
            const lat = response.data[0].lat;
            const lon = response.data[0].lon;
            const countryCode = response.data[0].country;

            // get the weather based on the geo location
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?units=metric&cnt=4&exclude=hourly,minutely,alerts&lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`)
                .then(forecastResponse => {

                    //get the currency so that can get the exchange rate
                    axios.get(`https://restcountries.com/v3.1/alpha/${countryCode.toLowerCase()}`)
                        .then(countryResponse => {

                            // get the currencyCode of the
                            const currencyCode = Object.keys(countryResponse.data[0].currencies)[0]

                            // get te exchange rate
                            axios.get(`${EXCHANGERATE_API_ENDPOINT}?access_key=${EXCHANGERATE_API_KEY}&symbols=${currencyCode}`)
                                .then(exchangeResponse => {

                                    // extract the relevant data
                                    const data = {
                                        actualweather: Math.round(forecastResponse.data.current.temp),
                                        day_i: {
                                            max: Math.round(forecastResponse.data.daily[1].temp.max),
                                            min: Math.round(forecastResponse.data.daily[1].temp.min)
                                        },
                                        day_ii: {
                                            max: Math.round(forecastResponse.data.daily[2].temp.max),
                                            min: Math.round(forecastResponse.data.daily[2].temp.min)
                                        },
                                        day_iii: {
                                            max: Math.round(forecastResponse.data.daily[3].temp.max),
                                            min: Math.round(forecastResponse.data.daily[3].temp.min)
                                        },
                                        currencycode: currencyCode,
                                        population: countryResponse.data[0].population.toLocaleString(),
                                        exchange_rate: exchangeResponse.data.rates[currencyCode.toUpperCase()].toFixed(2)
                                    }
                                    //send the data  
                                    res.send(data);
                                })
                                .catch(error => {
                                    res.status(500).send('Error fetching exchange data');
                                });
                        })
                        .catch(error => {
                            res.status(500).send('Error fetching country data');
                        });
                })
                .catch(error => {
                    res.status(500).send('Error fetching forecast data');
                });
        })
        .catch(error => {
            res.status(500).send('Error fetching geolocation data');
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
