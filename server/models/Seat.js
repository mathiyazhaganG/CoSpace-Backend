const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  seatNumber: String,
  isAvailable: {
    type: Boolean,
    default: true // Initially, seats are available
},
  
  space: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
  },
}, { timestamps: true });


module.exports = mongoose.model('Seat', SeatSchema);
