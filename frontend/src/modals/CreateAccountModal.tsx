import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../api/axiosConfig";
import { Spinner } from "react-bootstrap";
import ToastMessage from "../components/mini-components/ToastMessage";
import SellerLoginModal from "./SellerLoginModal";


interface CreateAccountModalProps {
  show: boolean;
  onHide: () => void;
  
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({ show, onHide }) => {

  const [formData, setFormData] = useState<{
    seller_name: string;
    seller_email: string;
    seller_phone: string;
    password: string;
    confirmPassword: string;
    agreed: boolean,
    }>({
    seller_name: "",
    seller_email: "",
    seller_phone: "",
    password: "",
    confirmPassword: "",
    agreed: false,
    });
  
    const [errors, setErrors] = useState({
    seller_name: "",
    seller_email: "",
    seller_phone: "",
    password: "",
    confirmPassword: "",
      });

    const [loading, setLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [toastVrt, setToastVrt] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showSellerLoginModal, setShowSellerLoginModal] = useState(false);

    const validateForm = (): boolean => {
      const newErrors: typeof errors = {
          seller_name: "",
          seller_email: "",
          password: "",
          seller_phone: "",
          confirmPassword: "",
      };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!formData.seller_email) {
        newErrors.seller_email = "Email is required.";
      } else if (
        !emailRegex.test(formData.seller_email)
      ) {
        newErrors.seller_email = "Enter a valid email.";
      }
  
      if (!formData.seller_name) {
        newErrors.seller_name = "Name is required.";
      }

      if (!formData.seller_phone.trim()) {
      newErrors.seller_phone = "Phone number is required.";
    } else if (!/255\d{9}$/.test(formData.seller_phone)) {
      newErrors.seller_phone = "Phone number must start with 255 and be 12 digits.";
    }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm password";
      }

      if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include upper and lowercase letters, a number, and a special character.";
    }

      if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match.";
    }
  
      setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);

    };


  const handleRegistration = async () => {
        if (!validateForm()) return;
        setLoading(true);

        try {
        await api.post("/api/infomarket/v1/seller/signup", {
            seller_name: formData.seller_name,
            seller_email: formData.seller_email,
            seller_phone: formData.seller_phone,
            password: formData.password,
          });

        setShowSellerLoginModal(true);
        onHide();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setToastMsg("An error occured, try again later");
            setToastVrt("danger");
            setShowToast(true);
            setShowSellerLoginModal(true);
            onHide();
          console.error("Registration error:", error);
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
    <Modal className="modal-full" dialogClassName="modal-container" show={show} onHide={onHide} animation>
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="modal-title">Register Seller Account</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
            <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Name</Form.Label>
            <Form.Control className="modal-input" type="text" name="seller_name" value={formData.seller_name} onChange={handleChange} />
            {errors.seller_name && <Form.Text className="error-texts text-danger">{errors.seller_name}</Form.Text>}
          </Form.Group>
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Email</Form.Label>
            <Form.Control className="modal-input" type="email" name="seller_email" value={formData.seller_email} onChange={handleChange} />
            {errors.seller_email && <Form.Text className="error-texts text-danger">{errors.seller_email}</Form.Text>}
          </Form.Group>
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Phone</Form.Label>
            <Form.Control className="modal-input" type="text" name="seller_phone" value={formData.seller_phone} onChange={handleChange} />
            {errors.seller_phone && <Form.Text className="error-texts text-danger">{errors.seller_phone}</Form.Text>}
          </Form.Group>
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Password</Form.Label>
            <Form.Control className="modal-input" type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <Form.Text className="error-texts text-danger">{errors.password}</Form.Text>}
          </Form.Group>
          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Confirm Password</Form.Label>
            <Form.Control className="modal-input" type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <Form.Text className="error-texts text-danger">{errors.password}</Form.Text>}
          </Form.Group>
          <Form.Group className="modal-group mb-2">
                      <Form.Check
                        className="modal-checkbox"
                        type="checkbox"
                        label={`By continuing, you agree to our Terms and Conditions and Privacy Policy.`}
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleChange}
                      />
                    </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleRegistration} disabled={!formData.agreed || loading}>
        {loading ? <Spinner size="sm" animation="border" /> : "Register"}
        </Button>
      </Modal.Footer>
    </Modal>
    <ToastMessage
          show={showToast}
          onClose={() => setShowToast(false)}
          message={toastMsg}
          variant={toastVrt}
    />
    <SellerLoginModal
        show={showSellerLoginModal}
        onHide={() => {
          setShowSellerLoginModal(false);
        }  }
      />
    </>
  );
};

export default CreateAccountModal;
