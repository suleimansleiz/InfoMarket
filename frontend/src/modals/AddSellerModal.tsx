import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";


interface NewSeller {
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  password: string;
  distribution: "Retail" | "Wholesale";
}

interface AddUserModalProps {
  show: boolean;
  onHide: () => void;
  onCreateSeller: (formData: NewSeller) => Promise<void>;
  loading: boolean;
}

const AddSellerModal: React.FC<AddUserModalProps> = ({ show, onHide, onCreateSeller, loading }) => {
  const [formData, setFormData] = useState<NewSeller>({
    sellerName: "",
    sellerEmail: "",
    sellerPhone: "",
    password: "",
    distribution: "Retail",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NewSeller, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewSeller, string>> = {};
    if (!formData.sellerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.sellerEmail = "Enter a valid email.";
    if (!formData.sellerName) newErrors.sellerName = "Name is required.";
    if (!formData.sellerPhone.match(/^255\d{9}$/)) newErrors.sellerPhone = "Enter a valid phone number.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.distribution) newErrors.distribution = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onCreateSeller(formData);
  };


  return (
    <Modal centered show={show} onHide={onHide} dialogClassName="modal-container">
  <Modal.Header closeButton>
    <Modal.Title>Register New Seller</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form className="modal-form">
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="sellerName"
          value={formData.sellerName}
          onChange={handleChange}
          isInvalid={!!errors.sellerName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.sellerName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="sellerEmail"
          value={formData.sellerEmail}
          onChange={handleChange}
          isInvalid={!!errors.sellerEmail}
        />
        <Form.Control.Feedback type="invalid">
          {errors.sellerEmail}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone No</Form.Label>
        <Form.Control
          type="text"
          name="sellerPhone"
          value={formData.sellerPhone}
          onChange={handleChange}
          isInvalid={!!errors.sellerPhone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.sellerPhone}
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
        <Form.Label>Distribution</Form.Label>
        <Form.Select
          name="distribution"
          value={formData.distribution}
          onChange={handleChange}
          isInvalid={!!errors.distribution}
        >
          <option value="" disabled>Distribution type</option>
          <option value="Retail">Retail</option>
          <option value="Wholesale">Wholesale</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.distribution}
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
