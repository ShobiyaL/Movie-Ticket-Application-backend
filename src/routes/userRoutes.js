const express = require("express");
const {
  signUpUser,
  signInUser,
  signoutUser,
} = require("../controllers/userController");

const router = express.Router();

router
  .post("/signup", signUpUser)
  .post("/signin", signInUser)
  .get("/signout", signoutUser);

module.exports = router;
