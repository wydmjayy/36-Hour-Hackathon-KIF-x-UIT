import React from 'react';

const FinancialTrimButton = ({ onClick }) => {
  return (
    <div className="flex justify-center my-12">
      <button
        onClick={onClick}
        className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-error text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-smooth overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          ✂️ Perform Financial Trim
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};

export default FinancialTrimButton;
