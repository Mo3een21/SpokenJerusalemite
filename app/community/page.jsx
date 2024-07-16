"use client";
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import LanguageExchange from '@/components/communityComponent';
import InfoSection from '/components/InfoSection';
import styles from './community.css';

const Community = () => {
    const [language, setLanguage] = useState('HE'); // Default language set to 'HE'

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'AR' ? 'HE' : 'AR'));
    };

    return (
        <div style={styles.community}>
            <NavBar language={language} toggleLanguage={toggleLanguage} />
            <div>
              
                <LanguageExchange language={language} />
            </div>
            <InfoSection language={language}/>
        </div>
    );
};

export default Community;
