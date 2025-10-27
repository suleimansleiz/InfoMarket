import React from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
  }


const TandC: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onHide,
}) => {

  return (
    <>
      <Dialog open={show} onClose={onHide} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/90 opacity-60"
        aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="w-full max-w-3xl max-h-[90vh] overflow-y-auto space-y-4 bg-white p-8 rounded-lg shadow-lg"
        >
          <DialogTitle className="font-bold text-xl mb-2">
            Terms and Conditions
          </DialogTitle>

          <Description className="space-y-3 text-gray-700">
            <h5>
              At <b>InfoMarket</b>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app.
            </h5>

            <div>
              <p className="font-semibold">1. User Accounts</p>
              <p>You must provide accurate and complete registration information.</p>
              <p>You are responsible for maintaining the confidentiality of your login credentials.</p>
            </div>

            <div>
              <p className="font-semibold">2. Sellers and Buyers</p>
              <p>Sellers are responsible for the accuracy of product listings.</p>
              <p>Buyers are responsible for verifying product details before making purchases.</p>
            </div>

            <div>
              <p className="font-semibold">3. Payments</p>
              <p>Payments are made through supported mobile money platforms such as <b>M-Pesa, Tigo Pesa, Airtel Money,</b> and <b>Halopesa</b>.</p>
              <p>All Delivery fees will be paid by cash, after receiving your order.</p>
              <p>InfoMarket <b>retains 8%</b> of the item price as an <b>app management fee</b>.</p>
              <p>Sellers will receive 92% of the sale price after the deduction.</p>
            </div>

            <div>
              <p className="font-semibold">4. Refund Policy</p>
              <p><b>All purchases are final.</b></p>
              <p><b>No refunds</b> will be issued once payment is confirmed.</p>
              <p>Disputes between buyers and sellers are encouraged to be resolved between the two parties, but InfoMarket may assist if necessary.</p>
              <p>Items listed must not violate any laws or regulations.</p>
            </div>

            <div>
              <p className="font-semibold">5. Content Policy</p>
              <p>Offensive, fraudulent, or misleading listings will be removed without notice.</p>
            </div>

            <div>
              <p className="font-semibold">6. App Usage</p>
              <p>Users must not attempt to hack, modify, or distribute InfoMarket’s services without permission.</p>
              <p>We reserve the right to suspend or delete any account that violates these terms.</p>
            </div>

            <div>
              <p className="font-semibold">7. Limitation of Liability</p>
              <p>InfoMarket is <b>not responsible</b> for:</p>
              <ul className="list-disc pl-5">
                <li>The quality or delivery of goods listed by sellers</li>
                <li>Losses resulting from user negligence</li>
                <li>Downtime or technical issues beyond our control</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">8. Changes to Terms</p>
              <p>We may revise these Terms at any time. Continued use of the app implies acceptance of the updated terms.</p>
            </div>

            <div>
              <p className="font-semibold">9. Contact</p>
              <p>
                For any concerns or questions, reach out to us at:{" "}
                <a href="mailto:legal@infomarket.com" className="text-blue-600 underline">
                  legal@infomarket.com
                </a>
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

export default TandC;
