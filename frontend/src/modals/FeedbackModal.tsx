import React, {  } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

interface FeedbackDialogProps {
    show: boolean;
    onHide: () => void;
  }
  

const FeedbackModal: React.FC<FeedbackDialogProps> = ({
  show,
  onHide,
}) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      centered
      className="modal-full"
      dialogClassName="modal-container"
    >
        <Modal.Body className="fb-body">
            <Form className="fb-form">
                <p>Thanks for the feedback, our support team will respond to you via email.</p>
            </Form>
            <Button className="d-flex" variant="primary" onClick={onHide}>
                Ok
            </Button>
        </Modal.Body>
    </Modal>
  );
};

export default FeedbackModal;
