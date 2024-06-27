"use client";
import React, { useState } from 'react';
import ProjectModal from '@/components/ProjectModal'; // import the modal component

const projects = [
  {
    img: "./assets/images/5.jpeg",
    title: "חילופי שפות שבועיים تبادل لغات اسبوعي",
    description: "מפגשי חילופי שפות שבועיים (עברית-ערבית) בין נשים ממזרח ומערב העיר. ימי ב', 17:30 במרכז העיר"
  },
  {
    img: "./assets/images/",
    title: "אירועים קהילתיים مناسبات مجتمعية",
    description: "הקהילה יוצאת לשטח לחילופי שפות בדרכים חווייתיות, אחת לכמה חודשים"
  },
  {
    img: "./assets/images/",
    title: "זמינה לשיחה فاضية نحكي؟",
    description: "פלטפורמה למציאת פרטנרית לתרגול פרונטלי או בזום 24/7"
  },
  {
    img: "./assets/images/",
    title: "סטודנטיות طالبات",
    description: "קבוצה למפגשי תרגול ספונטניים בין סטודנטיות במוסדות השונים בעיר"
  },
  {
    img: "./assets/images/",
    title: "זזות كزدورة",
    description: "מתרגלות תוך כדי תזוזה - שפה וספורט, מכל הסוגים"
  },
  {
    img: "./assets/images/",
    title: "הפיל שבחדר الفيل بالغرفة",
    description: "לוקחות את הקשר בינינו עוד צעד קדימה - חילופי שפות סביב סוגיות פוליטיות ואקטואליות"
  },
  {
    img: "./assets/images/",
    title: "בית המדרש محادثة דينية",
    description: "מפגשים ללימוד שפה דרך למידה מעמיקה של טקסטים ומנהגים משלוש הדתות"
  },
  {
    img: "./assets/images/",
    title: "נבחרת המתקדמות نخبة المتقدمات",
    description: "המפגשים כבר לא מאתגרים אותך? בנבחרת דיונים ודיבייטים על סוגיות אינטלקטואליות מגוונות בין נשים עם רמות עברית וערבית גבוהות מאוד"
  },
  {
    img: "./assets/images/",
    title: "מתחילות לדבר مبتدئات",
    description: "קבוצה למתחילות לדבר"
  }
];




  const LanguageExchange = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const handleProjectClick = (project) => {
      setSelectedProject(project);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    return (
      <div>
      <div className='container'>
        {projects.map((project, index) => (
          <div className="project" key={index} onClick={() => handleProjectClick(project)}>
            <img src= {project.img} alt={project.title} />
            <div className="project-title">{project.title}</div>
          </div>
        ))}
        </div>
        <ProjectModal show={showModal} onClose={handleCloseModal} project={selectedProject} />

        <div className='flexer'>
        <div class="contact-form">
<form  /*ref={form} onSubmit={handleSubmit}*/>
    <label for="name">שם:</label>
    <input type="text" id="name" name="name" required /*ref={nameRef} *//>
    
    <label for="email">מייל:</label>
    <input type="email" id="email" name="email" required /*ref={emailRef}*//>
    
    <label for="phone">טלפון:</label>
    <input type="tel" id="phone" name="phone" required /*ref={phoneRef}*//>
    
    <label for="subject">נושא הפנייה:</label>
    <select id="subject" name="subject" required /*ref={subjectRef}*/>
        <option value="">בחר נושא</option>
        <option value="language_exchange">חילופי שפות</option>
        <option value="hebrew_arabic_courses">קורסי עברית / ערבית מדוברת</option>
        <option value="translation_services">הזמנת שירותי תרגום</option>
        <option value="workshop_activity">הזמנת סדנה או פעילות</option>
        <option value="volunteering">התנדבות</option>
        <option value="employment_help">עזרה בתעסוקה (רק בערבית)</option>
        <option value="donation">תרומה</option>
        <option value="other">נושא אחר</option>
    </select>
    
    <label for="message">רוצה לספר לנו עוד?</label>
    <textarea id="message" name="message" /*ref={messageRef}*/></textarea>
   <button type="submit">שלח</button>
</form>
</div>   
       </div>
       </div>
  );
};

export default LanguageExchange;
