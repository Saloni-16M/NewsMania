const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

async function signup(req, response) {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return response.status(409).json({ message: "User already exists." });
  }
  
  const usermodel = new userModel({ name, email, password });
  usermodel.password = await bcrypt.hash(password, 10);
  
  await usermodel.save();
  return response.status(201).json({ message: "Signup successful!", success: true });
}

async function login(req, response) {
  const { email, password } = req.body;
  
  const user = await userModel.findOne({ email });
  if (!user) {
    return response.status(409).json({ message: "User does not exist." });
  }
  
  const isPassEqual = await bcrypt.compare(password, user.password);
  if (!isPassEqual) {
    return response.status(401).json({ message: "Invalid credentials." });
  }

  // Create a JWT token
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expires in 1 hour
  );

  // Send token to the client
  return response.status(200).json({
    message: "Login successful",
    token: token,
  });
}

module.exports = {
  login,
  signup,
};
