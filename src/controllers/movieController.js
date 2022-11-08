const Movie = require('../models/movie');

// To add a movie
exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({
      status: 'success'
    });
  } catch(error) {
    res.status(400).json({
      message:"unable to create movie",
      error
    })
  }
};

// To get movies
exports.getMovies = async (req, res) => {
    try {
      const movies = await Movie.find({});
      res.status(200).json({
        status: 'success',
        movies
      });
    } catch(error) {
    res.status(400).json({
      message:"unable to get movie",
      error
    })
  }
};

// To update a movie
exports.updateMovie = async (req, res) => {
  try {
    await Movie.updateOne({ _id: req.params.movieId }, { $set: req.body });
    res.status(200).json({
      status: 'success'
    });
  } catch(error) {
    res.status(400).json({
      message:"unable to update movie",
      error
    })
  }
};

// To get a movie by id
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById({ _id: req.params.movieId });
    res.status(200).json({
      status: 'success',
      movie
    });
  } catch(error) {
    res.status(400).json({
      message:"unable to get movie",
      error
    })
  }
};

// To get a movie by name
exports.getMovieByName = async (req, res) => {
  try {
    // console.log(req.params);
    const movie = await Movie.findOne({title:req.params.movieName});
    res.status(200).json({
      status: 'success',
      movie
    });
  } catch(error) {
    res.status(400).json({
      message:"unable to get movie",
      error
    })
  }
};