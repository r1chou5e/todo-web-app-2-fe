import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    message: '',
    type: '',
    isVisible: false,
  });

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type, isVisible: true });
    setTimeout(
      () => setAlert({ message: '', type: '', isVisible: false }),
      3000
    );
  };

  const hideAlert = () => setAlert({ message: '', type: '', isVisible: false });

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
