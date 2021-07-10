'use strict';
// setting-up the movie controller 
const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const cache = require('../memory/cache')
const axios = require('axios');
const { response } = require('express');
const Movie = require('../models/movie.model')

// define the cache 
let newCache = new cache();
newCache['data'] = [];
let moviesDay;
let moviesByDate;

// making the main function
let movieController = (req, res) => {
  let movies = [];

  let city_name = req.query.city
  // crafting routes 
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city_name}`
  let date = new Date();
  let dateChange = date.getMonth();
  // making the compression , if the data in cache show it else git it from the API
  if (city_name) {
    if (newCache['data'].length > 0 && date === dateChange) {
      movies = newCache['data'].map(item => { return new Movie(item) })
      res.json(movies);
    } else {
      moviesDay = new Date();
      moviesByDate = moviesDay.getMonth();
      axios.get(movieUrl).then(response => {

        movies = response.data.results.map(item => {
          return new Movie(item)
        })
        res.json(movies);
        newCache['data'] = response.data.results;
      }).catch(err => {

        res.status(500).send(`Error while getting the data  ==> ${err}`)
      })
    }

  } else {
    res.send('Please Enter Your City Name')
  }

}

module.exports = movieController;
