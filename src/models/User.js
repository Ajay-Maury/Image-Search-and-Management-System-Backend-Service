const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        // Password validation: At least 1 lowercase, 1 uppercase, 1 digit, 1 special character, and minimum length of 8
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        return regex.test(value);
      },
      message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long",
    },
  },
});

userSchema.pre("save", async function (next) {
  // Hash the password before saving it to the database
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);

