import express from "express";
import {
  registerUser,
  loginUser,
} from "../../Backend/controllers/authController.js";

const router = express.Router();

// Define routes
router.post("/register", (req, res) => registerUser(req, res));
router.post("/login", (req, res) => loginUser(req, res));

export default router;
