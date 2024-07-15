'use client';
import React, { useState } from 'react';
import NavBar from '/components/NavBar';
import InfoSection from '/components/InfoSection';
import WomenComponent from '/components/womenComponent';

const HomePage = () => {
    const [language, setLanguage] = useState('HE'); // Default language set to 'HE'

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'AR' ? 'HE' : 'AR'));
    };

    return (
        <div>
            <NavBar language={language} toggleLanguage={toggleLanguage} />
            <WomenComponent language={language} />
            <InfoSection language={language} />
            
        </div>
    );
}

export default HomePage;
