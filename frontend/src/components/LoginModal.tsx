import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../api/axiosConfig";

interface LoginModalProps {
  show: boolean;
  onHide: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onHide, onLoginSuccess }) => {

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


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
        setErrors({});
    
        if (!validateForm()) return;
    
        try {
          const response = await api.post("/api/infomarket/v1/user/auth", {
            email: formData.email,
            password: formData.password,
          });

          localStorage.setItem("seller_name", response.data.name);
          localStorage.setItem("seller_phone", response.data.phone);

          const message = response.data;

          localStorage.setItem("user", message.name);
          onLoginSuccess();
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
        <Modal.Title className="modal-title">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Email</Form.Label>
            <Form.Control className="modal-input" type="email" name="email" value={formData.email} onChange={handleChange} >
              {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
            </Form.Control>
          </Form.Group>
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Password</Form.Label>
            <Form.Control className="modal-input" type="password" name="password" value={formData.password} onChange={handleChange} >
              {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleLogin}>Login</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
