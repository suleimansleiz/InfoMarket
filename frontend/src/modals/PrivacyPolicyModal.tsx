import React, {  } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
  }
  

const PrivacyPolicyModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onHide,
}) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      className="modal-full"
      dialogClassName="modal-container"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Privacy Policy</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
            <p>Effective Date: July 1st, 2025</p>
            <h5>At <b>InfoMarket</b>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app.</h5><br />
            <p>1. Information We Collect</p>
            <p>We collect the following types of information:</p>
            <p><b>Account Information:</b> Name, phone number, email address, and password.</p>
            <p><b>Item Information:</b> Product details uploaded by sellers.</p>
            <p><b>Transaction Data:</b> Purchase history, payment network used (e.g., M-Pesa, Tigo Pesa), and timestamps.</p>
            <p><b>Device & Usage Data:</b> IP address, device type, and interactions within the app.</p><br />
            <p>2. How We Use Your Information</p>
            <p>We use your data to:</p>
            <p>Create and manage user accounts</p>
            <p>Facilitate communication between buyers and sellers</p>
            <p>Improve app features and user experience</p>
            <p>Process payments securely</p>
            <p>Send notifications and alerts (e.g., order confirmations)</p><br />
            <p>3. Sharing of Information</p>
            <p>We <b>do not sell</b> or share your personal data with third parties, except:</p>
            <p>With payment processors for transaction purposes</p>
            <p>To comply with legal obligations</p>
            <p>When you explicitly consent</p><br />
            <p>4. Data Security</p>
            <p>We implement industry-standard security measures to protect your personal data, including secure login, data encryption, and limited access to sensitive information.</p>
            <p>5. User Rights</p>
            <p>You have the right to:</p>
            <p>Access and update your information</p>
            <p>Request deletion of your account and data</p>
            <p>Opt out of marketing communications</p>
            <p>To exercise these rights, contact: <a href="">support@infomarket.com</a></p><br />
            <p>6. Changes to This Policy</p>
            <p>We may update this Privacy Policy from time to time. We will notify you via the app when significant changes are made.</p>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="success" onClick={onHide}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrivacyPolicyModal;