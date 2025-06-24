import React, {  } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
  }
  

const TandC: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onHide,
}) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      className="modal-full"
      dialogClassName="modal-container"
      size="lg"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Terms and Conditions</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form className="modal-form">
          <h5>By using <b>InfoMarket</b>, you agree to the following terms:</h5><br />
          <p>1. User Accounts</p>
          <p>You must provide accurate and complete registration information.</p>
          <p>You are responsible for maintaining the confidentiality of your login credentials.</p><br />
          <p>2. Sellers and Buyers</p>
          <p>Sellers are responsible for the accuracy of product listings.</p>
          <p>Buyers are responsible for verifying product details before making purchases.</p><br />
          <p>3. Payments</p>
          <p>Payments are made through supported mobile money platforms such as <b>M-Pesa, Tigo Pesa, Airtel Money,</b> and <b>Halopesa</b>.</p>
          <p>All Delivery fees will be paid by cash, after receiving your order.</p>
          <p>InfoMarket <b>retains 8%</b> of the item price as an <b>app management fee</b>.</p>
          <p>Sellers will receive 92% of the sale price after the deduction.</p><br />
          <p>4. Refund Policy</p>
          <p><b>All purchases are final.</b></p>
          <p><b>No refunds</b>  will be issued once payment is confirmed.</p>
          <p>Disputes between buyers and sellers are encouraged to be resolved between the two parties, but InfoMarket may assist if necessary.</p>
          <p>Items listed must not violate any laws or regulations.</p><br />
          <p>5. Content Policy</p>
          <p>Offensive, fraudulent, or misleading listings will be removed without notice.</p><br />
          <p>6. App Usage</p>
          <p>Users must not attempt to hack, modify, or distribute InfoMarket’s services without permission.</p>
          <p>We reserve the right to suspend or delete any account that violates these terms.</p><br />
          <p>7. Limitation of Liability</p>
          <p>InfoMarket is <b>not responsible</b> for:</p>
          <p>The quality or delivery of goods listed by sellers</p>
          <p>Losses resulting from user negligence</p>
          <p>Downtime or technical issues beyond our control</p><br />
          <p>8. Changes to Terms</p>
          <p>We may revise these Terms at any time. Continued use of the app implies acceptance of the updated terms.</p><br />
          <p>9. Contact</p>
          <p>For any concerns or questions, reach out to us at: <a href="">legal@infomarket.com</a></p>
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

export default TandC;