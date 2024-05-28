import React from 'react';

const MainSection = () => {
    return (
        <main style={{ ...styles.main, marginTop: '60px', minHeight: 'calc(100vh - 60px)' }}>{/* Adjust the top margin based on the height of the navbar */}
            <h2>Welcome to the Main Section</h2>
            <p>This is the main content of the homepage.</p>
        </main>
    );
}

const styles = {
    main: {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: 'rgb(255, 247, 237)',
        flex: 1,
        height:'500vh'
    }
};

export default MainSection;