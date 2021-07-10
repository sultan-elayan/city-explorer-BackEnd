'use strict';

const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const axios = require('axios')
const Movie = require('../models/movie.model')


const movieController = ( (req, res)=>{
    let city_name=req.query.city
   let movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city_name}`
  
   let moveResponse=axios.get(movieUrl).then(res => {
     // console.log(response.data.results);
     let movie=res.data.results.map(item=>{
       return new Movie(item)
     })
     res.json(movie)
   }).catch(err=>{
     res.status(500).send(`Error while getting the data  ==> ${err}`)
  })
  
  
  })

  module.exports = movieController ;
