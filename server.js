'use strict';

const express=require('express');


require('dotenv').config(); 
const cors = require('cors');

const weatherData = require('./data/weather.json');

const server=express();


const PORT = process.env.PORT;
server.use(cors());


server.get('/',(req,res)=>{
    // res.status(200).send(weatherData)
    res.status(200).send('home route')
    


})

server.get('/weather',(req,res)=>{

  let lat = req.query.lat
  let lon = req.query.lon
  let searchQuery = req.query.searchQuery
  let findData = () => {
    let city = weatherData.find((city, index) => {
      return city.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase()
    })
    return city.data.map(item => {
      return new ForeCast(item)
    })
  }
  res.json(findData());
});
server.get('*',(req,res)=>{
    res.status(404).send('NOT FOUND')
})

class ForeCast {
  constructor(weather) {

    this.date = weather.valid_date
    this.description = weather.weather.description

  }
}


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})



