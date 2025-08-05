/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface AddItemModalProps {
  show: boolean;
  onHide: () => void;
  onAddItem: (formData: any) => Promise<void>;
  loading: boolean;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ show, onHide, onAddItem, loading }) => {
  const [formData, setFormData] = useState({
    item_name: "",
    itemCategory: "",
    item_description: "",
    item_price: "",
    item_photo: "",
    seller_name: "",
    sellerPhone: ""
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
  const form = new FormData();
  form.append("item_name", formData.item_name);
  form.append("item_category", formData.itemCategory);
  form.append("item_description", formData.item_description);
  form.append("item_price", formData.item_price);
  form.append("seller_name", formData.seller_name);
  form.append("seller_phone", formData.sellerPhone);
  if (selectedFile) {
    form.append("item_photo", selectedFile);
  }

  onAddItem(form); // Pass FormData to parent
};


  return (
    <Modal className="modal-full" dialogClassName="modal-container" show={show} onHide={onHide} animation>
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title className="modal-title">Add New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
            <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Image</Form.Label>
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
            <Form.Label className="modal-label">Item Name</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Category</Form.Label>
            <Form.Select
              className="modal-input"
              name="itemCategory"
              value={formData.itemCategory}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Accessories">Accessories</option>
              <option value="Bags">Bags</option>
              <option value="Computers">Computers</option>
              <option value="Curtains">Curtains</option>
              <option value="Phones">Phones</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Description</Form.Label>
            <Form.Control
              className="modal-input"
              as="textarea"
              rows={3}
              name="item_description"
              value={formData.item_description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Price</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="item_price"
              value={formData.item_price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Seller Name</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="seller_name"
              value={formData.seller_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="modal-group mb-3">
            <Form.Label className="modal-label">Seller Phone</Form.Label>
            <Form.Control
              className="modal-input"
              type="text"
              name="sellerPhone"
              value={formData.sellerPhone}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {loading ? <Spinner size="sm" animation="border" /> : "Add Item"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemModal;
