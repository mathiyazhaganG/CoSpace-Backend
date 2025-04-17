const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingController');
const userController = require('../controllers/userController');
const UserAuth = require('../middleware/UserAuth .js');
const AdminAuth= require('../middleware/AdminAuth.js')

router.post('/book',UserAuth ,controller.bookSeat);
router.post('/CreateSpace',AdminAuth,controller.createSpaceWithSeats);
router.get('/user/:userId', UserAuth,controller.getUserBookings);
router.get('/bookings',AdminAuth,controller.getBookings);
router.delete('/cancel/:id',UserAuth, controller.cancelBooking); 
router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.loginUser);
router.get('/spaces', controller.getAllSpaces);
router.get('/seats/available',UserAuth, controller.availableSeats);



/* Routes for the future scaling */
// router.get('/seats',controller.getAllSeats);
// router.get('/check-availability', controller.checkAvailability);
// router.get('/spaces/:spaceId', controller.getSpaces);




module.exports = router;