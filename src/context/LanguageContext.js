// LanguageContext.js
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('lang'));

  const resetLanguage = () => {
    setSelectedLanguage(localStorage.getItem('lang')); // Set to your default language
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, resetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
