const mongoose = require('mongoose');

const SpaceSchema = new mongoose.Schema({
    spaceName: {
        type: String,
        required: true,
    },
	TotalSeats:{
		type:Number,
		required:true,
	},
    seats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
    }],
    location: {
		type: String,
		required: true,
	},
	amenities: [String],
	description: {
		type: String,
		required: true,
	},
	images: [String]
	
}, { timestamps: true });

module.exports = mongoose.model('Space', SpaceSchema);