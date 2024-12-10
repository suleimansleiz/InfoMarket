import React from "react";
import "../App.css"; // Assuming global styles are in App.css
import { FaGoogle } from "react-icons/fa";

const SellYourItem: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-4">Login</h3>
        <button
          className="btn btn-light d-flex align-items-center justify-content-center mb-3"
        >
          <FaGoogle className="me-2" style={{ fontSize: "1.2rem" }} />
          Continue with Google
        </button>
        <button
          className="btn2 btn-primary mb-3"
        >
          Login with Email
        </button>
        <div className="text-center">
          <p className="mb-2">
            Don't have an account?{" "}
            <a href="#" className="createAccount text-decoration-none">
              Create Account
            </a>
          </p>
          <p >
            By continuing, you agree to our{" "}
            <a href="#" className="tp text-decoration-none">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="tp text-decoration-none">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellYourItem;
