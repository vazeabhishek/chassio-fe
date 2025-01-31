import React, { useEffect } from "react";

const ConfirmationDialog = ({ isOpen, message, onClose }) => {
  // Freeze the background when the dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup
    };
  }, [isOpen]);

  if (!isOpen) return null; // Render nothing if dialog is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Dialog Box */}
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Confirm</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => onClose(false)}
          >
            No
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
