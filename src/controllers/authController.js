const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required", status: false });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Email already in use", status: false });
    }

    // Create a new user
    const newUser = new User({ email, password });

    // Save the user to the database
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", status: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(500)
        .send({ message: "Email and password is required", status: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Invalid credentials.", status: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .send({ message: "Invalid credentials.", status: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .send({ token, status: true, message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message, status: false });
  }
};
