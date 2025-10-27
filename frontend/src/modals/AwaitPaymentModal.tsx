import React, { useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import ToastMessage from "../components/DialogMessage";
import api from "../api/axiosConfig";

interface AwaitPaymentProps {
  show: boolean;
  onHide: () => void;
  message: string;
  orderReference: string;
  dialogTitle: string;
}

const AwaitPaymentModal: React.FC<AwaitPaymentProps> = ({
  show,
  onHide,
  message,
  orderReference,
  dialogTitle,
}) => {
  const [loading, setLoading] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/api/infomarket/v1/payments/intent-status/${orderReference}`
      );
      const status = res.data.status;

      if (status === "SUCCESS") {
        setToastTitle("Success");
        setToastMsg("Payment completed successfully.");
        setShowToast(true);
        onHide();
      } else if (status === "PENDING") {
        setToastTitle("Pending");
        setToastMsg("Payment is still pending. Please complete the USSD push.");
        setShowToast(true);
      } else if (status === "FAILED") {
        setToastTitle("Failure");
        setToastMsg("Payment failed. Please try again.");
        setShowToast(true);
        onHide();
      } else {
        setToastMsg("Unexpected status received.");
        setShowToast(true);
      }
    } catch {
      setToastMsg("Error checking payment status.");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={show} onClose={onHide} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
          <DialogPanel className="max-w-md space-y-4 border bg-white p-4 border border-gray-300 rounded-lg">
            <DialogTitle
              className="font-bold text-center text-blue-900 text-lg">
              {dialogTitle}
            </DialogTitle>
            <Description>
              <p className="text-center">
                {message}
              </p>
            </Description>
              <div className="flex gap-2 justify-center mt-4">
                <button
                onClick={handleConfirm}
                disabled={loading}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-600 cursor-pointer">
                  {loading ? "Confirming..." : "Confirm"}
                </button>
              </div>
          </DialogPanel>
        </div>
      </Dialog>

      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMsg}
        dialogTitle={toastTitle}
      />
    </>
  );
};

export default AwaitPaymentModal;
