import React from 'react';
import { motion } from 'framer-motion';

const AlertCard = ({ alert, onAction, onDismiss }) => {
  const { id, type, title, description, timeRemaining, isUrgent, aiSuggestion, icon } = alert;

  const typeStyles = {
    urgent: 'border-red-200 bg-red-50 text-red-600',
    info: 'border-blue-200 bg-blue-50 text-blue-600',
    warning: 'border-orange-200 bg-orange-50 text-orange-600',
  };

  const urgencyTag = isUrgent ? (
    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Urgent</span>
  ) : (
    <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Info</span>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`card-base p-6 border-2 mb-4 transition-smooth flex flex-col md:flex-row gap-6 relative group ${isUrgent ? 'border-red-100' : 'border-gray-100 bg-white'}`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${isUrgent ? 'bg-red-100' : 'bg-gray-50'}`}>
        {icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-bold text-textDark text-lg">{title}</h3>
          {urgencyTag}
        </div>
        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <span className="text-lg">⏰</span>
            {timeRemaining}
          </div>
          <div className="h-4 w-px bg-gray-100"></div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary-500 bg-primary-50 px-3 py-1 rounded-lg">
            <span className="text-md">🤖</span>
            AI Suggestion: {aiSuggestion}
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => onAction(alert)}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-smooth ${isUrgent ? 'bg-error text-white shadow-lg shadow-red-500/20 hover:bg-red-600' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
          >
            {type === 'trial' ? 'Cancel Trial' : 'Manage Plan'}
          </button>
          <button 
            onClick={() => onDismiss(id)}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-gray-400 border border-gray-100 hover:bg-gray-50 transition-smooth"
          >
            Ignore
          </button>
        </div>
      </div>

      <button 
        onClick={() => onDismiss(id)}
        className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity text-xl"
      >
        &times;
      </button>
    </motion.div>
  );
};

export default AlertCard;
