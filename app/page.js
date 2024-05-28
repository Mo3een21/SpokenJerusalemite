import React from 'react';
import NavBar from '../components/NavBar';
import MainSection from '../components/MainSection';
import InfoSection from '../components/InfoSection';

const HomePage = () => {
    return (
        <div style={styles.app}>
            <NavBar />
            <MainSection />
            <InfoSection />
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
