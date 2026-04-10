import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import PasswordStrength from '../components/PasswordStrength';
import SocialLogin from '../components/SocialLogin';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error, isAuthenticated, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when form changes
  useEffect(() => {
    clearError();
  }, [formData, clearError]);

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = 'Name should only contain letters and spaces';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      termsAccepted &&
      Object.keys(validateForm()).length === 0
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on blur
    const errors = validateForm();
    if (errors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: errors[name],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0 || !termsAccepted) {
      setFormErrors(errors);
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    // Call signup function
    const result = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    if (result.success) {
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setFormErrors({});
      setTermsAccepted(false);

      // Navigate to home (handled by useEffect watching isAuthenticated)
    } else {
      // Error is already displayed from the context
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Join Subscription Surgeon and take control"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message display */}
        {error && (
          <motion.div
            className="p-4 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: 'rgba(232, 88, 92, 0.1)', borderColor: '#E8585C', borderWidth: '1px' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              style={{ color: '#E8585C' }}
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-medium" style={{ color: '#E8585C' }}>Signup failed</p>
              <p className="text-xs" style={{ color: 'rgba(232, 88, 92, 0.8)' }}>{error}</p>
            </div>
          </motion.div>
        )}

        {/* Name field */}
        <InputField
          label="Full name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && formErrors.name}
          placeholder="John Doe"
          required
        />

        {/* Email field */}
        <InputField
          label="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && formErrors.email}
          placeholder="you@example.com"
          required
        />

        {/* Password field */}
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && formErrors.password}
          placeholder="••••••••"
          required
        />

        {/* Password Strength Indicator */}
        {formData.password && (
          <PasswordStrength password={formData.password} />
        )}

        {/* Confirm Password field */}
        <InputField
          label="Confirm password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && formErrors.confirmPassword}
          placeholder="••••••••"
          required
        />

        {/* Terms & Conditions */}
        <motion.div
          className="flex items-start gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer accent-primary-500 mt-0.5 flex-shrink-0"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the{' '}
            <button
              type="button"
              onClick={() => window.open('#', '_blank')}
              className="font-medium transition-colors"
              style={{ color: '#1F7A63' }}
            >
              Terms & Conditions
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => window.open('#', '_blank')}
              className="font-medium transition-colors"
              style={{ color: '#1F7A63' }}
            >
              Privacy Policy
            </button>
            <span className="ml-1" style={{ color: '#E8585C' }}>*</span>
          </label>
        </motion.div>

        {/* Signup button */}
        <motion.button
          type="submit"
          disabled={!isFormValid() || isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-5 h-5"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </motion.div>
              <span>Creating account...</span>
            </>
          ) : (
            'Create account'
          )}
        </motion.button>

        {/* Social Login */}
        <SocialLogin />
      </form>
    </AuthCard>
  );
};

export default Signup;
