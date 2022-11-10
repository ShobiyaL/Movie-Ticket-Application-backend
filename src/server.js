const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const theaterRoutes = require("./routes/theaterRoutes");
const showTimeRoutes = require("./routes/showTimeRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const stripeEventRoutes = require("./routes/stripeEventRoutes");

const globalErrorHandler = require("./controllers/errorController");

const app = express();

// Stripe webhook
app.use(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeEventRoutes
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Implement cors
app.use(cors());
app.options("*", cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/theater", theaterRoutes);
app.use("/api/showTime", showTimeRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/checkout", checkoutRoutes);

// Handle all unhandled routes
app.use("*", (req, _res, next) => {
  _res.send(`Requested url ${req.originalUrl} doesn't exist`, 404);
});

// Global error handling middleware
app.use(globalErrorHandler);
module.exports = app;
