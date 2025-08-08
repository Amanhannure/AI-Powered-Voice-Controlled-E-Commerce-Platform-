// controllers/userController.js

import userModel from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Initialize Google OAuth client once
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// JWT token creation function
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create user in database
    const user = await userModel.create({
      name,
      email,
      password: hash,
      cartData: {},
      isGoogle: false,
    });

    // Generate JWT token
    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, message: "Error: " + error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Verify password (skip if user registered via Google)
    if (!user.isGoogle) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.json({ success: false, message: "Invalid credentials" });
      }
    }

    // Create token
    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, message: "Error: " + error.message });
  }
};

// Google Login
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Find existing user or create a new one
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        name,
        email,
        password: "",        // No password needed for Google accounts
        isGoogle: true,
        cartData: {},
      });
    }

    // Generate JWT token
    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Google authentication failed" });
  }
};