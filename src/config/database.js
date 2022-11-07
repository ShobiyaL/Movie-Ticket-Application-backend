const mongoose = require('mongoose');

const dbConnect = async () => {
  const mongoConnectionString = process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongoConnectionString);
    console.log('Successfully Connected to Database');
  } catch (err) {
    console.log('Unable to establish connection to Database',err);
  }
};
module.exports = { dbConnect };
