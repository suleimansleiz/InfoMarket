import React, {  } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

interface FeedbackDialogProps {
    show: boolean;
    onHide: () => void;
  }


const FeedbackModal: React.FC<FeedbackDialogProps> = ({
  show,
  onHide,
}) => {

  return (
    <>
      <Dialog open={show} onClose={onHide} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
          <DialogPanel className="max-w-md space-y-4 border bg-white p-4 border border-gray-300 rounded-lg">
            <DialogTitle
              className="font-bold text-center text-blue-900 text-lg">
              <div className="flex justify-center">
                <CheckBadgeIcon className="size-20 text-green-400/80 " />
              </div>
            </DialogTitle>
            <Description>
              <p className="text-center">
                Thanks for the feedback, our support team will respond to you via email.
              </p>
            </Description>
              <div className="flex gap-2 justify-center mt-4">
                <button onClick={onHide} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-600 cursor-pointer">
                  Ok
                </button>
              </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default FeedbackModal;
