import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for existing user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    // Validate password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create and save user
    const user = await userModel.create({
      name,
      email,
      password: hash,
      cartData: {}
    });

    // Generate JWT token
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Error: " + error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Compare entered password to hash
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Issue a token
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "Error: " + error.message });
  }
};



