const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  seatNumber: String,
});

module.exports = mongoose.model('Seat', SeatSchema);
