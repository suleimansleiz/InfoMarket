import React, {  } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

interface AdminItemDeleteModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  loading: boolean,
  title: string;
  message: string;
}

const AdminItemDeleteModal: React.FC<AdminItemDeleteModalProps> = ({ show, onHide, onConfirm, loading, title, message }) => {

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
        {message}
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
        {loading ? <Spinner size="sm" animation="border" /> : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminItemDeleteModal;

