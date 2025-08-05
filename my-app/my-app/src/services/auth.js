// Authentication utility functions

// Check if user is logged in
export const isAuthenticated = () => {
  return !!sessionStorage.getItem('token');
};

// Get current user data
export const getCurrentUser = () => {
  const userData = sessionStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Logout user
export const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userData');
};

// Set user session data
export const setUserSession = (token, userData) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userData', JSON.stringify(userData));
};

// Get auth token
export const getAuthToken = () => {
  return sessionStorage.getItem('token');
}; 