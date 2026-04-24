import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AuthCard = ({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) => {
  const navigate = useNavigate();

  const handleFooterLinkClick = () => {
    if (footerLink) {
      navigate(footerLink);
    }
  };

  return (
    <div className="min-h-screen flex-center bg-warmBg">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            className="mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="inline-block text-white rounded-2xl p-3 w-16 h-16 flex items-center justify-center font-bold text-2xl" style={{ background: 'linear-gradient(135deg, #1F7A63, #F4A261)' }}>
              SS
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold mb-2"
            style={{ color: '#4A4A4A' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="text-gray-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {children}
        </motion.div>

        {/* Footer */}
        {footerText && (
          <motion.div
            className="mt-6 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {footerText}{' '}
            {footerLinkText && (
              <button
                onClick={handleFooterLinkClick}
                className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
              >
                {footerLinkText}
              </button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCard;
