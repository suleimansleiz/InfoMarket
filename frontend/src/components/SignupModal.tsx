// components/SignupModal.tsx
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../api/axiosConfig";

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
      }>({
        username: "",
        email: "",
        phone: "",
        password: "",
      });

      const [errors, setErrors] = useState<{
        username?: string;
        phone?: string;
        email?: string;
        password?: string;
        backend?: string;
      }>({});
  
      const validateForm = (): boolean => {
        const newErrors: { username?: string; email?: string; phone?: string; password?: string } = {};
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
        return Object.keys(newErrors).length === 0;
      };


      const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
          setErrors({});

          if (!validateForm()) return;

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
          }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



  return (
    <Modal size="sm" className="modal-full" dialogClassName="modal-container" show={show} onHide={onHide} animation>
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="modal-title">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <Form.Group className="modal-group mb-2">
            <Form.Label className="modal-label">Username</Form.Label>
            <Form.Control className="modal-input" name="username" value={formData.username} onChange={handleChange} >
              {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
            </Form.Control>
          </Form.Group>
          <Form.Group className="modal-group mb-2">
            <Form.Label className="modal-label">Email</Form.Label>
            <Form.Control className="modal-input" name="email" type="email" value={formData.email} onChange={handleChange} >
            {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
            </Form.Control>
          </Form.Group>
          <Form.Group className="modal-group mb-2">
            <Form.Label className="modal-label">Phone</Form.Label>
            <Form.Control className="modal-input" name="phone" value={formData.phone} onChange={handleChange} >
            {errors.phone && <Form.Text className="text-danger">{errors.phone}</Form.Text>}
            </Form.Control>
          </Form.Group>
          <Form.Group className="modal-group mb-2">
            <Form.Label className="modal-label">Password</Form.Label>
            <Form.Control className="modal-input" name="password" type="password" value={formData.password} onChange={handleChange} >
            {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="warning" onClick={handleSignup}>Sign Up</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupModal;