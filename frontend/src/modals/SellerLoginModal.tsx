/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import DialogMessage from "../components/DialogMessage";
import ModalWrapper from "../components/ModalWrapper";
import PasswordInput from "../components/PasswordInput";
import { useAuth } from "../auth/AuthContext";

interface SellerLoginModalProps {
  show: boolean;
  onHide: () => void;
}

const SellerLoginModal: React.FC<SellerLoginModalProps> = ({ show, onHide }) => {
  const [formData, setFormData] = useState({ seller_email: "", password: "" });
  const [errors, setErrors] = useState({ seller_email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = (): boolean => {
    const newErrors = { seller_email: "", password: "" };
    if (!formData.seller_email) newErrors.seller_email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleLogin = async (role: "seller") => {
    if (!validateForm()) return;
    login(role);
    setLoading(true);
    try {
      const response = await api.post("/api/infomarket/v1/seller/auth", formData);
      localStorage.setItem("seller_name", response.data.name);
      localStorage.setItem("seller_phone", response.data.phone);
      navigate("/seller");
      onHide();
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setDialogMsg("Invalid credentials. Please try again.");
        setDialogTitle("Careful!");
        setIsOpen(true);
      } else {
        setDialogMsg("Please check your internet connectivity and try again.");
        setDialogTitle("Oops!");
        setIsOpen(true);
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      show={show}
      onClose={onHide}
      title="Sign in as Seller"
      footer={
        <div className="flex justify-end gap-2">
          <button onClick={onHide} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={()=>handleLogin("seller")}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      }
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={formData.seller_email}
          onChange={(e) => setFormData({ ...formData, seller_email: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
            errors.seller_email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.seller_email && <p className="text-xs text-red-500">{errors.seller_email}</p>}
      </div>

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
      />

      <DialogMessage
      show={isOpen}
      onClose={() => setIsOpen(false)}
      dialogTitle={dialogTitle}
      message={dialogMsg}
      />
    </ModalWrapper>
  );
};

export default SellerLoginModal;
