import React, {  } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface EditStatusModalProps {
  show: boolean;
  onHide: () => void;
  status: string;
  onSave: (newStatus: string) => void;
  loading: boolean;
}

const EditStatusModal: React.FC<EditStatusModalProps> = ({ show, onHide, status, onSave, loading}) => {
  const [newStatus, setNewStatus] = React.useState(status);

  const handleSave = () => {
    onSave(newStatus);
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
        <Modal.Title className="modal-title">Edit Item Status</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <Form.Group>
            <Form.Check
              type="radio"
              label="Available"
              name="status"
              value="Available"
              checked={newStatus === "Available"}
              onChange={() => setNewStatus("Available")}
            />
            <Form.Check
              type="radio"
              label="Sold"
              name="status"
              value="Sold"
              checked={newStatus === "Sold"}
              onChange={() => setNewStatus("Sold")}
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

export default EditStatusModal;

