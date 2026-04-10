import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import SocialLogin from '../components/SocialLogin';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

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

    return errors;
  };

  const isFormValid = () => {
    return formData.email && formData.password && Object.keys(validateForm()).length === 0;
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
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setTouched({
        email: true,
        password: true,
      });
      return;
    }

    // Call login function
    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Save remember me preference
      if (rememberMe) {
        localStorage.setItem('remember_email', formData.email);
      }

      // Reset form
      setFormData({ email: '', password: '' });
      setFormErrors({});

      // Navigate to home (handled by useEffect watching isAuthenticated)
    } else {
      // Error is already displayed from the context
    }
  };

  return (
    <AuthCard
      title="Subscription Surgeon"
      subtitle="Manage your subscriptions like a pro"
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkText="Sign up"
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
              <p className="text-sm font-medium" style={{ color: '#E8585C' }}>Login failed</p>
              <p className="text-xs" style={{ color: 'rgba(232, 88, 92, 0.8)' }}>{error}</p>
            </div>
          </motion.div>
        )}

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

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer accent-primary-500"
            />
            <span className="text-gray-700">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="font-medium transition-colors"
            style={{ color: '#1F7A63' }}
            disabled
          >
            Forgot password?
          </button>
        </div>

        {/* Login button */}
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
              <span>Signing in...</span>
            </>
          ) : (
            'Sign in'
          )}
        </motion.button>

        {/* Social Login */}
        <SocialLogin />
      </form>
    </AuthCard>
  );
};

export default Login;
