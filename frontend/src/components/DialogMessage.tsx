import React from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface DialogMessageProps {
  show: boolean;
  onClose: () => void;
  message: string;
  dialogTitle: string;
}

const DialogMessage: React.FC<DialogMessageProps> = ({ show, onClose, message, dialogTitle }) => {
  return (
    <>
      <Dialog open={show} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
          <DialogPanel className="max-w-sm space-y-4 border bg-white p-8 border border-gray-300 rounded-lg">
            <DialogTitle
              className="font-bold text-center text-blue-900 text-lg">
              {dialogTitle}
            </DialogTitle>
            <Description>{message}</Description>
              <div className="flex gap-4 justify-center mt-4">
                <button onClick={onClose} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                  Ok
                </button>
              </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default DialogMessage;
