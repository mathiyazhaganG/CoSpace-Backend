const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookies = require('cookie-parser');
const connectDB = require('./config/database');
const bookingRouter = require('./routes/bookingRoutes');
require('dotenv').config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(cookies());
app.use('/api',bookingRouter);





connectDB().then(() => {
	console.log('Connected to MongoDB');
	app.listen(port, () => {
		console.log(`Server is running on port: ${port}`);
	});
}).catch((err) => {
	console.log('Error connecting to MongoDB', err)
	process.exit(1);
}
);

