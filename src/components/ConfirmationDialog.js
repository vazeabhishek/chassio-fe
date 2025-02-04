import React, { useState, useEffect } from 'react';
import '../assets/ConfirmationDialog.css';

const ConfirmationDialog = ({ isOpen, message, onClose }) => {
  // State to manage background freeze
  const [isFrozen, setIsFrozen] = useState(false);

  // Handle background freeze on dialog open/close
  useEffect(() => {
    if (isOpen) {
      // Freeze background scrolling
      document.body.style.overflow = 'hidden';
      setIsFrozen(true);
    } else if (isFrozen) {
      // Restore background scrolling when closing
      document.body.style.overflow = '';
      setIsFrozen(false);
    }
  }, [isOpen, isFrozen]);

  if (!isOpen) return null; // Render nothing if dialog is closed

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition opacity duration-150 ease-in-out ${
        isFrozen ? 'opacity-100' : ''
      }`}
    >
      {/* Dialog Box */}
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Confirm</h3>
        <p className="mb-6 font-bold">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="confirmation-dialog-no-button" // NEW CLASS
            onClick={() => onClose(false)}
          >
            No
          </button>
          <button
            className="confirmation-dialog-yes-button" // NEW CLASS
            onClick={() => onClose(true)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;