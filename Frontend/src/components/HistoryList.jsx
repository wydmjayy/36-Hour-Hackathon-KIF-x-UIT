import React from 'react';
import { motion } from 'framer-motion';

const HistoryList = ({ history }) => {
  return (
    <div className="card-base bg-white border border-gray-100 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-textDark mb-8">Surgery Logs 🖋️</h3>
      <div className="space-y-4">
        {history.map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="flex items-center justify-between p-4 bg-warmBg/30 rounded-2xl border border-gray-50 group hover:bg-white hover:border-primary-100 transition-smooth"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-textDark">{item.action}</h4>
                <p className="text-xs text-gray-400 font-medium">{item.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-600 font-black">Saved ₹{item.saved.toLocaleString()}</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{item.type}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
