'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weatherController = require('./contollers/weather.controller')
const movieController = require('./contollers/movie.controller')
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  
  res.status(200).send('home route')
})

app.get('/weather', weatherController)
app.get('/movies', movieController)

app.listen(port, () => {
  console.log(`Listening to PORT ${port}`);
})



