// components/ModalWrapper.tsx
import React from "react";

interface ModalWrapperProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  show,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-black/30 bg-opacity-100 h-screen w-screen min-h-screen">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm md:max-w-md ">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3">
          <h2 className="text-3xl text-gray-600 ">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 cursor-pointer">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5">{children}</div>

        {/* Footer */}
        {footer && <div className="px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
};

export default ModalWrapper;
