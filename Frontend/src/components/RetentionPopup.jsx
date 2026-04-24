import React from 'react';
import { motion } from 'framer-motion';

const RetentionPopup = ({ subscription, onAccept, onDecline, onClose }) => {
  if (!subscription) return null;

  const isZombie = subscription.zombieScore > 70;
  const longTimeNoSee = subscription.lastUsed.includes('month') || subscription.lastUsed.includes('year');
  
  const shouldDecline = isZombie || longTimeNoSee;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Banner */}
        <div className="bg-accent-500 p-6 text-center text-white">
          <div className="text-4xl mb-2">🎁</div>
          <h2 className="text-2xl font-bold">Wait! Special Offer</h2>
          <p className="text-white/80 font-medium">Don't leave us just yet!</p>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              Accept our offer and get <span className="text-accent-600 font-bold">50% OFF</span> for the next 3 months on your <span className="font-bold">{subscription.name}</span> subscription.
            </p>
          </div>

          {/* AI Recommendation Card */}
          <div className={`p-4 rounded-2xl border-2 mb-8 ${shouldDecline ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
            <div className="flex items-start gap-4">
              <span className="text-2xl">{shouldDecline ? '💡' : '✨'}</span>
              <div>
                <p className={`font-bold text-sm uppercase tracking-wider ${shouldDecline ? 'text-error' : 'text-green-600'}`}>
                  AI Suggests: {shouldDecline ? 'Decline' : 'Accept'}
                </p>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  {shouldDecline 
                    ? `You haven't used this in ${subscription.lastUsed}. The savings (₹${(subscription.price * 3).toLocaleString()}) outweigh the discount.`
                    : `Your usage is regular (${subscription.lastUsed}). This discount saves you ₹${(subscription.price * 0.5 * 3).toLocaleString()}!`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => onAccept(subscription)}
              className="w-full py-4 bg-accent-500 text-white font-bold rounded-2xl hover:bg-accent-600 transition-smooth shadow-lg shadow-accent-500/20"
            >
              Accept Offer
            </button>
            <button 
              onClick={() => onDecline(subscription)}
              className="w-full py-4 bg-white text-gray-400 font-bold rounded-2xl border border-gray-100 hover:bg-gray-50 transition-smooth"
            >
              Decline & Cancel
            </button>
          </div>
          
          <p className="text-[10px] text-gray-300 text-center mt-4 uppercase tracking-widest font-bold">
            Retention Simulator v1.0 • Claude API Ready
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RetentionPopup;
