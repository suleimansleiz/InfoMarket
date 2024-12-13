import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebaseConfig";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    emailOrPhone: string;
    password: string;
  }>({
    emailOrPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    emailOrPhone?: string;
    password?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { emailOrPhone?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = "Email or phone number is required.";
    } else if (!emailRegex.test(formData.emailOrPhone)) {
      newErrors.emailOrPhone = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const { emailOrPhone, password } = formData;

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, emailOrPhone, password);
      console.log("User logged in:", userCredential.user);
      alert("Login successful!");
      navigate("/upload-item");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors({ emailOrPhone: "Invalid email or password." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="create-account-container">
      <div className="card create-account-card">
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter email or Phone Number"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
            />
            {errors.emailOrPhone && (
              <small className="text-danger">{errors.emailOrPhone}</small>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <button
            type="submit"
            className="email-btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p>
            Forgot Password?{" "}
            <Link to="/create-account" className="text-decoration-none">
              Click here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;




