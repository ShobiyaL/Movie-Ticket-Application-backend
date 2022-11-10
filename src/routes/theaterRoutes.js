const express = require("express");
const {
  getAllTheaters,
  theaterById,
  theaterByMovieName,
  addTheater,
  updateTheater,
  theaterByCity,
  tByCityMovieName,
  cities,
} = require("../controllers/theaterController");

const router = express.Router();

router
  .get("/", getAllTheaters)
  .get("/:theaterId", theaterById)
  .get("/cityName/:city", theaterByCity)
  .get("/moviename/:movieName", theaterByMovieName)
  .get("/cmname/:city/:movieName", tByCityMovieName)
  .post("/addTheater", addTheater)
  .patch("/:theaterId", updateTheater)
  .get("/filter/cities", cities);

module.exports = router;
