import React from 'react';

const InfoSection = () => {
    return (
        <section style={styles.info}>
            <h3>Information Section</h3>
            <p>Here is some important information at the bottom of the page.</p>
        </section>
    );
}

const styles = {
    info: {
        padding: '20px',
        backgroundColor: 'rgb(33, 84, 84)',
        textAlign: 'center'
    }
};

export default InfoSection;
