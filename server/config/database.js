const mongoose = require('mongoose');

const connectDB = async () => {
  
		await mongoose.connect("mongodb+srv://admin:admin@cluster0.wp5rc.mongodb.net/CoSpace" );
	   
   
};

module.exports = connectDB;