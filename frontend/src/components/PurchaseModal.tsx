import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

interface PurchaseModalProps {
  show: boolean;
  onHide: () => void;
  item: {
    item_name: string;
    item_price: string;
    seller_name: string;
  };
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  show,
  onHide,
  item,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    network: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    network: "",
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = { email: "", phone: "", network: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+255\d{9}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must start with +255 and have 13 digits";
    }

    if (!formData.network) {
      newErrors.network = "Please select a network";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleBuy = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      // Simulate request
      await new Promise((res) => setTimeout(res, 2000));
      alert("Purchase completed!");
      onHide();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };


  return (
    <Modal
      show={show}
      onHide={onHide}
      className="modal-full"
      dialogClassName="modal-container"
      animation
      centered
    >
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="modal-title">Confirm Purchase</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <Form.Group className="modal-group mb-2">
            <Form.Select
              className="modal-input"
              name="network"
              value={formData.network}
              onChange={handleChange}
            >
              <option value="">Select Network</option>
              <option value="mpesa">Mpesa</option>
              <option value="tigopesa">Tigo Pesa</option>
              <option value="airtelmoney">Airtel Money</option>
              <option value="halopesa">HaloPesa</option>
            </Form.Select>
            {errors.network && <Form.Text className="text-danger">{errors.network}</Form.Text>}
          </Form.Group>

          <Form.Group className="modal-group mb-2">
            <Form.Control
              className="modal-input"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
          </Form.Group>

          <Form.Group className="modal-group mb-2">
            <Form.Control
              className="modal-input"
              name="phone"
              placeholder="Enter phone (+255...)"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <Form.Text className="text-danger">{errors.phone}</Form.Text>}
          </Form.Group>

          <Form.Group className="modal-group mb-2">
            <Form.Check
              className="modal-checkbox"
              type="checkbox"
              label={`You're about to buy ${item.item_name} for Tsh ${item.item_price.toLocaleString()} from ${item.seller_name}. Agree to buy.`}
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="warning"
          onClick={handleBuy}
          disabled={!formData.agreed || loading}
        >
          {loading ? <Spinner size="sm" animation="border" /> : "Buy"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseModal;
