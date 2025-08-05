import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface EditPersonelModalProps {
  show: boolean;
  onHide: () => void;
  userClass: string;
  onSave: (newClass: string, formData: unknown) => void;
  loading: boolean;
  title: string;
  formData: {
    username: string;
    phone: string;
    password: string;
    profilePicture: string;
  };
}

const EditPersonelModal: React.FC<EditPersonelModalProps> = ({ show, onHide, userClass, onSave, loading, title, formData: initialFormData }) => {

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

  const [newClass, setNewClass] = React.useState(userClass);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSave = () => {
    const form = new FormData();
      form.append("username", formData.username);
      form.append("phone", formData.phone);
      form.append("password", formData.password);
      form.append("profilePicture", formData.profilePicture);
      if (selectedFile) {
        form.append("profilePicture", selectedFile);
      }

    onSave(newClass, formData);
    onHide();
  };

  return (
    <Modal
      size="sm"
      className="modal-full"
      dialogClassName="modal-container"
      show={show}
      onHide={onHide}
      animation
      centered
    >
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="modal-title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Change Profile</Form.Label>
                <Form.Control
                    className="modal-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                        setSelectedFile(file);
                    }
                    }}
                />
          </Form.Group>
          <Form.Group className="modal-group mb-3">
              <Form.Label className="modal-label">User Name</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>
          <Form.Group className="modal-group mb-3">
              <Form.Label className="modal-label">Phone No.</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
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
              </Form.Group>
          <Form.Group>
            <Form.Label className="modal-label">User Class</Form.Label>
            <Form.Check
              type="radio"
              label="Regular"
              name="class"
              value="Regular"
              checked={newClass === "Regular"}
              onChange={() => setNewClass("Regular")}
            />
            <Form.Check
              type="radio"
              label="vip"
              name="class"
              value="vip"
              checked={newClass === "VIP"}
              onChange={() => setNewClass("VIP")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>
        {loading ? <Spinner size="sm" animation="border" /> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPersonelModal;
