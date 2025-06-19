import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import api from "../api/axiosConfig";
import LoadingSpinner from "./LoadingSpinner";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    backend?: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger' | 'warning' | 'info' | undefined>(undefined);

  useEffect(() => {
      if (alertMsg) {
        const timer = setTimeout(() => setAlertMsg(null), 2000);
        return () => clearTimeout(timer);
      }
    }, [alertMsg]);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (
      !emailRegex.test(formData.email) &&
      !phoneRegex.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await api.post("/api/infomarket/v1/seller/auth", {
        seller_email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("seller_name", response.data.name);
      localStorage.setItem("seller_phone", response.data.phone);
      setLoading(false);
      const message = response.data.message;

      setAlertVariant('success');
        setAlertMsg(message);
        navigate("/upload-item");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);

      // Axios error with response
      if (error.response && error.response.status === 401) {
        setAlertVariant('danger');
        setAlertMsg("Invalid credentials");
      } else {
        setAlertVariant('danger');
        setAlertMsg("An error occurred while trying to sign in.");
        navigate("/upload-item");
      }

      console.error("Login error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          zIndex: 9999
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="create-account-container"
    style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        <h3 className="card-header text-center">Login</h3>
        <form className="card-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
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

          {errors.backend && (
            <div className="mb-3">
              <small className="text-danger">{errors.backend}</small>
            </div>
          )}

          <button
            type="submit"
            className="email-btn btn-primary w-100"
            disabled={loading}
          >
            Login
          </button>

          <p className="card-words mt-3">
            Forgot Password?{" "}
            <Link to="/create-account" className="card-links text-decoration-none">
              Click here
            </Link>
          </p>
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

export default LoginPage;

