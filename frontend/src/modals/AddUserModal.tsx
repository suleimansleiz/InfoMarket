import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface NewUser {
  username: string;
  email: string;
  phone: string;
  password: string;
  userClass: "Regular" | "VIP";
}
interface AddUserModalProps {
  show: boolean;
  onHide: () => void;
  onCreateUser: (formData: NewUser) => Promise<void>;
  loading: boolean;
}

const AddSellerModal: React.FC<AddUserModalProps> = ({ show, onHide, onCreateUser, loading }) => {
  const [formData, setFormData] = useState<NewUser>({
    username: "",
    email: "",
    phone: "",
    password: "",
    userClass: "Regular",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NewUser, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewUser, string>> = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email.";
    if (!formData.username) newErrors.username = "Name is required.";
    if (!formData.phone.match(/^255\d{9}$/)) newErrors.phone = "Enter a valid phone number.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.userClass) newErrors.userClass = "Class is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onCreateUser(formData);
  };


  return (
    <Modal centered show={show} onHide={onHide} dialogClassName="modal-container">
  <Modal.Header closeButton>
    <Modal.Title>Register New User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form className="modal-form">
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type="invalid">
          {errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone No</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          isInvalid={!!errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Class</Form.Label>
        <Form.Select
          name="userClass"
          value={formData.userClass}
          onChange={handleChange}
          isInvalid={!!errors.userClass}
        >
          <option value="" disabled>Select class</option>
          <option value="Regular">Regular</option>
          <option value="VIP">VIP</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.userClass}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={onHide} disabled={loading}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSubmit} disabled={loading}>
      {loading ? <Spinner animation="border" size="sm" /> : "Register"}
    </Button>
  </Modal.Footer>
</Modal>
  );
};

export default AddSellerModal;