import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioMode, setPortfolioMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-mode') || 'logistics';
    }
    return 'logistics';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (portfolioMode === 'hr') {
      root.classList.add('mode-hr');
      root.classList.remove('mode-logistics');
    } else {
      root.classList.add('mode-logistics');
      root.classList.remove('mode-hr');
    }
    localStorage.setItem('portfolio-mode', portfolioMode);
  }, [portfolioMode]);

  return (
    <PortfolioContext.Provider value={{ portfolioMode, setPortfolioMode }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
