const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingController');
const authuser = require('../middleware/authadmin.js');

router.post('/book', authuser,controller.bookSeat);
router.get('/user/:userId',authuser, controller.getUserBookings);
router.get('/seats', authuser,controller.getAllSeats);
router.get('/bookings',authuser, controller.getBookings);
router.delete('/cancel/:id',authuser, controller.cancelBooking); 
router.post('/user/register', controller.registerUser);
router.post('/user/login', controller.loginUser);

module.exports = router;