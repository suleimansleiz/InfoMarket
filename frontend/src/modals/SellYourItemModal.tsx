import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SellerLoginModal from "./SellerLoginModal";
import { Link } from "react-router-dom";
import CreateAccountModal from "./CreateAccountModal";



interface Props {
  show: boolean;
  onHide: () => void;
}

const SellYourItemModal: React.FC<Props> = ({ show, onHide }) => {
    const [showSellerLoginModal, setShowSellerLoginModal] = useState(false);
    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

    const googleLogo = (
    <img className="google-logo" src="../assets/google.png" alt="google-btn" />
  );

    const handleLoginNavigation = () => {
    setShowSellerLoginModal(true);
    onHide();
  };

  const handleRegistraionNavigation = () => {
    setShowCreateAccountModal(true);
    onHide();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        size="sm"
        className="modal-full"
        dialogClassName="modal-container"
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title className="modal-title">Login to Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Button className="w-100 ggl-btn" onClick={(e) => {e.preventDefault();}}>
            {googleLogo}
          <span className="gglbtn ms-2">Continue with Google</span>
          </Button>
          <Button className="w-100" variant="primary" onClick={handleLoginNavigation}>Login with email</Button>
        </Modal.Body>
        <Modal.Footer>
            <p>
            Don't have an account?{" "}
            <Link to="#" onClick= {(e) => {
              e.preventDefault();
              handleRegistraionNavigation();
            } } className="card-links text-decoration-none">
              Create Account
            </Link>
          </p>
        </Modal.Footer>
      </Modal>
      <SellerLoginModal
        show={showSellerLoginModal}
        onHide={() => {
          setShowSellerLoginModal(false);
        }  }
      />
      <CreateAccountModal
        show={showCreateAccountModal}
        onHide={() => {
          setShowCreateAccountModal(false);
        }  }
      />
    </>
  );
};

export default SellYourItemModal;
