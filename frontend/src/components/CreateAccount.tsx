import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import api from "../api/axiosConfig";

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    seller_name: string;
    seller_email: string;
    seller_phone: string;
    password: string;
    confirmPassword: string;
  }>({
    seller_name: "",
    seller_email: "",
    seller_phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
    const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | 'warning' | 'info' | undefined>(undefined);
  
    useEffect(() => {
        if (alertMsg) {
          const timer = setTimeout(() => setAlertMsg(null), 2000);
          return () => clearTimeout(timer);
        }
      }, [alertMsg]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const { seller_name, seller_email, seller_phone, password, confirmPassword } = formData;

    if (!seller_name.trim()) newErrors.seller_name = "Full name is required.";
    if (!seller_email.trim()) newErrors.seller_email = "Email is required.";
    if (!seller_phone.trim()) {
      newErrors.seller_phone = "Phone number is required.";
    } else if (!/^\+255\d{9}$/.test(seller_phone)) {
      newErrors.seller_phone = "Phone number must start with +255 and be 12 digits.";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // clear previous errors

    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await api.post("/api/infomarket/v1/seller/signup", {
        seller_name: formData.seller_name,
        seller_email: formData.seller_email,
        seller_phone: formData.seller_phone,
        password: formData.password,
      });

      const message = response.data;

      setAlertVariant('success');
        setAlertMsg(message);
        navigate("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        // Handle validation or other backend errors here if backend returns details
        setAlertVariant('warning');
        setAlertMsg("An error occurred.");
      } else {
        setAlertVariant('warning');
        setAlertMsg("An error occurred while trying to create your account.");
      }
      console.error("Create account error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account-container">
      <div className="topbar d-flex align-items-center p-3">
              <div className="topbar-middle d-flex align-items-center">
                {alertMsg && (
                          <Alert
                            variant={alertVariant}
                            onClose={() => setAlertMsg(null)}
                            className="mt-3"
                          >
                            {alertMsg}
                          </Alert>
                        )}
              </div>
            </div>
      <div className="card create-account-card">
        <h3 className="card-header text-center">Create Account</h3>
        <form className="card-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="seller_name"
              placeholder="Full Name"
              value={formData.seller_name}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.seller_name && <small className="text-danger">{errors.seller_name}</small>}
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="seller_email"
              placeholder="Email"
              value={formData.seller_email}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.seller_email && <small className="text-danger">{errors.seller_email}</small>}
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="seller_phone"
              placeholder="Phone Number ie. +255..."
              value={formData.seller_phone}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.seller_phone && (
              <small className="text-danger">{errors.seller_phone}</small>
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

          {/* Backend general error */}
          {errors.backend && (
            <div className="mb-3">
              <small className="text-danger">{errors.backend}</small>
            </div>
          )}

          <button type="submit" className="btn submit-btn" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Create Account"}
          </button>
        </form>
      </div>
      <footer className="copyRight mt-auto p-3 text-center">
        <p>
            Copyright © 2025 <b><a href="/home">InfoMarket.</a></b> Developed and
            maintained by <b><a href="#">SleizWare Development.</a></b> All
            rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default CreateAccount;

