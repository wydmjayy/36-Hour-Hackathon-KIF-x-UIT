import React from 'react';
import { motion } from 'framer-motion';

const FamilyPlanCard = ({ service, users, individualPrice, familyPrice, onMerge }) => {
  const totalIndividual = individualPrice * users.length;
  const savings = totalIndividual - familyPrice;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-base bg-white border border-gray-100 p-8 hover:shadow-xl transition-smooth"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-warmBg rounded-2xl flex items-center justify-center text-3xl">
            {service.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-textDark">{service.name} Duplicate Detected</h3>
            <div className="flex gap-2 mt-2">
              {users.map((user, idx) => (
                <span key={idx} className="bg-primary-50 text-primary-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                  👤 {user}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-green-50 px-6 py-3 rounded-2xl border border-green-100">
          <p className="text-green-600 text-xs font-bold uppercase tracking-widest">Potential Savings</p>
          <p className="text-2xl font-black text-green-700">₹{savings.toLocaleString()}/mo</p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-warmBg/50 p-6 rounded-2xl border border-dashed border-gray-200">
          <h4 className="text-gray-400 font-bold text-xs uppercase mb-4 tracking-tighter">Current (Individual)</h4>
          <div className="space-y-3">
            {users.map((user, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">{user}'s Plan</span>
                <span className="font-bold text-textDark">₹{individualPrice}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-200 flex justify-between font-black text-lg">
              <span>Total Burn</span>
              <span className="text-error">₹{totalIndividual}</span>
            </div>
          </div>
        </div>

        <div className="bg-primary-500 p-6 rounded-2xl shadow-lg shadow-primary-500/20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">✨</div>
          <h4 className="text-white/60 font-bold text-xs uppercase mb-4 tracking-tighter">Surgeon's Suggestion (Family)</h4>
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Unified Family Plan</span>
              <span className="font-bold">₹{familyPrice}</span>
            </div>
            <div className="pt-3 border-t border-white/20 flex justify-between font-black text-lg">
              <span>Optimized Spend</span>
              <span className="text-white">₹{familyPrice}</span>
            </div>
          </div>
          <div className="mt-4 bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <p className="text-xs font-medium leading-relaxed">
              <span className="font-bold italic">AI Suggests:</span> These accounts share the same household markers. Merging will save you ₹{savings.toLocaleString()} every month.
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onMerge(service.name)}
        className="w-full py-4 bg-textDark text-white font-bold rounded-2xl hover:bg-black transition-smooth shadow-lg h-16 flex items-center justify-center gap-3 text-lg"
      >
        🤝 Merge Plans Now
      </button>
    </motion.div>
  );
};

export default FamilyPlanCard;
