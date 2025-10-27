import React, { } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onDelete: () => void;
    itemName: string;
    deleting?: boolean;
  }

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onHide,
  onDelete,
  itemName,
  deleting,
}) => {

  return (
    <>
      <Dialog open={show} onClose={onHide} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-4 border border-gray-300 rounded-lg">
            <DialogTitle
              className="font-bold text-center text-blue-900 text-lg">
              Confirm Deletion
            </DialogTitle>
            <Description>
              <p className="text-center">
                Are you sure you want to delete <strong>{itemName}</strong>?
              </p>
            </Description>
              <div className="flex gap-2 justify-end mt-4">
                <button onClick={onHide} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">
                  Discard
                </button>
                <button onClick={onDelete} disabled={deleting} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">
                  {deleting ?  "Deleting..."  : "Delete"}
                </button>
              </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteConfirmationModal;
