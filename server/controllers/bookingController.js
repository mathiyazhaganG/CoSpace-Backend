const Booking = require('../models/Booking');
const Seat = require('../models/Seat');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.bookSeat= async (req, res) => {
	try {
		const { seatId, userId, date, timeSlot } = req.body;
		const existingBooking = await Booking.findOne({ seat: seatId, date, timeSlot });
		if (existingBooking) {
			return res.status(400).json({ message: "Seat is already booked for this time slot" });
		}
		const booking = new Booking({
			seat: seatId,
			user: userId,
			date,
			timeSlot,
		});
		await booking.save();
		res.status(201).json({ message: "Seat booked successfully", booking });
	} catch (error) {
		console.error("Error booking seat:", error);
		res.status(500).json({ message: "Error booking seat" });
	}
};

exports.getUserBookings = async (req, res) => {
	try {
		// const userId = req.user._id; 
		const { userId } = req.params; 
		const bookings = await Booking.find({ user: userId }).populate('seat');
		if (!bookings || bookings.length === 0) {
			return res.status(404).json({ message: "No bookings found for this user" });
		}
		res.status(200).json(bookings);
	}catch (error) {
		console.error("Error fetching user bookings:", error);
		res.status(500).json({ message: "Error fetching user bookings" });
	}
	
}

exports.getAllSeats = async (req, res) => {
	try {
		const seats = await Seat.find({});
		if (!seats || seats.length === 0) {
			return res.status(404).json({ message: "No seats found" });
		}
		res.status(200).json(seats);
	} catch (error) {
		console.error("Error fetching all seats:", error);
		res.status(500).json({ message: "Error fetching all seats" });
		
	}
};
exports.getBookings = async (req, res) => {
	try {
		const bookings = await Booking.find({}).populate('seat').populate('user');
		if (!bookings || bookings.length === 0) {
			return res.status(404).json({ message: "No bookings found" });
		}
		res.status(200).json(bookings);
		
	} catch (error) {
		console.error("Error fetching all bookings:", error);
		res.status(500).json({ message: "Error fetching all bookings" });
		
	}
};
exports.cancelBooking = async (req, res) => {
	try {
		const bookingId = req.params.id;
		const booking = await Booking.findByIdAndDelete(bookingId);
		if (!booking) {
			return res.status(404).json({ message: "Booking not found" });
		}
		res.status(200).json({ message: "Booking cancelled successfully" });
	} catch (error) {
		console.error("Error cancelling booking:", error);
		res.status(500).json({ message: "Error cancelling booking" });
		
	}
}
exports.registerUser = async (req, res) => {
	try {
		const { name,email } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}
		const user = new User({
			name,
			email,
			password: bcrypt.hashSync(req.body.password, 8), 
		});
		await user.save();
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1d' } 
		  );
		res.cookie("token", token);
		res.status(201).json({ message: "User registered successfully", user });
		
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ message: "Error registering user" });
		
	}
}
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const match = await bcrypt.compare(password, user.password);
		if (!user || !match) {
			return res.status(401).json({ message: "Invalid email or password" });
		}
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1d' } 
		  );
		res.cookie("token", token);
		res.status(200).json({ message: "User logged in successfully", user });
		
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).json({ message: "Error logging in user" });
		
	}
};
