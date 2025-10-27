/* eslint-disable @typescript-eslint/no-explicit-any */
// modals/LoginModal.tsx
import React, { useState } from "react";
import api from "../api/axiosConfig";
import ModalWrapper from "../components/ModalWrapper";
import PasswordInput from "../components/PasswordInput";
import DialogMessage from "../components/DialogMessage";
import TandC from "./TandC";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

interface SignupModalProps {
  show: boolean;
  onHide: () => void;
  onSignupSuccess: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ show, onHide, onSignupSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "", username: "", phone: "", confirmPassword: "", agreed: false });
  const [errors, setErrors] = useState({ email: "", password: "", username: "", phone: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showTandCModal, setShowTandCModal] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = { email: "", password: "", username: "", phone: "", confirmPassword: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /255\d{9}$/;

    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email.";

    if (!formData.username) newErrors.username = "Username is required.";

    if (!formData.phone) { newErrors.phone = "Phone is required.";
    }else if ( !phoneRegex.test(formData.phone) ) { newErrors.phone = "Enter a valid phone number."; }

    if (!formData.password) newErrors.password = "Password is required.";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your Password.";

    if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = "Passwords don't match."; }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await api.post("/api/infomarket/v1/user/signup", formData);
        setDialogMsg(response.data);
        setDialogTitle("Welcome to InfoMarket!");
        onSignupSuccess();
        onHide();
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setDialogMsg("Please fill in the required details.");
        setDialogTitle("Careful!");
        setIsOpen(true);
      } else {
        setDialogMsg("Please check your internet connectivity and try again.");
        setDialogTitle("Oops!");
        setIsOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      show={show}
      onClose={onHide}
      title="Sign up for an account"
      footer={
        <div className="flex justify-end gap-2">
          <button onClick={onHide} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleSignUp}
            disabled={!formData.agreed || loading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </div>
      }
    >
      <div>
        <label className="block text-sm font-medium text-gray-600">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}

        <label className="block text-sm font-medium text-gray-600">Email</label>
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

      <label className="block text-sm font-medium text-gray-600">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="255 745 678 910"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-300 outline-none ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        error={errors.confirmPassword}
      />

      <div className="flex items-center mt-3">
        <input
          type="checkbox"
          name="agreed"
          checked={formData.agreed}
          onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
          id="agreed"
          className="text-green-600 cursor-pointer data-checked:bg-blue-500"
        />
        <label htmlFor="agreed" className="ml-2 text-sm text-gray-600">
          By continuing, you agree to our <a href="#" onClick={(e)=> {
            e.preventDefault();
            setShowTandCModal(true);
            }}>
              Terms & Conditions</a> and <a href="#" onClick={(e)=> {
                e.preventDefault();
                setShowPolicyModal(true);
                }}>
                  Privacy Policy</a>.
        </label>
      </div>

      <DialogMessage
        show={isOpen}
        onClose={() => setIsOpen(false)}
        dialogTitle={dialogTitle}
        message={dialogMsg}
        />

        <TandC
                show={showTandCModal}
                onHide={() => setShowTandCModal(false)}
                />

                <PrivacyPolicyModal
                show={showPolicyModal}
                onHide={() => setShowPolicyModal(false)}
                />
    </ModalWrapper>
  );
};

export default SignupModal;
