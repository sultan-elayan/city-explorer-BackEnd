'use strict';

const express=require('express');
require('dotenv').config(); 
const cors = require('cors');
const server=express();


const PORT = process.env.PORT;
server.use(cors());


server.get('/',(req,res)=>{
    // res.status(200).send(weatherData)
    res.status(200).send('home route')
    


})



const weatherControl=(req, res)=>{
  let weather;
  let lat=req.query.lat;
  let lon 
  

let url=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
let weatherResponse = axios.get(url).then(response => {

weather=response.data;

lat=req.query.lat;
lon=req.query.lon;


let forecast=weather.data.map(item=>{
  return new ForeCast(item)
})
res.json(forecast)
}).catch(err=>{
res.status(500).send(`error in getting data ==> ${err}`)
})

}

server.get('/movies', (req, res)=>{
  let city_name=req.query.city
 let urlMove=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city_name}`

 let moveResponce=axios.get(urlMove).then(response => {
   // console.log(response.data.results);
   let movie=response.data.results.map(item=>{
     return new Movie(item)
   })
   res.json(movie)
 }).catch(err=>{
   res.status(500).send(`error in getting data ==> ${err}`)
})


})

class ForeCast {
  constructor(weather) {

    this.date = weather.valid_date
    this.description = weather.weather.description

  }
}

class Movie{
  constructor(data){
    this.average_votes = data.vote_average;

    this.total_votes = data.vote_count

    this.image_url = data.backdrop_path

    this.popularity = data.popularity

    this.released_on = data.release_date }};


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})



