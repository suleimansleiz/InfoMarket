import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SellYourItem: React.FC = () => {
  const navigate = useNavigate();

  const googleLogo = (
    <img className="google-logo" src="../assets/google.png" alt="google-btn" />
  );

  const handleLoginNavigation = () => {
    navigate("/login");
  };

  return (
    <div className="sell-your-item-container">
      <div className="card sell-your-item-card">
        <h3 className="text-center">Login</h3>
        <button className="btn google-btn d-flex align-items-center justify-content-center">
          {googleLogo}
          <span className="gglbtn ms-2">Continue with Google</span>
        </button>
        <button
          className="email-btn google-btn login-email-btn"
          onClick={handleLoginNavigation}
        >
          Login with email or phone
        </button>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/create-account" className="text-decoration-none">
              Create Account
            </Link>
          </p>
          <p className="text-muted">
            By continuing, you agree to our{" "}
            <a href="#" className="text-decoration-none">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-decoration-none">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellYourItem;
