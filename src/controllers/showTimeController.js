const mongoose = require('mongoose');

const ShowTime= require('../models/showTime');
const { createCheckoutSession } = require('./checkoutController');


const { ObjectId } = mongoose.Types;

// To add a showTiming
exports.addShowTime = async (req, res) => {
  req.body.date = new Date(req.body.date);

  try {
    const showTime = new ShowTime(req.body);
    await showTime.save();
    res.status(201).json({
      message: 'success',
      showTime
    });
  } catch(error) {
    res.status(400).json({
        message: 'failure',
        error
      });
    
  }
};

// To get all showTime
exports.getAllShowTimes = async (req, res) => {
  try {
    const showTime = await ShowTime.find({});
    res.status(200).json({
      message: 'success',
      showTime
    });
  }catch(error) {
    res.status(400).json({
        message: 'failure',
        error
      });
    
  }
};

// To get all reserved seats
exports.getReservedSeats = async (req, res) => {
  const { startAt, theaterId, date } = req.query;
  try {
    const reservedSeats = await ShowTime.find(
      {
        startAt: { $eq: startAt },
        theaterId: { $eq: theaterId },
        date: new Date(date)
      },
      { reservedSeats: 1 }
    ).exec();
    res.status(200).json({
      message: 'success',
      reservedSeats
    });
  } catch(error) {
    res.status(400).json({
        message: 'failure',
        error
      });
    
  }
};

// To get showTime and theater based on movie id
exports.getShowTime = async (req, res) => {
  const { selectedDate } = req.query;
  const { movieId } = req.params;
  try {
    const showTime = await ShowTime.aggregate([
      {
        $match: {
          movieId: ObjectId(`${movieId}`),
          date: { $eq: new Date(selectedDate) }
        }
      },
      {
        $lookup: {
          from: 'theater',
          localField: 'theaterId',
          foreignField: '_id',
          as: 'screen_details'
        }
      },
      {
        $unset: ['screen_details._id']
      }
    ]);

    res.status(200).json({
      message: 'success',
      showTime
    });
  } catch(error) {
    res.status(400).json({
        message: 'failure',
        error
      });
    
  }
};

// To update a showTiming
exports.updateShowTime = async (req, res, next) => {
  try {
    await ShowTime.updateOne(
      { _id: req.body.showTimeId },
      { $push: { reservedSeats: req.body.selectedSeats } }
    );
    // Go to next middleware for creating stripe checkout seesion
    createCheckoutSession(req, res, next);
  } catch(error) {
    res.status(400).json({
        message: 'failure',
        error
      });
    
  }
};
