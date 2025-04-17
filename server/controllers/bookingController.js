const Booking = require('../models/Booking');
const Seat = require('../models/Seat');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Space = require('../models/Space');
const validator = require('validator');


exports.bookSeat = async (req, res) => {
  try {
    const { seatId, userId, date, timeSlot, spaceId } = req.body;

    // Validate required fields
    if (!seatId || !userId || !date || !timeSlot || !spaceId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the seat is already booked for the given time slot
    const existingBooking = await Booking.findOne({ seat: seatId, date, timeSlot, space: spaceId });
    if (existingBooking) {
      return res.status(200).json({ message: "Seat is already booked for this time slot" });
    }

    // Create a new booking
    const booking = new Booking({
      seat: seatId,
      user: userId,
      date,
      timeSlot,
      space: spaceId,
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
		const bookings = await Booking.find({ user: userId }).populate('seat').populate('space');
		res.status(200).json(bookings);
	}catch (error) {
		console.error("Error fetching user bookings:", error);
		res.status(500).json({ message: "Error fetching user bookings" });
	}
	
}

exports.getAllSeats = async (req, res) => {
	try {
		const seats = await Seat.find({});
		res.status(200).json(seats);
	} catch (error) {
		console.error("Error fetching all seats:", error);
		res.status(500).json({ message: "Error fetching all seats" });
		
	}
};
exports.getBookings = async (req, res) => {
	try {
		const bookings = await Booking.find({}).populate('seat').populate('user').populate('space');
		
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
exports.createSpaceWithSeats = async (req, res) => {
	try {
	  const { spaceName, location, amenities, description, images, TotalSeats } = req.body;
	  if(!spaceName || !location || !amenities || !description || !images || !TotalSeats) {
		return res.status(400).json({ message: 'All fields are required' });
	  }
	  if (TotalSeats <= 0) {
		return res.status(400).json({ message: ' Enter Valid TotalSeats ' });
	  }
	  if(spaceName.trim() == 0 || location.trim() == 0 || description.trim() == 0|| images[0].trim() == 0 || amenities[0].trim() == 0) {
		return res.status(400).json({ message: 'Invalid Data' });
	  }
	 
  
	  const space = new Space({
		spaceName,
		location,
		amenities,
		description,
		images,
		TotalSeats,
		seats: [] // will push later
	  });
  
	  // Step 2: Create each seat and link it to this space
	  for (let i = 1; i <= TotalSeats; i++) {
		const seatNumber = `S-${i}`;
		const seat = await Seat.create({ seatNumber, space: space._id });
		space.seats.push(seat._id);
	  }
  
	  await space.save();
  
	  res.status(201).json({ message: 'Space created with seats', space });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error while creating space with seats' });
	}
  };
  

exports.getAllSpaces = async (req, res) => {
  try {
    const spaces = await Space.find({}).populate('seats'); // Populate seats if needed
    res.status(200).json(spaces);
  } catch (error) {
    console.error("Error fetching all spaces:", error);
    res.status(500).json({ message: "Error fetching all spaces" });
  }
};

exports.getSpaces = async (req, res) => {
	try {
		const { spaceId } = req.params;
	  const spaces = await Space.find({ _id: spaceId }).populate('seats'); // Populate seats if needed
	  res.status(200).json(spaces);
	} catch (error) {
	  console.error("Error fetching all spaces:", error);
	  res.status(500).json({ message: "Error fetching all spaces" });
	}
  };
  

  exports.availableSeats = async (req, res) => {
	const { spaceId, date, timeSlot } = req.query;
  
	if (!spaceId || !date || !timeSlot) {
	  return res.status(400).json({ message: 'All fields are required' });
	}
  
	try {
	  // ✅ Step 1: Find all booked seat IDs for this space, date, and timeSlot
	  const bookedSeats = await Booking.find({
		space: spaceId,
		date,
		timeSlot
	  }).distinct('seat'); // ✅ correct field name
  
	  // ✅ Step 2: Get all seats in the space that are NOT booked
	  const availableSeats = await Seat.find({
		space: spaceId,
		_id: { $nin: bookedSeats }
	  });
  
	  res.status(200).json(availableSeats);
	} catch (err) {
	  console.error('Error fetching available seats:', err);
	  res.status(500).json({ message: 'Server error' });
	}
  };
  
  
  exports.checkAvailability = async (req, res) => {
	try {
	  const { seatId, date, timeSlot, spaceId } = req.query;
  
	  if (!seatId || !date || !timeSlot || !spaceId) {
		return res.status(400).json({ message: "All fields are required" });
	  }
  
	  const existingBooking = await Booking.findOne({ seat: seatId, date, timeSlot, space: spaceId });
  
	  if (existingBooking) {
		return res.status(200).json({ available: false, message: "Seat is already booked" });
	  }
  
	  res.status(200).json({ available: true, message: "Seat is available" });
	} catch (error) {
	  console.error("Error checking seat availability:", error);
	  res.status(500).json({ message: "Internal server error" });
	}
  };
  
