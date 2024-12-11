import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount: React.FC = () => {
      const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const { fullName, email, phoneNumber, password, confirmPassword } = formData;

    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^(255\d{9})$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must start with 255 and be 12 digits.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}/.test(password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include upper and lowercase letters, a number, and a special character.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        navigate("/sell-your-item");
      alert("Account created successfully! Please log in.");
    }
  };

  return (
    <div className="create-account-container">
      <div className="card create-account-card">
        <h3 className="text-center">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.phoneNumber && (
              <small className="text-danger">{errors.phoneNumber}</small>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
          </div>
          <button type="submit" className="btn submit-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
