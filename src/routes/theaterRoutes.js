const express = require('express');
const {
  getAllTheaters,
  theaterById,
  addTheater,
  updateTheater
} = require('../controllers/theaterController');

const router = express.Router();

router
  .get('/', getAllTheaters)
  .get('/:theaterId',theaterById)
  .post('/addTheater', addTheater)
  .patch('/:theaterId', updateTheater);

module.exports = router;
