"use client";
import React, { useState } from "react";

type Props = {
  message: string;
  accept: () => void;
};

const ConfirmationModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded shadow-lg">
        <h1 id="modal-title" className="text-lg font-bold mb-4">
          {props.message}
        </h1>
        <div className="flex justify-end space-x-4">
          <button
            onClick={props.accept}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Accept
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
