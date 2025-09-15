import React, { useState } from "react";
import { Link } from "react-router-dom";
import SellerLoginModal from "../modals/SellerLoginModal";

const SellYourItem: React.FC = () => {
  
  const [showSellerLoginModal, setShowSellerLoginModal] = useState(false);

  const googleLogo = (
    <img className="google-logo" src="../assets/google.png" alt="google-btn" />
  );

  const handleLoginNavigation = () => {
    setShowSellerLoginModal(true);
  };

  return (
    <div className="sell-your-item-container">
      <div className="topbar d-flex align-items-center p-3">
        <h2 className="headers-2 text-center">Login to Upload a post</h2>
      </div>
      <div className="card sell-your-item-card">
        <h3 className="card-header text-center">Login with</h3>
        <button className="btn google-btn d-flex align-items-center justify-content-center">
          {googleLogo}
          <span className="gglbtn ms-2">Continue with Google</span>
        </button>
        <button
          className="email-btn google-btn login-email-btn"
          onClick={handleLoginNavigation}
        >
          Login with email
        </button>
        <div className="card-words text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/create-account" className="card-links text-decoration-none">
              Create Account
            </Link>
          </p>
          <p className="text-muted">
            By continuing, you agree to our{" "}
            <a href="/settings" className="card-links text-decoration-none">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/settings" className="card-links text-decoration-none">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
      <footer className="copyRight mt-auto p-3 text-center">
        <p>
            Copyright © 2025 <b><a href="/home">InfoMarket.</a></b> Developed and
            maintained by <b><a href="#">SleizWare Development.</a></b> All
            rights reserved.
        </p>
      </footer>
      <SellerLoginModal
        show={showSellerLoginModal}
        onHide={() => {
          setShowSellerLoginModal(false);
        }  }
      />
    </div>
  );
};

export default SellYourItem;
