'use client';
import React, { useState, useEffect } from 'react';

const NavBar = ({ language, toggleLanguage })  => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null); // State to track hovered button
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [isZoomedIn, setIsZoomedIn] = useState(false); // New state for zoomed-in view

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobileView(true);
                setIsNavOpen(false); // Close nav list when in mobile view
            } else {
                setIsMobileView(false);
            }
        };

        handleResize(); // Call the function to set initial state
        window.addEventListener('resize', handleResize); // Add event listener for window resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup the event listener
        };
    }, []);

    const handleLogoMouseEnter = () => {
        setIsLogoHovered(true);
    };

    const handleLogoMouseLeave = () => {
        setIsLogoHovered(false);
    };

    const handleMouseEnter = (itemName) => {
        setHoveredItem(itemName);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleButtonMouseEnter = (buttonName) => {
        setHoveredButton(buttonName);
    };

    const handleButtonMouseLeave = () => {
        setHoveredButton(null);
    };

    const handleLogoClick = () => {
        window.location.href = '/'; // Redirect to the home page
    };

    const getItemStyle = (itemName) => {
        if (hoveredItem === itemName) {
            return {
                // backgroundColor: 'rgb(53, 114, 114)',
            };
        }
        return {};
    };

    const getLinkStyle = (itemName) => {
        const transitionDelay = '0.3s';
        if (hoveredItem === itemName) {
            return {
                color: 'rgb(245, 146, 149)',
                textDecoration: 'underline',
                transition: `color ${transitionDelay} ease, text-decoration ${transitionDelay} ease`,
            };
        }
        return {
            color: 'rgb(33, 84, 84)',
            textDecoration: 'none',
            transition: `color ${transitionDelay} ease, textDecoration ${transitionDelay} ease`,
        };
    };



    const redirectToLinkedIn = () => {
        window.location.href = 'https://www.linkedin.com/company/spoken-jerusalemite-%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%9E%D7%99%D7%AA-%D7%9E%D7%93%D7%95%D7%91%D7%A8%D7%AA-%D9%9E%D8%AD%D8%A7%D8%93%D8%AA%D8%A9-%D9%85%D9%82%D8%AF%D8%B3%D9%99%D8%A9/';
    };

    const redirectToFacebook = () => {
        window.location.href = 'https://www.facebook.com/SpokenJerusalemite';
    };

    const redirectToInstagram = () => {
        window.location.href = 'https://www.instagram.com/spokenjerusalemite/';
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
        setIsZoomedIn(isMobileView && !isNavOpen); // Set isZoomedIn only in mobile view and when opening the nav
    };

    const navItems = {
        HE: [
            { label: 'דף ראשי', id: 'home', url: '../' },
            { label: 'מי אנחנו', id: 'aboutus', url: '../aboutus' },
            { label: 'קהילה לומדת: חילופי שפות', id: 'community', url: '../community' },
            { label: 'שפה להזדמנויות', id: 'chance', url: '../chance' },
            { label: 'נשות הקהילה', id: 'women', url: '../women' },
            { label: 'קורסי שפה', id: 'courses', url: '../courses' },
            { label: 'שירותי תרגום', id: 'services', url: '../services' },
            { label: 'הצטרפו אלינו', id: 'joinus', url: '../joinus' },
            { label: 'תמכו בנו', id: 'donate', url: '../donate' }
        ],
        AR: [
            { label: 'الصفحة الرئيسية', id: 'home', url: '../' },
            { label: 'من نحن', id: 'aboutus', url: '../aboutus' },
            { label: 'مجتمع تعلم: تبادل اللغات', id: 'community', url: '../community' },
            { label: 'اللغة للفرص', id: 'chance', url: '../chance' },
            { label: 'نساء المجتمع', id: 'women', url: '../women' },
            { label: 'دورات اللغة', id: 'courses', url: '../courses' },
            { label: 'خدمات الترجمة', id: 'services', url: '../services' },
            { label: 'انضموا إلينا', id: 'joinus', url: '../joinus' },
            { label: 'ادعمونا', id: 'donate', url: '../donate' }
        ]
    };

    return (
        <nav style={styles.nav}>
            {isMobileView && (
                <a
                    href="javascript:void(0)"
                    className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px ShowWhenFocus"
                    id="kt_header_menu_mobile_toggle"
                    aria-label="פתיחת תפריט אישי להגדרות משתמש"
                    aria-expanded={isNavOpen}
                    role="button"
                    onClick={toggleNav}
                >
                    <span className="svg-icon svg-icon-2x" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'none' }}>
                            <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="black"></path>
                            <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="black"></path>
                        </svg>
                    </span>
                </a>
            )}
            <div style={styles.row}>
                <button
                    style={hoveredButton === 'linkedin' ? { ...styles.imageButton, ...styles.enlargedImageButton } : styles.imageButton}
                    onMouseEnter={() => handleButtonMouseEnter('linkedin')}
                    onMouseLeave={handleButtonMouseLeave}
                    onClick={redirectToLinkedIn}
                >
                    <img src="/assets/images/LILogo.png" alt="LinkedIn" style={styles.image} />
                </button>
                <button
                    style={hoveredButton === 'facebook' ? { ...styles.imageButton, ...styles.enlargedImageButton } : styles.imageButton}
                    onMouseEnter={() => handleButtonMouseEnter('facebook')}
                    onMouseLeave={handleButtonMouseLeave}
                    onClick={redirectToFacebook}
                >
                    <img src="/assets/images/FBLogo.png" alt="Facebook" style={styles.image} />
                </button>
                <button
                    style={hoveredButton === 'instagram' ? { ...styles.imageButton, ...styles.enlargedImageButton } : styles.imageButton}
                    onMouseEnter={() => handleButtonMouseEnter('instagram')}
                    onMouseLeave={handleButtonMouseLeave}
                    onClick={redirectToInstagram}
                >
                    <img src="/assets/images/IGLogo.png" alt="Instagram" style={styles.image} />
                </button>
                <button
                    style={hoveredButton === 'language' ? { ...styles.languageButton, ...styles.enlargedLanguageButton } : styles.languageButton}
                    onMouseEnter={() => handleButtonMouseEnter('language')}
                    onMouseLeave={handleButtonMouseLeave}
                    onClick={toggleLanguage}
                >
                    {language === 'AR' ? 'HE' : 'AR'}
                </button>
            </div>
            <ul style={isMobileView 
                ? { 
                    ...styles.navList,
                    display: (isNavOpen ? 'flex' : 'none'),
                    flexDirection: (isZoomedIn ? 'column' : 'row'),
                    position: 'absolute',
                    top: '60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgb(255, 247, 237)',
                    border: '2px solid rgb(33, 84, 84)',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    padding: '10px',
                    zIndex: 1000
                } 
                : styles.navList
            }>
                {navItems[language].map(({ label, id, url }) => (
                    <li
                        key={id}
                        style={{ ...(isMobileView ? styles.mobileNavItem : styles.navItem), ...getItemStyle(label) }}
                        onMouseEnter={() => handleMouseEnter(label)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <a href={url} style={{ ...styles.navLink, ...getLinkStyle(label) }}>
                            <strong>{label}</strong>
                            {hoveredItem === label && <div style={styles.navItemUnderline}></div>}
                        </a>
                    </li>
                ))}
            </ul>
            <button
                style={isLogoHovered ? { ...styles.logoButton, ...styles.enlargedLogo } : styles.logoButton}
                onClick={handleLogoClick}
                onMouseEnter={handleLogoMouseEnter}
                onMouseLeave={handleLogoMouseLeave}
            >
                <img src="/assets/images/SJLogo2.png" alt="Website Logo" style={styles.logo} />
            </button>
            <button style={styles.navToggleButton} onClick={toggleNav}>
                {isNavOpen ? 'Close' : 'Open'}
            </button>
        </nav>
    );
}

const styles = {
    nav: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2px 2%', // Decreased top and bottom padding
        backgroundColor: 'rgb(255, 247, 237)',
        color: 'rgb(247, 199, 201)',
        borderBottom: '4px solid rgb(33, 84, 84)',
        height: '60px', // Decreased the height of the navigation bar
    },
    navList: {
        listStyleType: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
        direction: 'rtl',
    },
    navListHidden: {
        display: 'none',
    },
    navItem: {
        marginLeft: '2%',
        transition: 'background-color 0.9s',
        color: 'rgb(33, 84, 84)',
    },
    navLink: {
        color: 'rgb(33, 84, 84)', // Changed the color
        textDecoration: 'none', // Removed the underline
    },
    languageButton: {
        margin: '0 1%',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        padding: 0,
        color: 'rgb(33, 84, 84)',
        fontSize: '14px',
        transition: 'transform 0.3s ease, background-color 0.3s ease', // Add transition
        height: '10vh', // Adjust the height using viewport height (vh)
        width: '10vh', // Adjust the width using viewport height (vh)
        fontWeight: 'bold',
        border: 'none', // Ensure there's no border
        outline: 'none', // Ensure there's no outline
    },
    enlargedLanguageButton: {
        transform: 'scale(1.1)', // Enlarge the button on hover
        color: 'rgb(245, 146, 149)', // Change background color on hover
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
        transform: 'scale(1.1)',
    },
    image: {
        width: '4vw',
        height: '4vw',
        backgroundColor: 'rgb(255, 247, 237)'
    },
    logo: {
        width: '10vw',
        height: '8vw',
        margin: 0
    },
    row: {
        display: 'flex',
        alignItems: 'center',
    },
    logoButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '3%',
        width: '14vw',
        height: '10vw',
        transition: 'transform 0.3s ease',
    },
    navToggleButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        color: 'rgb(33, 84, 84)',
        fontSize: '14px',
        display: 'none', // Hide the button by default
    },
    enlargedLogo: {
        transform: 'scale(1.1)',
    },
    customLink: {
        color: 'rgb(33, 84, 84)', // Changed the color
        textDecoration: 'none', // Removed the underline for all links
    },
};

export default NavBar;
