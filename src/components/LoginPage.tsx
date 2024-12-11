import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  }>({}); // Properties are now optional

  const validateForm = (): boolean => {
    const newErrors: { emailOrPhone?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^255\d{9}$/;

    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = "Email or phone number is required.";
    } else if (
      !emailRegex.test(formData.emailOrPhone) &&
      !phoneRegex.test(formData.emailOrPhone)
    ) {
      newErrors.emailOrPhone =
        "Enter a valid email or a phone number starting with 255 and 12 digits.";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Login successful!");
      navigate("/upload-item"); // Navigate to UploadItem
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
            // style={{ backgroundColor: "#ff5733" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;



