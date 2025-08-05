import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface ToastMessageProps {
  show: boolean;
  onClose: () => void;
  message: string;
  variant: string;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ show, onClose, message, variant }) => {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast show={show} onClose={onClose} bg={variant} animation={true} delay={5000} autohide>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
