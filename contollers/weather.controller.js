'use strict';
const WEATHER_API_KEY=process.env.WEATHER_API_KEY
const axios = require('axios')
const Forecast = require('../models/weather.model')


    const weatherController = ((req, res)=>{
        let weather;
        let lat=req.query.lat;
        let lon=req.query.lon;
        
    
    let weatherUrl=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    let weatherResponse = axios.get(weatherUrl).then(res => {
      weather=res.data;
      let forecast=weather.data.map(item=>{
        return new Forecast(item)
      })
     
      res.json(forecast)
    }).catch(err=>{
      res.status(500).send(`error in getting data ==> ${err}`)
    })
      
    })

    module.exports = weatherController ;

  