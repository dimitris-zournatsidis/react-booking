const express = require('express');
const router = express.Router();
const {
  getBookings,
  setBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

router.get('/', getBookings);
router.post('/', setBooking);
// Alternative way -> router.route('/').get(getBookings).post(setBooking);

router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
// Alternative way -> router.route('/:id').put(updateBooking).delete(deleteBooking);

module.exports = router;
