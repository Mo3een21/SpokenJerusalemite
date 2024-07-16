import React from 'react';
import './globals.css';  // Import global CSS

export const metadata = {
    title: 'Spoken Jerusalemite',
    description: 'Spoken Jerusalemite - Language exchange community',
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}

export default RootLayout;
