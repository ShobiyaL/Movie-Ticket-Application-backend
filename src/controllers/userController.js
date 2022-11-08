const jwt = require("jsonwebtoken");
const User = require("../models/user");

// To signup a user
exports.signUpUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to signup user already exists",
      error,
    });
  }
};

// Signin user
exports.signInUser = async (req, res) => {
  const { emailId, password } = req.body;

  try {
    // Check if email and password is supplied
    if (!emailId || !password) {
      return res.status(401).json({
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ emailId }).select("+password");

    // Check if user exists and if password is correct
    if (!user || !(await user.verifyPassword(password, user.password))) {
      return res.status(200).json({
        status: "unauthorized",
      });
    }
    const obj = {
      existingUser: true,
      userName: user.username,
      userId: user._id,
      role: user.role,
    };
    // If above validations are passed
    return res.status(200).json({
      message: "Logged In Successfully",
      obj,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to signin",
      error,
    });
  }
};

// Logout user
exports.signoutUser = (req, res) => {
  return res.status(200).json({ status: "success" });
};
