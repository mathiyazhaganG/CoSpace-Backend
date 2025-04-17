const Booking = require('../models/Booking');
const Seat = require('../models/Seat');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Space = require('../models/Space');
const validator = require('validator');

exports.registerUser = async (req, res) => {
	try {
		const { name,email,password,role} = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if(name.trim()==0){
			return res.status(400).json({ message: "its not a valid name " });
		}
		if (!validator.isEmail(email)) {
			return res.status(400).json({ message: "Invalid email format" });
		}
		if (!validator.isLength(password, { min: 6})) {
			return res.status(400).json({ message: "Password must be at least 6 characters long " });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.json({ message: "User already exists" });
		}
		const user = new User({
			name,
			email,
			password: bcrypt.hashSync(password, 8), 
			role: role || 'user' 
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
