import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTrim from '../hooks/useTrim';
import RetentionPopup from './RetentionPopup';

const EmailDraftModal = ({ subscription, onClose }) => {
  const { generateEmailDraft } = useTrim();
  const [draft, setDraft] = useState({ to: '', subject: '', body: '' });
  const [isSent, setIsSent] = useState(false);
  const [showRetention, setShowRetention] = useState(false);

  useEffect(() => {
    if (subscription) {
      setDraft(generateEmailDraft(subscription));
    }
  }, [subscription]);

  const handleSend = () => {
    setIsSent(true);
    // Simulate sending delay
    setTimeout(() => {
      setShowRetention(true);
    }, 1200);
  };

  const handleAcceptOffer = (sub) => {
    const savings = Math.round(sub.price * 0.5 * 3);
    alert(`🎉 Awesome! You accepted the offer. You saved ₹${savings.toLocaleString()} over the next 3 months!`);
    onClose();
  };

  const handleDeclineOffer = (sub) => {
    alert(`✅ Subscription Cancelled! You've successfully terminated ${sub.name}. ₹${sub.price.toLocaleString()} added to your monthly savings.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-textDark/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: 20, rotateX: 10 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="bg-primary-500 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{subscription.icon}</span>
            <h3 className="font-bold">Cancellation Draft: {subscription.name}</h3>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-2xl">&times;</button>
        </div>

        <div className="p-8">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">To</label>
              <input 
                type="text" 
                value={draft.to}
                readOnly
                className="w-full bg-warmBg p-3 rounded-xl border border-gray-100 font-medium text-textDark outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Subject</label>
              <input 
                type="text" 
                value={draft.subject}
                onChange={(e) => setDraft({...draft, subject: e.target.value})}
                className="w-full bg-warmBg p-3 rounded-xl border border-gray-100 font-medium text-textDark outline-none focus:border-primary-300"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Email Body (AI Generated)</label>
              <textarea 
                rows="6"
                value={draft.body}
                onChange={(e) => setDraft({...draft, body: e.target.value})}
                className="w-full bg-warmBg p-4 rounded-xl border border-gray-100 font-medium text-textDark outline-none focus:border-primary-300 resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl hover:bg-gray-100 transition-smooth"
            >
              Discard
            </button>
            <button 
              onClick={handleSend}
              disabled={isSent}
              className="flex-2 py-4 px-8 bg-error text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 hover:bg-red-600 transition-smooth flex items-center justify-center gap-2"
            >
              {isSent ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                '🚀 Send Cancellation Request'
              )}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showRetention && (
          <RetentionPopup 
            subscription={subscription}
            onAccept={handleAcceptOffer}
            onDecline={handleDeclineOffer}
            onClose={() => setShowRetention(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmailDraftModal;
