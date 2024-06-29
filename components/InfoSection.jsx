'use client';
import React, { useState } from 'react';

const redirectToLinkedIn = () => {
    window.location.href = 'https://www.linkedin.com/company/spoken-jerusalemite-%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-%D7%A9%D7%97%D7%95%D7%A8%D7%99%D7%9D-%D7%90%D7%9E%D7%A4%D7%A8%D7%99%D7%A7%D7%99%D7%9D-%D7%94%D7%99%D7%A9%D7%A8%D7%90%D7%9C%D7%99%D7%AA-%D7%9E%D7%93%D7%91%D7%95%D7%A8%D7%AA-%D7%9E%D7%9B%D7%A1%D7%99%D7%A0%D7%99%D7%99%D7%9D-%D7%A2%D7%9D-%D7%A4%D7%A2%D7%95%D7%9C%D7%95%D7%AA-%D7%9E%D7%93%D7%95%D7%91%D7%A8%D7%95%D7%AA-%D7%A9%D7%9C-%D7%A7%D7%91%D7%95%D7%A6%D7%95%D7%AA/';
};

const redirectToFacebook = () => {
    window.location.href = 'https://www.facebook.com/SpokenJerusalemite';
};

const redirectToInstagram = () => {
    window.location.href = 'https://www.instagram.com/spokenjerusalemite/';
};

const InfoSection = ({ language }) => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isEmailHovered, setIsEmailHovered] = useState(false);

    const handleMouseEnter = (buttonName) => {
        setHoveredButton(buttonName);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const handleEmailMouseEnter = () => {
        setIsEmailHovered(true);
    };

    const handleEmailMouseLeave = () => {
        setIsEmailHovered(false);
    };

    return (
        <section style={styles.info}>
           <h3><u><strong>{language === 'AR' ? 'تواصلو معنا' : 'צרו איתנו קשר'}</strong></u></h3>
           <p>
                <a
                    href="mailto:yerushalmitmeduberet@gmail.com"
                    style={isEmailHovered ? { ...styles.email, ...styles.emailHovered } : styles.email}
                    onMouseEnter={handleEmailMouseEnter}
                    onMouseLeave={handleEmailMouseLeave}
                >
                    yerushalmitmeduberet@gmail.com
                </a>
            </p>
            <div style={styles.row}>
                <button
                    style={hoveredButton === 'linkedin' ? { ...styles.imageButton, ...styles.enlargedImageButton } : styles.imageButton}
                    onMouseEnter={() => handleMouseEnter('linkedin')}
                    onMouseLeave={handleMouseLeave}
                    onClick={redirectToLinkedIn}
                >
                    <img src="/assets/images/LILogo.png" alt="LinkedIn" style={styles.image} />
                </button>
                <button
                    style={hoveredButton === 'facebook' ? { ...styles.imageButton, ...styles.enlargedImageButton } : styles.imageButton}
                    onMouseEnter={() => handleMouseEnter('facebook')}
                    onMouseLeave={handleMouseLeave}
                    onClick={redirectToFacebook}
                >
                    <img src="/assets/images/FBLogo.png" alt="Facebook" style={styles.image} />
                </button>
                <button
                    style={hoveredButton === 'instagram' ? { ...styles.imageButton, ...styles.enlargedImageButton } : styles.imageButton}
                    onMouseEnter={() => handleMouseEnter('instagram')}
                    onMouseLeave={handleMouseLeave}
                    onClick={redirectToInstagram}
                >
                    <img src="/assets/images/IGLogo.png" alt="Instagram" style={styles.image} />
                </button>
            </div>
        </section>
    );
};

const styles = {
    info: {
        color: 'rgb(33, 84, 84)',
        padding: '20px',
        backgroundColor: 'rgb(255, 247, 237)',
        textAlign: 'center',
        borderTop: '5px solid rgb(33, 84, 84)' // Add this line for the upper border
    },
    email: {
        color: 'rgb(33, 84, 84)',
        textDecoration: 'underline',
        transition: 'color 0.3s ease',
    },
    emailHovered: {
        color: 'rgb(245, 146, 149)',
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageButton: {
        margin: '0 1%',
        backgroundColor: 'rgb(255, 247, 237)',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: 'transform 0.3s ease',
    },
    enlargedImageButton: {
        transform: 'scale(1.2)', // Enlarge the button
    },
    image: {
        width: '4vw',
        height: '4vw',
        backgroundColor: 'rgb(255, 247, 237)'
    },
};

export default InfoSection;
