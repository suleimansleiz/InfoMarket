import React, { useState } from "react";
import { Switch } from '@headlessui/react'
import LanguageModal from "../modals/LanguageModal";
import TandC from "../modals/TandC";
import PrivacyPolicyModal from "../modals/PrivacyPolicyModal";
import AdminLoginModal from "../modals/AdminLoginModal";

const Settings: React.FC = () => {
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
    const [showTandCModal, setShowTandCModal] = useState(false);
    const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
    const [enabled, setEnabled] = useState(false)

  

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
  <div className="w-full min-h-screen p-4 md:p-8 lg:p-12 items-center text-center bg-gray-50 justify-center">
    <div className="flex justify-center items-center  mb-5 bg-gray-50">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-blue-800 bg-clip-text text-transparent">
        Settings
      </h1>
    </div>
    <div>
      <div className="w-full flex flex-col gap-4 md:gap-6 lg:gap-8 px-4 lg:px-6 bg-white rounded-lg shadow-sm py-4">
        <div className="flex justify-between">
          <div className="flex flex-col item-center">
            <h5 className="text-lg text-gray-600 font-semibold text-left">Night Mode</h5>
            <p className="text-gray-600 text-left">light mode is default</p>
          </div>
          <form className="form-switch">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-600 cursor-pointer"
            >
              <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
            </Switch>
        </form>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 md:gap-6 lg:gap-8 px-4 lg:px-6 bg-white rounded-lg shadow-sm py-4 mt-3">
      <div className="flex flex-col item-center" onClick={() => openLanguageModal()}>
        <h5 className="text-lg text-gray-600 font-semibold text-left">Language</h5>
        <p className="text-gray-600 text-left">english (us)</p>
      </div>
      </div>
      <div className="w-full flex flex-col gap-4 md:gap-6 lg:gap-8 px-4 lg:px-6 bg-white rounded-lg shadow-sm py-4 mt-3"
        onClick={() => openPrivacyPolicyModal()}>
      <div className="flex flex-col item-center">
        <h5 className="text-lg text-gray-600 font-semibold text-left">Privacy Policy</h5>
        <p className="text-gray-600 text-left">We encourage you to read our privacy policy</p>
      </div>
      </div>
      <div className="w-full flex flex-col gap-4 md:gap-6 lg:gap-8 px-4 lg:px-6 bg-white rounded-lg shadow-sm py-4 mt-3"
        onClick={() => openTandCModal()}>
      <div className="flex flex-col item-center">
        <h5 className="text-lg text-gray-600 font-semibold text-left">Terms and Conditions</h5>
        <p className="text-gray-600 text-left">We strongly advice you to read and agree to our terms and conditions</p>
      </div>
      </div>
      <div className="hidden lg:flex flex-col w-full gap-4 md:gap-6 lg:gap-8 px-4 lg:px-6 bg-white rounded-lg shadow-sm py-4 mt-3"
        onClick={() => openAdminLoginModal()}>
      <div className="flex flex-col item-center">
        <h5 className="text-lg text-gray-600 font-semibold text-left">Login as an Admin</h5>
        <p className="text-gray-600 text-left">For authorized access only</p>
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
