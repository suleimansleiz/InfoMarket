import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Spinner } from "react-bootstrap";
import ToastMessage from "../components/mini-components/ToastMessage";
import api from "../api/axiosConfig";

interface AwaitPaymentProps {
  show: boolean;
  onHide: () => void;
  message: string;
  orderReference: string;
}

const AwaitPaymentModal: React.FC<AwaitPaymentProps> = ({
  show,
  onHide,
  message,
  orderReference,
}) => {
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVrt, setToastVrt] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/api/infomarket/v1/payments/intent-status/${orderReference}`
      );
      const status = res.data.status;

      if (status === "SUCCESS") {
        setToastMsg("Payment completed successfully.");
        setToastVrt("success");
        setShowToast(true);
        onHide();
      } else if (status === "PENDING") {
        setToastMsg("Payment is still pending. Please complete the USSD push.");
        setToastVrt("warning");
        setShowToast(true);
      } else if (status === "FAILED") {
        setToastMsg("Payment failed. Please try again.");
        setToastVrt("danger");
        setShowToast(true);
        onHide();
      } else {
        setToastMsg("Unexpected status received.");
        setToastVrt("warning");
        setShowToast(true);
      }
    } catch {
      setToastMsg("Error checking payment status.");
      setToastVrt("danger");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => {}}
        centered
        className="modal-full"
        dialogClassName="modal-container"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="fb-body">
          <Form className="fb-form d-flex justify-content-center align-items-center flex-column">
            <p>{message}</p>
          </Form>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={handleConfirm} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Confirm"}
            </Button>
          </div>
        </Modal.Body>
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

export default AwaitPaymentModal;
