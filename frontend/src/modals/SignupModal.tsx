// components/SignupModal.tsx
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../api/axiosConfig";
import { Spinner } from "react-bootstrap";

interface SignupModalProps {
  show: boolean;
  onHide: () => void;
  onSignupSuccess: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ show, onHide, onSignupSuccess }) => {

  const [formData, setFormData] = useState<{
        username: string;
        email: string;
        phone: string;
        password: string;
        agreed: boolean
      }>({
        username: "",
        email: "",
        phone: "",
        password: "",
        agreed: false,
      });

      const [errors, setErrors] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
      });

      const [loading, setLoading] = useState(false);
  
      const validateForm = (): boolean => {
        const newErrors: typeof errors = { email: "", phone: "", password: "", username: "", };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+255\d{9}$/;
    
        if (!formData.email) {
          newErrors.email = "Email is required.";
        } else if (
          !emailRegex.test(formData.email)
        ) {
          newErrors.email = "Enter a valid email.";
        }
    
        if (!formData.username) {
          newErrors.username = "Name is required.";
        }

        if (!formData.phone) {
          newErrors.phone = "Phone is required.";
        }else if (
          !phoneRegex.test(formData.email)
        ) {
          newErrors.email = "Enter a valid phone number.";
        }

        if (!formData.password) {
          newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
      };


      const handleSignup = async () => {
          if (!validateForm()) return;
          setLoading(true)

          try {
            const response = await api.post("/api/infomarket/v1/user/signup", {
              username: formData.username,
              email: formData.email,
              Phone: formData.phone,
              password: formData.password,
            });

            alert(response.data);
            onSignupSuccess();
            onHide();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            // Axios error with response
            if (error.response && error.response.status === 401) {
              alert("Invalid Credentials");
            } else {
              alert("An error occurred while trying to Log in.");
            }
            console.error("Login error:", error);
          } finally {
            setLoading(false);
          }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value,type } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
        }));
    };



  return (
    <Modal  className="modal-full" dialogClassName="modal-container" show={show} onHide={onHide} animation>
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="modal-title">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <Form.Group className="modal-group mb-2">
            <Form.Label className="modal-label">Username</Form.Label>
            <Form.Control className="modal-input" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <Form.Text className="error-texts text-danger">{errors.username}</Form.Text>}
          </Form.Group>
          <Form.Group className="modal-group mb-2">
            <Form.Label className="modal-label">Email</Form.Label>
            <Form.Control className="modal-input" name="email" type="email" value={formData.email} onChange={handleChange} />
            {errors.email && <Form.Text className="error-texts text-danger">{errors.email}</Form.Text>}
          </Form.Group>
          <Form.Group className="modal-group mb-2">
            <Form.Label className="modal-label">Phone</Form.Label>
            <Form.Control className="modal-input" name="phone" placeholder="+255..." value={formData.phone} onChange={handleChange} />
            {errors.phone && <Form.Text className="error-texts text-danger">{errors.phone}</Form.Text>}
          </Form.Group>
          <Form.Group className="modal-group mb-2">
            <Form.Label className="modal-label">Password</Form.Label>
            <Form.Control className="modal-input" name="password" type="password" value={formData.password} onChange={handleChange} />
            {errors.password && <Form.Text className="error-texts text-danger">{errors.password}</Form.Text>}
          </Form.Group>
          <Form.Group className="modal-group mb-2">
            <Form.Check
              className="modal-checkbox"
              type="checkbox"
              label={`By continuing, you agree to our Terms and Conditions and Privacy Policy.`}
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="warning" onClick={handleSignup} disabled={!formData.agreed || loading}>
        {loading ? <Spinner size="sm" animation="border" /> : "Sign Up"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupModal;
