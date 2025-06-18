"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// Helper function for sending responses
function handleResponse(req, res, message, statusCode = 200) {
    res.status(statusCode).json({ message });
}
// Route handler for login
router.post("/", (req, res) => {
    const { emailOrPhone, password } = req.body;
    // Find the user by email or phone number
    User_1.default.findOne({ $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }] })
        .then((user) => {
        if (!user) {
            handleResponse(req, res, "Invalid email or phone number.", 400);
            return;
        }
        // Compare password
        bcrypt_1.default.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                handleResponse(req, res, "Server error. Please try again later.", 500);
                return;
            }
            if (!isMatch) {
                handleResponse(req, res, "Invalid password.", 400);
                return;
            }
            handleResponse(req, res, "Login successful!");
        });
    })
        .catch((error) => {
        console.error("Error logging in:", error);
        handleResponse(req, res, "Server error. Please try again later.", 500);
    });
});
exports.default = router;
