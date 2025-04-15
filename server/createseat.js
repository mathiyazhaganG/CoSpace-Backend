const connectDB = require('./config/database');
const Seat = require('./models/Seat.js');
const mongoose = require('mongoose');

connectDB().then(async() => {
	for(let i=1;i<=10;i++){
		await Seat.create({seatNumber:`S-${i}`});
	}
	console.log('Seats created successfully');
	
})