
### API List ###
--router.post('/book', authuser,controller.bookSeat);--working fine
--router.get('/user/:userId',authuser, controller.getUserBookings);--working working fine
--router.get('/seats', authuser,controller.getAllSeats);--working fine
--router.get('/bookings',authuser, controller.getBookings);--working fine 
--router.delete('/cancel/:id',authuser, controller.cancelBooking);--working fine
--router.post('/user/register', controller.registerUser);--working fine
--router.post('/user/login', controller.loginUser);--working fine


