import React from 'react';

const SavingsSummary = ({ totalSaved, monthlySavings, cancelledCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="card-base bg-white border border-gray-100 p-8 shadow-sm">
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Lifetime Savings</p>
        <div className="flex items-end gap-2">
          <h2 className="text-4xl font-black text-green-600">₹{totalSaved.toLocaleString()}</h2>
          <span className="text-sm font-bold text-green-400 mb-1">Total</span>
        </div>
      </div>

      <div className="card-base bg-white border border-gray-100 p-8 shadow-sm">
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Monthly Cut</p>
        <div className="flex items-end gap-2">
          <h2 className="text-4xl font-black text-primary-500">₹{monthlySavings.toLocaleString()}</h2>
          <span className="text-sm font-bold text-primary-400 mb-1">/mo</span>
        </div>
      </div>

      <div className="card-base bg-white border border-gray-100 p-8 shadow-sm">
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Successful Surgeries</p>
        <div className="flex items-end gap-2">
          <h2 className="text-4xl font-black text-textDark">{cancelledCount}</h2>
          <span className="text-sm font-bold text-gray-400 mb-1">Items</span>
        </div>
      </div>
    </div>
  );
};

export default SavingsSummary;
