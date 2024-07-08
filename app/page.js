'use client';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import MainSection from '../components/MyPage';
import InfoSection from '../components/InfoSection';

const HomePage = () => {
    const [language, setLanguage] = useState('HE'); // Default language set to 'HE'

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'AR' ? 'HE' : 'AR'));
    };

    return (
        <div style={styles.app}>
            <NavBar language={language} toggleLanguage={toggleLanguage} />
            <MainSection language={language}/>
            <InfoSection language={language} />
        </div>
    );
}

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
};

export default HomePage;
