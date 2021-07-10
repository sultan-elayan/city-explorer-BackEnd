'use strict';
// setting-up the server 
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weatherController = require('./contollers/weather.controller')
const movieController = require('./contollers/movie.controller')
const port = process.env.PORT || 8000;

//home page 
app.get('/', (req, res) => {
  
  res.status(200).send('home route')
})

// crafting routes 
app.get('/weather', weatherController)
app.get('/movies', movieController)

// defining port , and check it 
app.listen(port, () => {
  console.log(`Listening to PORT ${port}`);
})



