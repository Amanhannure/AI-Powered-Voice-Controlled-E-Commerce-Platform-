import express from "express";
import { registerUser, loginUser, googleLogin } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import userModel from "../models/user.model.js";


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/google-login", googleLogin);
userRouter.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default userRouter;

