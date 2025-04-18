const jwt = require("jsonwebtoken");
const User = require("../models/User");

const UserAuth = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies); 
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Please login first! No token found." });
    }

    console.log("Token received:", token);

    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedObj);

    const { userId } = decodedObj;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found in database" });
    }

    req.user = user;
    console.log("Authenticated User:", { name: user.name, email: user.email }); // Debugging log
    next();
  } catch (err) {
    console.error("Authentication failed:", err.message);
    res.status(400).json({ message: "Authentication failed", error: err.message });
  }
};

module.exports = UserAuth ;