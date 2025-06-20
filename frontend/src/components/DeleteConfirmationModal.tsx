import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onDelete: () => void;
    itemName: string;
    deleting?: boolean;
  }
  

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onHide,
  onDelete,
  itemName,
  
}) => {

    const [deleting] = useState(false);
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="sm"
      className="modal-full"
      dialogClassName="modal-container"
      center
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p className="text-center">
          Are you sure you want to delete <strong>{itemName}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>
          Discard
        </Button>
        <Button variant="danger" onClick={onDelete} disabled={deleting}>
            {deleting ? <Spinner size="sm" animation="border" /> : "Delete"}
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
