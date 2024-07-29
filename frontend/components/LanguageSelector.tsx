import React from 'react';
import { languages_gTTS } from '../components/languages'; // Adjust the path based on your file structure

interface LanguageSelectorProps {
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
    return (
        <select value={selectedLanguage} onChange={(e) => onLanguageChange(e.target.value)}>
            <option value="">Select Language</option>
            {Object.entries(languages_gTTS).map(([languageName, languageCode]) => (
                <option key={languageCode} value={languageCode}>
                    {languageName}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
