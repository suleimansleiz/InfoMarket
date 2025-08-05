import React, { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import LanguageModal from "../modals/LanguageModal";
import TandC from "../modals/TandC";
import PrivacyPolicyModal from "../modals/PrivacyPolicyModal";
import AdminLoginModal from "../modals/AdminLoginModal";

const Settings: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
    const [showTandCModal, setShowTandCModal] = useState(false);
    const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const openLanguageModal = () => {
    setShowLanguageModal(true);
  };

  const openTandCModal = () => {
    setShowTandCModal(true);
  };

  const openPrivacyPolicyModal = () => {
    setShowPrivacyPolicyModal(true);
  };

  const openAdminLoginModal = () => {
    setShowAdminLoginModal(true);
  };

  return(
  <div>
    <div className="topbar d-flex align-items-center p-3">
      <h1 className="headers-2">Settings</h1>
    </div>
    <div className="center-container">
      <div className="center-container-card card">
        <div className="card-theme">
          <div className="card-theme-left">
            <h5>Night Mode</h5>
            <p>light mode is default</p>
          </div>
          <form className="form-switch">
          <Form.Check
            type="switch"
            onChange={toggleTheme}
            className="custom-switch"
          />
        </form>
        </div>
      </div>
      <div className="center-container-card card ">
      <div className="card-theme-left" onClick={() => openLanguageModal()}>
        <h5>Language</h5>
        <p>english (us)</p>
      </div>
      </div>
      <div className="center-container-card card " onClick={() => openPrivacyPolicyModal()}>
      <div className="card-theme-left">
        <h5>Privacy Policy</h5>
        <p>We encourage you to read our privacy policy</p>
      </div>
      </div>
      <div className="center-container-card card " onClick={() => openTandCModal()}>
      <div className="card-theme-left">
        <h5>Terms and Conditions</h5>
        <p>We strongly advice you to read and agree to our terms and conditions</p>
      </div>
      </div>
      <div className="center-container-card card " onClick={() => openAdminLoginModal()}>
      <div className="card-theme-left">
        <h5>Login as an Admin</h5>
        <p>For authorized access only</p>
      </div>
      </div>
    </div>
    <LanguageModal
        show={showLanguageModal}
        onHide={() => {
          setShowLanguageModal(false);
        } }
      />

      <TandC
        show={showTandCModal}
        onHide={() => {
          setShowTandCModal(false);
        } }
      />

      <PrivacyPolicyModal
        show={showPrivacyPolicyModal}
        onHide={() => {
          setShowPrivacyPolicyModal(false);
        } }
      />

      <AdminLoginModal
        show={showAdminLoginModal}
        onHide={() => {
          setShowAdminLoginModal(false);
        }  }
      />
    </div>
  );
};

export default Settings;
