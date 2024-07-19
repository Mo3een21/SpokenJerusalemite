'use client';

import NavBar from '/components/NavBar';
import InfoSection from '@/components/InfoSection';
import DynamicForm from '/components/DynamicForm'; // Correct the import statement

import React, { useState } from 'react';
import './joinUs.css'; // Import the CSS file normally

const JoinUs = () => { // Capitalize the component name
  const [language, setLanguage] = useState('HE'); // Default language set to 'HE'

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'AR' ? 'HE' : 'AR'));
  };

  return (
    <div className="joinUs"> {/* Fix className usage */}
      <NavBar language={language} toggleLanguage={toggleLanguage} />
      <div className='flexer'>
     <img className='f2' src='/assets/images/suzan+lior.jpg'/>
      <DynamicForm  language = {language}/> 
      </div>
      <InfoSection language={language} />
    </div>
  );
};

export default JoinUs; // Capitalize the component name