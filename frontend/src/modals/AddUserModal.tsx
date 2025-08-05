import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface AddUserModalProps {
  show: boolean;
  onHide: () => void;
  onCreateUser: (formData: unknown) => Promise<void>;
  loading: boolean;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ show, onHide, onCreateUser, loading }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    userClass: ""
  });

  const [errors, setErrors] = useState({
          username: "",
          phone: "",
          email: "",
          password: "",
          userClass: "",
        });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
        const newErrors: typeof errors = { email: "", phone: "", password: "", username: "", userClass: ""};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /255\d{9}$/;
    
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

        if (!formData.userClass) {
          newErrors.userClass = "Role is required.";
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

  const handleSubmit = () => {
    if (!validateForm()) return;

    const form = new FormData();
    form.append("item_name", formData.username);
    form.append("item_category", formData.email);
    form.append("item_description", formData.phone);
    form.append("item_price", formData.password);
    form.append("seller_name", formData.userClass);

  onCreateUser(form); // Pass FormData to parent
};


  return (
    <Modal className="modal-full" dialogClassName="modal-container" show={show} onHide={onHide} animation>
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="modal-title">Register New User</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Name</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <Form.Text className="error-texts text-danger">{errors.username}</Form.Text>}
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Email</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Phone No</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <Form.Text className="error-texts text-danger">{errors.phone}</Form.Text>}
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
            <Form.Label className="modal-label">Role</Form.Label>
            <Form.Select
              className="modal-input"
              name="userClass"
              value={formData.userClass}
              onChange={handleChange}
            >
              <option value="" disabled>Assign Class</option>
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
            </Form.Select>
            {errors.userClass && <Form.Text className="error-texts text-danger">{errors.userClass}</Form.Text>}
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

export default AddUserModal;
