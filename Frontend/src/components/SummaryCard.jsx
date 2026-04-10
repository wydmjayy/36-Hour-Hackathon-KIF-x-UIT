import React from 'react';

const SummaryCard = ({ title, value, icon, trend, colorClass }) => {
  return (
    <div className="card-base flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
          <span className="text-2xl">{icon}</span>
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'text-error bg-red-50' : 'text-success bg-green-50'}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-textDark mt-1">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
