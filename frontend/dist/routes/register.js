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
// Route handler for user registration
router.post("/", (req, res) => {
    const { fullName, email, phoneNumber, password } = req.body;
    // Check if the user already exists
    User_1.default.findOne({ email })
        .then((existingUser) => {
        if (existingUser) {
            handleResponse(req, res, "Email already in use.", 400);
            return;
        }
        // Hash the password
        bcrypt_1.default.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing password:", err);
                handleResponse(req, res, "Server error. Please try again later.", 500);
                return;
            }
            // Create and save user
            const newUser = new User_1.default({
                fullName,
                email,
                phoneNumber,
                password: hashedPassword,
            });
            newUser
                .save()
                .then(() => {
                handleResponse(req, res, "Account created successfully!", 201);
            })
                .catch((error) => {
                console.error("Error saving user:", error);
                handleResponse(req, res, "Server error. Please try again later.", 500);
            });
        });
    })
        .catch((error) => {
        console.error("Error checking user existence:", error);
        handleResponse(req, res, "Server error. Please try again later.", 500);
    });
});
exports.default = router;
