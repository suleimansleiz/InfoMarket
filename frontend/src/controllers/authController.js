"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../src/models/User")); // User model
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Ensure you set this in a .env file
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, phoneNumber, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }
        // Hash the password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // Create and save the new user
        const newUser = new User_1.default({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});
exports.registerUser = registerUser;
// Login a user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailOrPhone, password } = req.body;
    try {
        // Find the user by email or phone number
        const user = yield User_1.default.findOne({
            $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or phone number." });
        }
        // Check if the password matches
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password." });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});
exports.loginUser = loginUser;
