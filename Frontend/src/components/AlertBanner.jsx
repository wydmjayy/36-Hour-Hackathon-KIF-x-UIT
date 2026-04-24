import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AlertBanner = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-accent-50 border-l-4 border-accent-500 p-4 rounded-r-xl shadow-sm flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <p className="text-sm font-medium text-accent-700">{message}</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-accent-500 hover:text-accent-700 text-lg font-bold px-2"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertBanner;
