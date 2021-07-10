'use strict';

class Movie {
    constructor(data) {
      this.average_votes = data.vote_average;
  
      this.total_votes = data.vote_count
  
      this.image_url = data.backdrop_path
  
      this.popularity = data.popularity
  
      this.released_on = data.release_date
    }
  };

  module.exports = Movie ;
  