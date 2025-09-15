import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../api/axiosConfig";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../components/mini-components/ToastMessage";


interface SellerLoginModalProps {
  show: boolean;
  onHide: () => void;
  
}

const SellerLoginModal: React.FC<SellerLoginModalProps> = ({ show, onHide }) => {

  const [formData, setFormData] = useState<{
      email: string;
      password: string;
    }>({
      email: "",
      password: "",
    });
  
    const [errors, setErrors] = useState({
        email: "",
        password: "",
      });

    const [loading, setLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [toastVrt, setToastVrt] = useState("");
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();



    const validateForm = (): boolean => {
      const newErrors: typeof errors = { email: "", password: "", };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!formData.email) {
        newErrors.email = "Email is required.";
      } else if (
        !emailRegex.test(formData.email)
      ) {
        newErrors.email = "Enter a valid email.";
      }
  
      if (!formData.password) {
        newErrors.password = "Password is required.";
      }
  
      setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);

    };


  const handleLogin = async () => {
        if (!validateForm()) return;
        setLoading(true);

        try {
          const response = await api.post("/api/infomarket/v1/seller/auth", {
            seller_email: formData.email,
            password: formData.password,
          });

        localStorage.setItem("seller_name", response.data.name);
        localStorage.setItem("seller_phone", response.data.phone);

          navigate("/upload-item");
          onHide();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            setToastMsg("Invalid credentials");
            setToastVrt("warning");
            setShowToast(true);
          } else {
            setToastMsg("An error occured, try again later");
            setToastVrt("danger");
            setShowToast(true);
            navigate("/upload-item");
            onHide();
          }
          console.error("Login error:", error);
        } finally {
          setLoading(false);
        }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

  return (
    <>
    <Modal size="sm" className="modal-full" dialogClassName="modal-container" show={show} onHide={onHide} animation>
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="modal-title">Login as Seller</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Email</Form.Label>
            <Form.Control className="modal-input" type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <Form.Text className="error-texts text-danger">{errors.email}</Form.Text>}
          </Form.Group>
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Password</Form.Label>
            <Form.Control className="modal-input" type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <Form.Text className="error-texts text-danger">{errors.password}</Form.Text>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleLogin}>
        {loading ? <Spinner size="sm" animation="border" /> : "Login"}
        </Button>
      </Modal.Footer>
    </Modal>
    <ToastMessage
          show={showToast}
          onClose={() => setShowToast(false)}
          message={toastMsg}
          variant={toastVrt}
    />
    </>
  );
};

export default SellerLoginModal;
