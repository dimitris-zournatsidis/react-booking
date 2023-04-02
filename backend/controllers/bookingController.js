const asyncHandler = require('express-async-handler');

// GET /api/bookings
const getBookings = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get bookings' });
});

// POST /api/bookings
const setBooking = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add text field');
  }
  res.status(200).json({ message: 'Set booking' });
});

// UPDATE /api/bookings/:id
const updateBooking = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update booking ${req.params.id}` });
});

// DELETE /api/bookings/:id
const deleteBooking = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete booking ${req.params.id}` });
});

module.exports = {
  getBookings,
  setBooking,
  updateBooking,
  deleteBooking,
};
