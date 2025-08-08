import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedAdmin = localStorage.getItem('adminUser');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedAdmin) {
      setAdminUser(JSON.parse(savedAdmin));
    }
    setLoading(false);
  }, []);

  const handleLogin = (user) => {
    // Clear any existing admin session when user logs in
    setAdminUser(null);
    localStorage.removeItem('adminUser');
    
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleAdminLogin = (admin) => {
    console.log('AuthContext: handleAdminLogin called with:', admin);
    
    // Clear any existing user session when admin logs in
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    
    setAdminUser(admin);
    localStorage.setItem('adminUser', JSON.stringify(admin));
    
    console.log('AuthContext: Admin user set, currentUser cleared');
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
  };

  const isAuthenticated = currentUser || adminUser;
  const isAdmin = !!adminUser;
  const isUser = !!currentUser;

  const value = {
    currentUser,
    adminUser,
    isAuthenticated,
    isAdmin,
    isUser,
    loading,
    handleLogin,
    handleLogout,
    handleAdminLogin,
    handleAdminLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 