import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface AddSellerModalProps {
  show: boolean;
  onHide: () => void;
  onCreateUser: (formData: unknown) => Promise<void>;
  loading: boolean;
}

const AddSellerModal: React.FC<AddSellerModalProps> = ({ show, onHide, onCreateUser, loading }) => {
  const [formData, setFormData] = useState({
    sellerName: "",
    sellerEmail: "",
    password: "",
    sellerPhone: "",
    distribution: ""
  });

  const [errors, setErrors] = useState({
          sellerName: "",
          sellerPhone: "",
          sellerEmail: "",
          password: "",
          distribution: "",
        });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
        const newErrors: typeof errors = { sellerEmail: "", sellerPhone: "", password: "", sellerName: "", distribution: ""};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /255\d{9}$/;
    
        if (!formData.sellerEmail) {
          newErrors.sellerEmail = "Email is required.";
        } else if (
          !emailRegex.test(formData.sellerEmail)
        ) {
          newErrors.sellerEmail = "Enter a valid email.";
        }
    
        if (!formData.sellerName) {
          newErrors.sellerName = "Name is required.";
        }

        if (!formData.distribution) {
          newErrors.distribution = "Role is required.";
        }

        if (!formData.sellerPhone) {
          newErrors.sellerPhone = "Phone No. is required.";
        }else if (
          !phoneRegex.test(formData.sellerPhone)
        ) {
          newErrors.sellerPhone = "Enter a valid phone number.";
        }

        if (!formData.password) {
          newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
      };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const form = new FormData();
    form.append("item_name", formData.sellerName);
    form.append("item_category", formData.sellerEmail);
    form.append("item_description", formData.sellerPhone);
    form.append("item_price", formData.password);
    form.append("seller_name", formData.distribution);

  onCreateUser(form); // Pass FormData to parent
};


  return (
    <Modal className="modal-full" dialogClassName="modal-container" show={show} onHide={onHide} animation>
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="modal-title">Register New Seller</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Name</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleChange}
            />
            {errors.sellerName && <Form.Text className="error-texts text-danger">{errors.sellerName}</Form.Text>}
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Email</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="sellerEmail"
              value={formData.sellerEmail}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Phone No</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="sellerPhone"
              value={formData.sellerPhone}
              onChange={handleChange}
            />
            {errors.sellerPhone && <Form.Text className="error-texts text-danger">{errors.sellerPhone}</Form.Text>}
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Password</Form.Label>
            <Form.Control
              className="modal-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <Form.Text className="error-texts text-danger">{errors.password}</Form.Text>}
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Distribution</Form.Label>
            <Form.Select
              className="modal-input"
              name="distribution"
              value={formData.distribution}
              onChange={handleChange}
            >
              <option value="" disabled>Distribution Type</option>
              <option value="Wholesale">Retail</option>
              <option value="Wholesale">Wholesale</option>
            </Form.Select>
            {errors.distribution && <Form.Text className="error-texts text-danger">{errors.distribution}</Form.Text>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {loading ? <Spinner size="sm" animation="border" /> : "Register"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSellerModal;
