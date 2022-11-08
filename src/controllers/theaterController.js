const Theater = require('../models/theater');

// To add theater
exports.addTheater = async (req, res) => {
  try {
    const theater = new Theater(req.body);
    await theater.save();
    res.status(201).json({
      status: 'theater created successfully',
      theater
    });
  } catch(error) {
    res.status(400).json({
      message:"Unable to create theater at the moment",
      error
    })
    
  }
};

// To get all screens
exports.getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find({});
    res.status(200).json({
      status: 'success',
      theaters
    });
  } catch(error) {
    res.status(400).json({
      message:"Unable to get theaters",
      error
    })
    
  }
};

//Get Particular theater
exports.theaterById = async (req,res)=>{
  try {
    const theater = await Theater.findById({ _id: req.params.movieId });
    res.status(200).json({
      status: 'success',
      theater
    });
  } catch(error) {
    res.status(400).json({
      message:"unable to get theater",
      error
    })
  }
}
// To update a screen
exports.updateTheater = async (req, res) => {
  try {
    await Theater.updateOne({ _id: req.params.screenId }, { $set: req.body });
    res.status(200).json({
      status: 'success'
    });
  } catch(error) {
    res.status(400).json({
      message:"Unable to get theaters",
      error
    })
    
  }
};
