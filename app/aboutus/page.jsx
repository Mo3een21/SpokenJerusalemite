'use client';
import React, { useState } from 'react';
import NavBar from '/components/NavBar';
import AboutusComponent from '/components/AboutusComponent';
import InfoSection from '/components/InfoSection';
import './aboutus.css'; // Import the CSS file normally

const AboutUs = () => {
    const [language, setLanguage] = useState('HE'); // Default language set to 'HE'

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'AR' ? 'HE' : 'AR'));
    };

    return (
        <div className="styles.aboutus">
            <NavBar language={language} toggleLanguage={toggleLanguage} />
            
        
            <AboutusComponent language={language} />
        
            <InfoSection language={language} />
        </div>
    );
};

export default AboutUs;