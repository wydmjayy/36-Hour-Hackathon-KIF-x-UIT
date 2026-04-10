import React from 'react';

const SubscriptionCard = ({ sub, onManage }) => {
  const { name, price, lastUsed, status, icon } = sub;
  const statusStyles = {
    Active: 'bg-green-100 text-green-700',
    Zombie: 'bg-red-100 text-red-700',
    Duplicate: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="card-base group cursor-default">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-warmBg rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-smooth">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-textDark">{name}</h4>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${statusStyles[status] || 'bg-gray-100'}`}>
              {status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">₹{price}/mo</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-400 font-medium">Last used: {lastUsed}</span>
        <button 
          onClick={() => onManage(sub)}
          className="text-xs font-bold text-primary-500 hover:text-primary-700 transition-smooth opacity-0 group-hover:opacity-100"
        >
          Manage
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
