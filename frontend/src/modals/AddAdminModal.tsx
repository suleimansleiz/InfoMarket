import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface AddAdminModalProps {
  show: boolean;
  onHide: () => void;
  onCreateAdmin: (formData: unknown) => Promise<void>;
  loading: boolean;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ show, onHide, onCreateAdmin, loading }) => {
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    password: "",
    phone: "",
    role: ""
  });

  const [errors, setErrors] = useState({
          adminName: "",
          phone: "",
          email: "",
          password: "",
          role: "",
        });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
        const newErrors: typeof errors = { email: "", phone: "", password: "", adminName: "", role: ""};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /255\d{9}$/;
    
        if (!formData.email) {
          newErrors.email = "Email is required.";
        } else if (
          !emailRegex.test(formData.email)
        ) {
          newErrors.email = "Enter a valid email.";
        }
    
        if (!formData.adminName) {
          newErrors.adminName = "Name is required.";
        }

        if (!formData.role) {
          newErrors.role = "Role is required.";
        }

        if (!formData.phone) {
          newErrors.phone = "Phone No. is required.";
        }else if (
          !phoneRegex.test(formData.phone)
        ) {
          newErrors.phone = "Enter a valid phone number.";
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
    form.append("item_name", formData.adminName);
    form.append("item_category", formData.email);
    form.append("item_description", formData.phone);
    form.append("item_price", formData.password);
    form.append("seller_name", formData.role);

  onCreateAdmin(form); // Pass FormData to parent
};


  return (
    <Modal className="modal-full" dialogClassName="modal-container" show={show} onHide={onHide} animation>
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="modal-title">Create New Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Name</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
            />
            {errors.adminName && <Form.Text className="error-texts text-danger">{errors.adminName}</Form.Text>}
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
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" disabled>Select Role</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Executive Admin">Executive Admin</option>
              <option value="Sales Admin">Sales Admin</option>
            </Form.Select>
            {errors.role && <Form.Text className="error-texts text-danger">{errors.role}</Form.Text>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {loading ? <Spinner size="sm" animation="border" /> : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAdminModal;
