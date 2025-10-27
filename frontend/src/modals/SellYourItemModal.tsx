import React, { useState } from "react";
import SellerLoginModal from "./SellerLoginModal";
import CreateAccountModal from "./CreateAccountModal";
import ModalWrapper from "../components/ModalWrapper";

interface SellYourItemModalProps {
  show: boolean;
  onHide: () => void;
}

const SellYourItemModal: React.FC<SellYourItemModalProps> = ({ show, onHide }) => {
  const [showSellerLoginModal, setShowSellerLoginModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  // const googleLogo = ( <img className="google-logo" src="../assets/google.png" alt="google-btn" /> );
  const handleLoginNavigation = () => {
    setShowSellerLoginModal(true);
  };

  const handleRegistraionNavigation = () => {
    setShowCreateAccountModal(true);
  };

  return (
    <ModalWrapper
      show={show}
      onClose={onHide}
      title="Sign in to Post"
    >
      <div className="flex flex-col items-center gap-2 pb-5">
        {/* <button className="w-100 ggl-btn" onClick={(e) => {e.preventDefault();}}>
          {googleLogo}
          <span className="gglbtn ms-2">Continue with Google</span>
        </button> */}
        <button className="w-full px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
          onClick={handleLoginNavigation}>
          Sign in with email
        </button>
        <p className="text-gray-600">
          New to InfoMarket?
        </p>
        <button onClick={handleRegistraionNavigation}
        className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
          Create an account
        </button>
      </div>
      <SellerLoginModal
        show={showSellerLoginModal}
        onHide={() => {
          setShowSellerLoginModal(false);
        }
      } />

      <CreateAccountModal
        show={showCreateAccountModal}
        onHide={() => {
          setShowCreateAccountModal(false);
        }
      } />

    </ModalWrapper>
  );
};

export default SellYourItemModal;
