import React, {  } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface AdminItemDeleteModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  loading: boolean,
  title: string;
  message: string;
}

const AdminItemDeleteModal: React.FC<AdminItemDeleteModalProps> = ({ show, onHide, onConfirm, loading, title, message }) => {

  return (
    <>
      <Dialog open={show} onClose={onHide} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
          <DialogPanel className="max-w-md space-y-4 border bg-white p-4 border border-gray-300 rounded-lg">
            <DialogTitle
              className="font-bold text-center text-blue-900 text-lg">
              {title}
            </DialogTitle>
            <Description>
              <p className="text-center">
                {message}
              </p>
            </Description>
              <div className="flex gap-2 justify-end mt-4">
                <button onClick={onHide} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default AdminItemDeleteModal;

