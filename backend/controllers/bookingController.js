const asyncHandler = require('express-async-handler');
const Booking = require('../models/bookingModel');

// GET /api/bookings
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();
  res.status(200).json(bookings);
});

// POST /api/bookings
const setBooking = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add your name');
  }

  if (!req.body.email) {
    res.status(400);
    throw new Error('Please add your email');
  }

  const booking = await Booking.create({
    name: req.body.name,
    email: req.body.email,
  });

  res.status(200).json(booking);
});

// UPDATE /api/bookings/:id
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(400);
    throw new Error('Booking not found');
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedBooking);
});

// DELETE /api/bookings/:id
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(400);
    throw new Error('Booking not found');
  }

  await booking.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBookings,
  setBooking,
  updateBooking,
  deleteBooking,
};
