const mongoose = require('mongoose');

const { Schema } = mongoose;
const reservationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  reservedSeats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theaterId: {
    type: Schema.Types.ObjectId,
    ref: 'Theater',
    required: true,
  },
  showTimeId:{
    type: Schema.Types.ObjectId,
ref:'ShowTime',
required: true,
  },
  username: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: [true, 'Please provide email-id']
  },
  checkout: {
    type: Boolean,
    default: false,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;