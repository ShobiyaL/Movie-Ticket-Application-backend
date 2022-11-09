const express = require('express');
const {
  addShowTime,
  getAllShowTimes,
  getReservedSeats,
  getShowTime,
  updateShowTime
} = require('../controllers/showTimeController');

const router = express.Router();

router
  .get('/', getAllShowTimes)
  .get('/reserved-seats', getReservedSeats)
  .get('/:movieId', getShowTime)
  .post('/addShowTime', addShowTime)
  .patch('/:showTimingId', updateShowTime);

module.exports = router;
