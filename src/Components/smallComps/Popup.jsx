import React from "react";

function Popup({ title, message, clickedOkey, isPopUpOpen, setIsPopUpOpen }) {
  const closePopup = () => {
    setIsPopUpOpen(false); // Close the popup
    document.body.style.overflow = "auto"; // Restore scroll
  };

  return (
    isPopUpOpen && (
      <div
        onClick={closePopup}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-md p-6 w-[90%] max-w-md"
        >
          {/* Title and Message */}
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-red-400">{title}</h1>
            <p className="text-gray-600 mt-2">{message}</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                clickedOkey(); // Call the confirm action
                closePopup(); // Close the popup
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Popup;
