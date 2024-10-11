// Popup.js
import React from 'react';

const Popup = ({ message, isLoading, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{isLoading ? "Uploading..." : message}</h2>
        {isLoading ? (
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        ) : (
          <div className="text-green-500 text-2xl">✔️</div>
        )}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
