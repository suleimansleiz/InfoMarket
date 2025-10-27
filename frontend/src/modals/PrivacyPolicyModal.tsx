import React from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
  }
  

const PrivacyPolicyModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onHide,
}) => {

  return (
    <>
      <Dialog open={show} onClose={onHide} className="relative z-50">
          <div className="fixed inset-0 bg-black/90 opacity-60"
            aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto space-y-4 bg-white p-8 rounded-lg shadow-lg"
            >
              <DialogTitle className="font-bold text-xl mb-2">
                Privacy Policy
              </DialogTitle>

              <Description className="space-y-3 text-gray-700">
                <h5>
                  By using <b>InfoMarket</b>, you agree to the following terms:
                </h5>

                <div>
                  <p className="font-semibold">1. Information We Collect.</p>
                  <p>We collect the following types of information:</p>
                  <p><b>Account Information:</b> Name, phone number, email address, and password.</p>
                  <p><b>Transaction Data:</b> Purchase history, payment network used (e.g., M-Pesa, Tigo Pesa), and timestamps.</p>
                  <p><b>Device & Usage Data:</b> IP address, device type, and interactions within the app.</p><br />
                </div>

                <div>
                  <p className="font-semibold">2.How We Use Your Information</p>
                  <p>We use your data to:</p>
                  <p>Create and manage user accounts.</p>
                  <p>Facilitate communication between buyers and sellers</p>
                  <p>Improve app features and user experience</p>
                  <p>Process payments securely</p>
                  <p>Send notifications and alerts (e.g., order confirmations)</p><br />
                </div>

                <div>
                  <p className="font-semibold">3. Sharing of Information</p>
                  <p>We <b>do not sell</b> or share your personal data with third parties, except:</p>
                  <p>With payment processors for transaction purposes</p>
                  <p>To comply with legal obligations</p>
                  <p>When you explicitly consent</p>
                </div>
    
                <div>
                  <p className="font-semibold">4. Data Security</p>
                  <p>We <b>do not </b> sell or share your personal data with third parties, except:</p>
                  <p>With payment processors for transaction purposes</p>
                  <p>To comply with legal obligations</p>
                  <p>When you explicitly consent</p>
                  <p>We implement industry-standard security measures to protect your personal data, including secure login, data encryption, and limited access to sensitive information.</p>
                </div>
    
                <div>
                  <p className="font-semibold">5. User Rights</p>
                  <p>You have the right to:</p>
                  <p>Access and update your information</p>
                  <p>Request deletion of your account and data</p>
                  <p>Opt out of marketing communications</p>
                  <p>To exercise these rights, contact: <a href="#">support@infomarket.com</a></p>
                </div>

                <div>
                  <p className="font-semibold">6. Changes to This Policy</p>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you via the app when significant changes are made.
                  </p>
                </div>
              </Description>
    
              <div className="flex gap-4 justify-end mt-6">
                <button
                  onClick={onHide}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
  );
};

export default PrivacyPolicyModal;