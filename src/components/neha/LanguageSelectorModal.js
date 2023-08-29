// LanguageSelectorModal.js

import React from 'react';
import './LanguageSelectorModal.css'; // Import your CSS file
import { useLanguage } from '../../context/LanguageContext' ;
import i18next from 'i18next';
import { useTranslation } from "react-i18next";
import { useState } from 'react';


const LanguageSelectorModal = ({ languages, onSelect }) => {

  const { t } = useTranslation("translation", { keyPrefix: 'home' });


 
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const handleLanguageClick = (language_key) => {
    onSelect(language_key);
    setSelectedLanguage(language_key);
  };
  
  return (
    <div className="modal-container">
      <h4>{t('select_your_language')}</h4>
      <ul className="language-list">
        {languages.map(language => (
          <li
            key={language.key}
            onClick={() => handleLanguageClick(language.key)}
            className="language-option"
          >
            <label className='checkbox-label'>
              <input
                type="radio"
                checked={language.key === selectedLanguage}
                readOnly
              />
              {language.value}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelectorModal;
