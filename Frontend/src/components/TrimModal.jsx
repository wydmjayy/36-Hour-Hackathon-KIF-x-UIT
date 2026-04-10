import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTrim from '../hooks/useTrim';
import EmailDraftModal from './EmailDraftModal';

const TrimModal = ({ isOpen, onClose }) => {
  const { zombies, totalSavings, count } = useTrim();
  const [selectedSub, setSelectedSub] = useState(null);

  if (!isOpen) return null;

  const handleFullTrim = () => {
    alert(`Successfully initiated trim for ${count} subscriptions! Potential savings: ₹${totalSavings.toLocaleString()}/mo`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-textDark/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-textDark">Financial Trim Summary ✂️</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-textDark text-2xl">&times;</button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
              <span className="text-sm font-bold text-red-400 uppercase tracking-wider">Zombie Subs</span>
              <p className="text-3xl font-black text-error">{count}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
              <span className="text-sm font-bold text-green-400 uppercase tracking-wider">Monthly Savings</span>
              <p className="text-3xl font-black text-green-600">₹{totalSavings.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Cancellation Queue</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {zombies.map((sub) => (
                <div key={sub.id} className="flex justify-between items-center p-4 bg-warmBg rounded-xl border border-gray-100 hover:border-primary-200 transition-smooth group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sub.icon}</span>
                    <div>
                      <h4 className="font-bold text-textDark">{sub.name}</h4>
                      <p className="text-xs text-gray-400 font-medium">₹{sub.price}/mo</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedSub(sub)}
                    className="px-4 py-2 bg-white text-primary-500 text-xs font-bold rounded-lg border border-primary-100 hover:bg-primary-500 hover:text-white transition-smooth shadow-sm"
                  >
                    Draft Email
                  </button>
                </div>
              ))}
              {zombies.length === 0 && (
                <div className="py-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                   <p className="text-gray-400 font-medium">No zombies found! Your finances are healthy. 🌟</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-smooth"
            >
              Maybe Later
            </button>
            <button 
              disabled={zombies.length === 0}
              onClick={handleFullTrim}
              className="flex-1 py-4 bg-primary-500 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Full Trim
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedSub && (
          <EmailDraftModal 
            subscription={selectedSub} 
            onClose={() => setSelectedSub(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrimModal;
