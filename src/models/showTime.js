const mongoose = require('mongoose');

const { Schema } = mongoose;
const showTimeSchema = new Schema({
  startAt: {
    type: Array,
    required: [true, 'Please provide show starting time'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Please provide show date']
  },
  reservedSeats:{
     type:Array,
  },
  
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Please provide movie id']
  },
  theaterId: {
    type: Schema.Types.ObjectId,
    ref: 'Theater',
    required: [true, 'Please provide Theater id']
  }
});

const ShowTime = mongoose.model('ShowTime', showTimeSchema);

module.exports = ShowTime;
