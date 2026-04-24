import React from 'react';
import ZombieScoreBar from './ZombieScoreBar';

const SubscriptionTable = ({ subscriptions, onCancel, onDetails }) => {
  const statusStyles = {
    Active: 'bg-green-100 text-green-700',
    Zombie: 'bg-red-100 text-red-700',
    Duplicate: 'bg-orange-100 text-orange-700',
  };

  if (subscriptions.length === 0) {
    return (
      <div className="card-base py-20 text-center bg-white/50 border-2 border-dashed border-gray-200">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-500">No subscriptions found</h3>
        <p className="text-gray-400 mt-2">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-4">
        <thead>
          <tr className="text-gray-400 text-xs font-bold uppercase tracking-wider">
            <th className="px-6 py-2">Subscription</th>
            <th className="px-6 py-2">Price</th>
            <th className="px-6 py-2">Category</th>
            <th className="px-6 py-2">Usage</th>
            <th className="px-6 py-2 w-48">Health</th>
            <th className="px-6 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub.id} className="card-base group bg-white hover:shadow-md transition-smooth">
              <td className="px-6 py-4 rounded-l-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-warmBg rounded-lg flex items-center justify-center text-xl">
                    {sub.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-textDark">{sub.name}</h4>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${statusStyles[sub.status]}`}>
                      {sub.status}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="font-bold text-textDark">₹{sub.price}</span>
                <span className="text-[10px] text-gray-400 block font-medium">Monthly</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1 rounded-lg">
                  {sub.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-500 font-medium">{sub.lastUsed}</span>
                <span className="text-[10px] text-gray-400 block font-medium uppercase">Last Activity</span>
              </td>
              <td className="px-6 py-4">
                <ZombieScoreBar score={sub.zombieScore} />
              </td>
              <td className="px-6 py-4 text-right rounded-r-xl">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => onCancel(sub)}
                    className="px-4 py-2 text-xs font-bold text-error bg-red-50 hover:bg-red-100 rounded-lg transition-smooth"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => onDetails(sub)}
                    className="px-4 py-2 text-xs font-bold text-primary-500 border border-primary-100 hover:border-primary-500 rounded-lg transition-smooth"
                  >
                    Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionTable;
