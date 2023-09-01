const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email already in use" });
    }

    // Create a new user
    const newUser = new User({ email, password });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({ error: "Email and password is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
