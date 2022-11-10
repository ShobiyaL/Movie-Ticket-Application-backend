const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const Reservation = require('../models/reservation');

const { updateShowTiming } = require('./showTimeController');

// To create a reservation
exports.createReservation = async (req, res) => {
  req.body.date = new Date(req.body.date);
  console.log(req.body.date);
  try {
    const reservation = new Reservation(req.body);
    console.log(reservation);
    await reservation.save();

    // Update reserved seats in showTiming collection for this specific show
    req.body.reservationId = reservation._id.toString();
    updateShowTiming(req, res);
  } catch(error) {
    res.status(400).json({
      message:"failure",
      error
    })
  }
};

// To get all reservations of a user
exports.getAllReservations = async (req, res) => {
  const { startAt, screenId, date } = req.query;
  try {
    const reservations = await Reservation.find({
      startAt: { $eq: startAt },
      screenId: { $eq: screenId },
      date: new Date(date)
    }).exec();
    res.status(200).json({
      status: 'success',
      reservations
    });
  } catch(error) {
    res.status(400).json({
      message:"failure"
    })
  }
};

// To get reservation based on checkout session id
exports.getReservation = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

  try {
    const reservation = await Reservation.findById(
      ObjectId(session.client_reference_id)
    );
    res.status(200).json({
      reservation
    });
  } catch(error) {
    res.status(400).json({
      message:"failure"
    })
  }
};
