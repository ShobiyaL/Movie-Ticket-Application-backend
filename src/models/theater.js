const mongoose = require('mongoose');

const { Schema } = mongoose;

const theaterSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  movieName:{
    type: String,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;