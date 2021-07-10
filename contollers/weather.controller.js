'use strict';
// setting-up the weather controller 
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const axios = require('axios')
const { response } = require('express');
const Forecast = require('../models/weather.model')
const cache = require('../memory/cache')

// define the cache
let newCache2 = new cache();
newCache2['data'] = [];
let weatherDay;
let weatherByDate;

// making the main function
let weatherController = (req, res) => {
  let weather;
  let lat = req.query.lat;
  let lon = req.query.lon;
  // crafting routes 
  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  let date = new Date();
  let dateChange = date.getMonth();


  // making the compression , if the data in cache show it else git it from the API
  if (lat && lon) {
    if (newCache2.data.length > 0 && date === dateChange) {
      weather = newCache2.data.map(item => {
        return new Forecast(item);
      })
      res.json(weather)


    } else {

      weatherDay = new Date();
      weatherByDate = weatherDay.getDate();
      let weatherResponse = axios.get(weatherUrl).then(response => {
        weather = response.data;
        let forecast = response.data.data.map(item => {
          return new Forecast(item)
        })
        res.json(forecast)
        newCache2['data'] = response.data.data;

      }).catch(err => {
        res.status(500).send(`Error while getting the data  ==> ${err}`)
      })
    }
  } else {
    res.send('Please Enter Your City Name')
  }

}

module.exports = weatherController;

