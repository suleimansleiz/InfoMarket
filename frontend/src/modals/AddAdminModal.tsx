import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface NewAdmin {
  adminName: string;
  email: string;
  password: string;
  phone: string;
  role: "Super Admin" | "Other";
}
interface AddAdminModalProps {
  show: boolean;
  onHide: () => void;
  onCreateAdmin: (formData: NewAdmin) => Promise<void>;
  loading: boolean;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ show, onHide, onCreateAdmin, loading }) => {
  const [formData, setFormData] = useState<NewAdmin>({
    adminName: "",
    email: "",
    phone: "",
    password: "",
    role: "Super Admin",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NewAdmin, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewAdmin, string>> = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email.";
    if (!formData.adminName) newErrors.adminName = "Name is required.";
    if (!formData.phone.match(/^255\d{9}$/)) newErrors.phone = "Enter a valid phone number.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.role) newErrors.role = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onCreateAdmin(formData);
  };


  return (
    <Modal centered show={show} onHide={onHide} dialogClassName="modal-container" animation>
      <Modal.Header closeButton>
        <Modal.Title>Create New Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="modal-form">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              isInvalid={!!errors.adminName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.adminName}
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
              name="role"
              value={formData.role}
              onChange={handleChange}
              isInvalid={!!errors.role}
            >
              <option value="" disabled>Select Role</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.role}
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

export default AddAdminModal;
