"use client";
import React, { useState, useRef, useEffect } from 'react';
import ProjectModal from '@/components/ProjectModal'; // import the modal component


const LanguageExchange = ({ language }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const projects = [
    {
      img: "./assets/images/5.jpeg",
      title: "חילופי שפות שבועיים تبادل لغات اسبوعي",
      description: language === 'AR' ? "لقاءات تبادل لغات أسبوعية (عبرية-عربية) بين النساء من شرق وغرب المدينة. أيام الإثنين، 17:30 في وسط المدينة" : "מפגשי חילופי שפות שבועיים (עברית-ערבית) בין נשים ממזרח ומערב העיר. ימי ב', 17:30 במרכז העיר"
    },
    {
      img: "./assets/images/default.jpeg",
      title: "אירועים קהילתיים مناسبات مجتمعية",
      description: language === 'AR' ? "المجتمع ينطلق إلى الميدان لتبادل اللغات بطرق ممتعة، كل بضعة أشهر" : "הקהילה יוצאת לשטח לחילופי שפות בדרכים חווייתיות, אחת לכמה חודשים"
    },
    {
      img: "./assets/images/default.jpeg",
      title: "זמינה לשיחה فاضية نحكي؟",
      description: language === 'AR' ? "منصة للعثور على شريكة للتدريب الشخصي أو عبر الزوم 24/7" : "פלטפורמה למציאת פרטנרית לתרגול פרונטלי או בזום 24/7"
    },
    {
      img: "./assets/images/default.jpeg",
      title: "סטודנטיות طالبات",
      description: language === 'AR' ? "مجموعة للقاءات التدريب العفوية بين الطالبات في المؤسسات المختلفة في المدينة" : "קבוצה למפגשי תרגול ספונטניים בין סטודנטיות במוסדות השונים בעיר"
    },
    {
      img: "./assets/images/default.jpeg",
      title: "זזות كزدورة",
      description: language === 'AR' ? "نمارس اللغة والرياضة أثناء التنقل - من جميع الأنواع" : "מתרגלות תוך כדי תזוזה - שפה וספורט, מכל הסוגים"
    },
    {
      img: "./assets/images/default.jpeg",
      title: "הפיל שבחדר الفيل بالغرفة",
      description: language === 'AR' ? "نأخذ علاقتنا خطوة إلى الأمام - تبادل لغات حول القضايا السياسية والراهنة" : "לוקחות את הקשר בינינו עוד צעד קדימה - חילופי שפות סביב סוגיות פוליטיות ואקטואליות"
    },
    {
      img: "./assets/images/default.jpeg",
      title: "בית המדרש محادثة دينية",
      description: language === 'AR' ? "لقاءات لتعلم اللغة من خلال دراسة نصوص وعادات من الديانات الثلاث" : "מפגשים ללימוד שפה דרך למידה מעמיקה של טקסטים ומנהגים משלוש הדתות"
    },
    {
      img: "./assets/images/default.jpeg",
      title: "נבחרת המתקדמות نخبة المتقدمات",
      description: language === 'AR' ? "لم تعد اللقاءات تشكل تحديا لك؟ في نخبة المناقشات والمناظرات حول قضايا فكرية متنوعة بين النساء ذوات المستويات العالية جدا في العبرية والعربية" : "המפגשים כבר לא מאתגרים אותך? בנבחרת דיונים ודיבייטים על סוגיות אינטלקטואליות מגוונות בין נשים עם רמות עברית וערבית גבוהות מאוד"
    },
    {
      img: "./assets/images/default.jpeg",
      title: "מתחילות לדבר مبتدئات",
      description: language === 'AR' ? "مجموعة للمبتدئات في الحديث" : "קבוצה למתחילות לדבר"
    }
  ];

  return (
    <div>
      <button className="scroll-button" onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}>
        {language === 'AR' ? 'للتعبئة' : 'לטופס'}
      </button>
      <div className='container'>
        {projects.map((project, index) => (
          <div className="project" key={index} onClick={() => handleProjectClick(project)}>
            <img src={project.img} alt={project.title} />
            <div className="project-title">{project.title}</div>
          </div>
        ))}
      </div>
      <ProjectModal show={showModal} onClose={handleCloseModal} project={selectedProject} />
      
      <div className='flexer'>
        <div className="contact-form" id="contact-form">
          <form>
            <label htmlFor="name">{language === 'AR' ? 'اسم:' : 'שם:'}</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">{language === 'AR' ? 'البريد الإلكتروني:' : 'מייל:'}</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="phone">{language === 'AR' ? 'هاتف:' : 'טלפון:'}</label>
            <input type="tel" id="phone" name="phone" required />

            <label htmlFor="subject">{language === 'AR' ? 'موضوع الاستفسار:' : 'נושא הפנייה:'}</label>
            <select id="subject" name="subject" required>
              <option value="">{language === 'AR' ? '...اختر الموضوع' : 'בחר נושא...'}</option>
              <option value="language_exchange">{language === 'AR' ? 'تبادل اللغات' : 'חילופי שפות'}</option>
              <option value="hebrew_arabic_courses">{language === 'AR' ? 'دورات عبرية / عربية محكية' : 'קורסי עברית / ערבית מדוברת'}</option>
              <option value="translation_services">{language === 'AR' ? 'طلب خدمات الترجمة' : 'הזמנת שירותי תרגום'}</option>
              <option value="workshop_activity">{language === 'AR' ? 'طلب ورشة عمل أو نشاط' : 'הזמנת סדנה או פעילות'}</option>
              <option value="volunteering">{language === 'AR' ? 'تطوع' : 'התנדבות'}</option>
              <option value="employment_help">{language === 'AR' ? 'مساعدة في التوظيف' : 'עזרה בתעסוקה'}</option>
              <option value="donation">{language === 'AR' ? 'تبرع' : 'תרומה'}</option>
              <option value="other">{language === 'AR' ? 'أخرى' : 'נושא אחר'}</option>
            </select>

            <label htmlFor="message">{language === 'AR' ? 'نص الرسالة:' : 'רוצה לספר לנו עוד'}</label>
            <textarea id="message" name="message"></textarea>
            <button type="submit">{language === 'AR' ? 'إرسال' : 'שלח'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LanguageExchange;
