const express = require('express');
const {
  addMovie,
  getMovies,  
  updateMovie,
  getMovie,
  getMovieByName
} = require('../controllers/movieController');

const router = express.Router();

router
  .get('/', getMovies)
  .post('/addMovie', addMovie)
  .patch('/:movieId', updateMovie)
  .get('/:movieId', getMovie)
  .get('/name/:movieName', getMovieByName);
module.exports = router;
