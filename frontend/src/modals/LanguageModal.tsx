import React, {  } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
  }
  

const LanguageModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onHide,
}) => {

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
        <Modal.Title className="modal-title">Language Preference</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
      <Form className="modal-form">
        <Form.Group className="modal-group d-flex">
          <Form.Label className="modal-label">
        English (us)
          </Form.Label>
          <Form.Check
        type="radio"
        className="modal-check"
        name="language"
        value="en"
        defaultChecked
          />
        </Form.Group>
        <Form.Group className="modal-group d-flex">
          <Form.Label className="modal-label">
        Swahili
          </Form.Label>
          <Form.Check
        type="radio"
        className="modal-check"
        name="language"
        value="sw"
          />
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={onHide} >
            Set
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LanguageModal;
