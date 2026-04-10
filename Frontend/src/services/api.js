// API Service for Authentication
// This file is ready to be connected to a real backend API

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Login API call
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} User data with JWT token
 */
export const loginApi = async (email, password) => {
  try {
    // Simulate API call (replace with real axios call later)
    // const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    //   email,
    //   password,
    // });
    // return response.data;

    // For now, simulate a 2-second delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return {
      success: true,
      token: `jwt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user: {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
      },
    };
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

/**
 * Signup API call
 * @param {string} name - User full name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} User data with JWT token
 */
export const signupApi = async (name, email, password) => {
  try {
    // Simulate API call (replace with real axios call later)
    // const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
    //   name,
    //   email,
    //   password,
    // });
    // return response.data;

    // For now, simulate a 2-second delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    return {
      success: true,
      token: `jwt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user: {
        id: `user_${Date.now()}`,
        email,
        name,
      },
    };
  } catch (error) {
    throw new Error(error.message || 'Signup failed');
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Promise} Verification result
 */
export const verifyToken = async (token) => {
  try {
    // For now, just check if token exists
    // In production: send to backend to verify signature
    if (!token) {
      return { valid: false };
    }

    return {
      valid: true,
      message: 'Token is valid',
    };
  } catch (error) {
    return {
      valid: false,
      error: 'Token verification failed',
    };
  }
};

/**
 * Google OAuth callback
 * @param {string} googleToken - Token from Google
 * @returns {Promise} User data with JWT token
 */
export const googleLoginApi = async (googleToken) => {
  try {
    // In production: send googleToken to backend
    // const response = await axios.post(`${API_BASE_URL}/auth/google`, {
    //   token: googleToken,
    // });
    // return response.data;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      success: true,
      token: `jwt_google_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user: {
        id: `google_user_${Date.now()}`,
        email: `user${Math.random().toString(36).substr(2, 5)}@gmail.com`,
        name: 'Google User',
        provider: 'google',
      },
    };
  } catch (error) {
    throw new Error(error.message || 'Google login failed');
  }
};
