import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    const { password, confirmPassword } = formData;

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
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [alertType, setAlertType] = useState<"success" | "danger" | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
        if (validateForm()) {
            setAlertType("success");
      setAlertMessage("Password changed successfully!");
      navigate("/login");
    }
    } else {
      setAlertType("danger");
      setAlertMessage("Failed to change password. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="create-account-container">
        {alertType && (
        <div
          className={`alert upload-item-alert alert-${alertType} alert-dismissible fade show`}
          role="alert"
        >
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setAlertType(null)} // Hide alert on close
          ></button>
        </div>
      )}
      <div className="card create-account-card">
        <h3 className="text-center">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
          </div>
          <button
            type="submit"
            className="email-btn btn-primary w-100"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;