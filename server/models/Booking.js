const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
	seat: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Seat',
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	date: {
		type: String,
		required: true
	},       
	timeSlot:{
		type: String,
		required: true	
	}
},{timestamps: true});

module.exports = mongoose.model('Booking', BookingSchema);
