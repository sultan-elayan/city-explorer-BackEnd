'use strict'

class Forecast {
    constructor(data) {
      this.description = data.weather.description;
  
      this.date = data.valid_date
  
    }
  }

  module.exports = Forecast ;