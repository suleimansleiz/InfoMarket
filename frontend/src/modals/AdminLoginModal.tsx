/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import api from "../api/axiosConfig";
import DialogMessage from "../components/DialogMessage";
import PasswordInput from "../components/PasswordInput";
import ModalWrapper from "../components/ModalWrapper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


interface AdminLoginModalProps {
  show: boolean;
  onHide: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ show, onHide }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [dialogMsg, setDialogMsg] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateForm = (): boolean => {
      const newErrors = { email: "", password: "" };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!formData.email) newErrors.email = "Email is required.";
      else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email.";

      if (!formData.password) newErrors.password = "Password is required.";

      setErrors(newErrors);
      return !Object.values(newErrors).some(Boolean);
    };

    const handleLogin = async (role: "admin") => {
      if (!validateForm()) return;
      login(role);
      setLoading(true);

      try {
        const response = await api.post("/api/infomarket/v1/admin/auth", formData);
        localStorage.setItem("adminName", response.data.name);
        localStorage.setItem("adminRole", response.data.role);

          navigate("/admin/dashboard");
          onHide();
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setDialogMsg("Invalid credentials. Are you sure you are an Admin?.");
          setDialogTitle("Careful!");
          setIsOpen(true);
        } else {
          setDialogMsg("Please check your internet connectivity and try again.");
          setDialogTitle("Oops!");
          setIsOpen(true);
          navigate("/admin/dashboard");
          onHide();
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
    <ModalWrapper
          show={show}
          onClose={onHide}
          title="Sign in as Admin"
          footer={
            <div className="flex justify-end gap-2">
              <button onClick={onHide} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer">
                Cancel
              </button>
              <button
                onClick={()=> handleLogin("admin")}
                disabled={loading}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          }
        >
          <div>
            <label className="block text-start text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <label className="block text-start text-sm font-medium text-gray-600">Password</label>
          <PasswordInput
            label=""
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
    </>
  );
};

export default AdminLoginModal;
