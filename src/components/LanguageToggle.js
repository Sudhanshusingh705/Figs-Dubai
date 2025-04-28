import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/LanguageToggle.css';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    toggleLanguage();
    setIsActive(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsActive(false);
  };

  return (
    <div className={`language-toggle ${isActive ? 'is-active' : ''}`}>
      {isActive ? (
        <div className="language-toggle-active">
          <span className="language-status">
            {language === 'en' ? 'English' : 'العربية'}
          </span>
          <button 
            className="language-close-btn"
            onClick={handleClose}
            aria-label="Close translator"
          >
            <span className="close-icon">×</span>
          </button>
        </div>
      ) : (
        <button 
          className="language-btn"
          onClick={handleToggle}
          aria-label="Translate"
        >
          <span className="language-icon">🌐</span>
        </button>
      )}
    </div>
  );
};

export default LanguageToggle; 