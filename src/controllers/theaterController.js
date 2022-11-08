const Theater = require('../models/theater');

// To add theater
exports.addTheater = async (req, res) => {
  try {
    const theater = new Theater(req.body);
    await theater.save();
    res.status(201).json({
      message: 'theater created successfully',
      theater
    });
  } catch(error) {
    res.status(400).json({
      message:"Unable to create theater at the moment",
      error
    })
    
  }
};

// To get all theaters
exports.getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find({});
    res.status(200).json({
      message: 'success',
      theaters
    });
  } catch(error) {
    res.status(400).json({
      message:"Unable to get theaters",
      error
    })
    
  }
};

//Get Particular theater by Id
exports.theaterById = async (req,res)=>{
  try {
    const theater = await Theater.findById({ _id: req.params.theaterId });
    res.status(200).json({
      message: 'success',
      theater
    });
  } catch(error) {
    res.status(400).json({
      message:"unable to get theater",
      error
    })
  }
}
//Get Particular theater by city
exports.theaterByCity = async (req,res)=>{
  try {
    const theater = await Theater.find({ city: req.params.city });
    res.status(200).json({
      message: 'success',
      theater
    });
  } catch(error) {
    res.status(400).json({
      message:"unable to get theater",
      error
    })
  }
}
//Get Particular theater by city and moviesName
exports.tByCityMovieName= async (req,res)=>{
  
  try {
    const theater = await Theater.find({ city: req.params.city,movieName:req.params.movieName });
    
    res.status(200).json({
      message: 'success',
      theater
    });
  } catch(error) {
    res.status(400).json({
      message:"unable to get theater",
      error
    })
  }
}
//Get Particular theater by city and moviesName
exports.cities= async (req,res)=>{
  
  try {
    const location = await Theater.find({},{city:1,_id:0});
    res.status(200).json({ 
      location
    });
  } catch(error) {
    res.status(400).json({
      message:"unable to get theater",
      error
    })
  }
}
// Get Particular theater by moviename
exports.theaterByMovieName = async (req,res)=>{
  try {
    const theater = await Theater.find({ movieName: req.params.movieName });
    res.status(200).json({
      message: 'success',
      theater
    });
  } catch(error) {
    res.status(400).json({
      message:"unable to get theater",
      error
    })
  }
}

// To update a theater
exports.updateTheater = async (req, res) => {
  try {
    await Theater.updateOne({ _id: req.params.screenId }, { $set: req.body });
    res.status(200).json({
      message: 'success'
    });
  } catch(error) {
    res.status(400).json({
      message:"Unable to get theaters",
      error
    })
    
  }
};

