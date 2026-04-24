import React from 'react';
import { motion } from 'framer-motion';

const PasswordStrength = ({ password }) => {
  const calculateStrength = () => {
    if (!password) return { level: 0, label: '', color: '', textColor: '' };

    let strength = 0;

    // Length check
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    if (password.length >= 14) strength += 1;

    // Character diversity checks
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 1;

    // Normalize to 0-3 scale
    const normalizedStrength = Math.min(Math.ceil(strength / 2), 3);

    const strengthMap = {
      0: { level: 0, label: 'No password', color: '#d3d3d3', textColor: '#707070' },
      1: { level: 1, label: 'Weak', color: '#E8585C', textColor: '#E8585C' },
      2: { level: 2, label: 'Medium', color: '#f4a261', textColor: '#c97936' },
      3: { level: 3, label: 'Strong', color: '#4CAF50', textColor: '#388e3c' },
    };

    return strengthMap[normalizedStrength];
  };

  const strength = calculateStrength();

  const requirements = [
    {
      label: 'At least 6 characters',
      met: password.length >= 6,
    },
    {
      label: 'Mix of uppercase and lowercase',
      met: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    {
      label: 'Contains numbers',
      met: /[0-9]/.test(password),
    },
    {
      label: 'Contains special characters',
      met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    },
  ];

  if (!password) return null;

  return (
    <motion.div
      className="mt-4 space-y-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Strength meter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">
            Password Strength
          </label>
          <span
            className="text-sm font-semibold"
            style={{ color: strength.textColor }}
          >
            {strength.label}
          </span>
        </div>

        <div className="flex gap-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          {[1, 2, 3].map((segment) => (
            <motion.div
              key={segment}
              className="flex-1"
              style={{
                backgroundColor: segment <= strength.level ? strength.color : '#e0e0e0'
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: segment <= strength.level ? 1 : 0 }}
              transition={{ delay: segment * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Requirements checklist */}
      <div className="space-y-2">
        <p className="text-xs text-gray-600 font-medium">
          Password should contain:
        </p>
        <div className="space-y-1.5">
          {requirements.map((req, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 text-xs"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <motion.div
                animate={{
                  scale: req.met ? 1 : 0.8,
                  backgroundColor: req.met ? '#4CAF50' : '#d2d2d2',
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill={req.met ? 'white' : '#808080'}
                  viewBox="0 0 20 20"
                >
                  {req.met ? (
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
              </motion.div>
              <span
                className={
                  req.met ? 'text-gray-700' : 'text-gray-500'
                }
              >
                {req.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PasswordStrength;
