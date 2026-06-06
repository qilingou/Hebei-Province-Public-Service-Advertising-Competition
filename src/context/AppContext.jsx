import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = (username) => {
    setIsLoggedIn(true);
    setUser({
      name: username,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXWDZVQ5KFIVTZ9mBXNMI0apGgo0F-9c0MPBxBIuG9-vLRDt9bRgYfxT1FSE-N5M7_7zdl25mYJN1oc3oyrzPYJhVrS_UlfmB3zU1AlDYCvS1xNrG-4iUocl1iuXe9eZOx03KOnGs32YLT-zal0OJBqCUJ9zxNrzD78EfG20W9vfF3Go_IeEbgQR6Bv1pHaUi9BKk6PhnzoW2eIR-t7gJE8b785qqprOz99o1792IMeRuDqqkuGb_NmtZN4SSuEI0qvT_MpdMgaH6Q', // placeholder
      email: `${username}@hebeipublicads.cn`
    });
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoginModalOpen,
        setIsLoginModalOpen,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
