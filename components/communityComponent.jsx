"use client";
import React, { useState, useRef } from 'react';
import ProjectModal from '@/components/ProjectModal'; // import the modal component
import Modal from '@/components/Modal';
import CommunityForm from '@/components/CommunityForm'; // Correctly import CommunityForm
import emailjs from '@emailjs/browser';

emailjs.init({
  publicKey: 'tWA5BESHzduW8do5B',
  blockHeadless: true,
  limitRate: {
    id: 'app',
    throttle: 10000,
  },
});

const LanguageExchange = ({ language }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const groupRef = useRef();
  const levelRef = useRef();
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formBoolean, setFormBoolean] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormBoolean(false);
  };

  const projects = [
    {
      img: "./assets/images/5.jpeg",
      title: "חילופי שפות שבועיים تبادل لغات اسبوعي",
      description: language === 'AR' ? "لقاءات تبادل لغات أسبوعية (عبرية-عربية) بين النساء من شرق وغرب المدينة. أيام الإثنين، 17:30 في وسط المدينة" : "מפגשי חילופי שפות שבועיים (עברית-ערבית) בין נשים ממזרח ומערב העיר. ימי ב', 17:30 במרכז העיר"
    },
    {
      img: "./assets/images/6.jpg",
      title: "אירועים קהילתיים مناسبات مجتمعية",
      description: language === 'AR' ? "المجتمع ينطلق إلى الميدان لتبادل اللغات بطرق ممتعة، كل بضعة أشهر" : "הקהילה יוצאת לשטח לחילופי שפות בדרכים חווייתיות, אחת לכמה חודשים"
    },
    {
      img: "./assets/images/9.jpeg",
      title: "זמינה לשיחה فاضية نحكي؟",
      description: language === 'AR' ? "منصة للعثور على شريكة للتدريب الشخصي أو عبر الزوم 24/7" : "פלטפורמה למציאת פרטנרית לתרגול פרונטלי או בזום 24/7"
    },
    {
      img: "./assets/images/8.jpeg",
      title: "סטודנטיות طالبات",
      description: language === 'AR' ? "مجموعة للقاءات التدريب العفوية بين الطالبات في المؤسسات المختلفة في المدينة" : "קבוצה למפגשי תרגול ספונטניים בין סטודנטיות במוסדות השונים בעיר"
    },
    {
      img: "./assets/images/7.jpeg",
      title: "זזות كزدورة",
      description: language === 'AR' ? "نمارس اللغة والرياضة أثناء التنقل - من جميع الأنواع" : "מתרגלות תוך כדי תזוזה - שפה וספורט, מכל הסוגים"
    },
    {
      img: "./assets/images/elephant.jpg",
      title: "הפיל שבחדר الفيل بالغرفة",
      description: language === 'AR' ? "نأخذ علاقتنا خطوة إلى الأمام - تبادل لغات حول القضايا السياسية والراهنة" : "לוקחות את הקשר בינינו עוד צעד קדימה - חילופי שפות סביב סוגיות פוליטיות ואקטואליות"
    },
    {
      img: "./assets/images/10.jpg",
      title: "בית המדרש محادثة دينية",
      description: language === 'AR' ? "لقاءات لتعلم اللغة من خلال دراسة نصوص وعادات من الديانات الثلاث" : "מפגשים ללימוד שפה דרך למידה מעמיקה של טקסטים ומנהגים משלוש הדתות"
    },
    {
      img: "./assets/images/advanced.jpg",
      title: "נבחרת המתקדמות نخبة المتقدمات",
      description: language === 'AR' ? "لم تعد اللقاءات تشكل تحديا لك؟ في نخبة المناقشات والمناظرات حول قضايا فكرية متنوعة بين النساء ذوات المستويات العالية جدا في العبرية والعربية" : "המפגשים כבר לא מאתגרים אותך? בנבחרת דיונים ודיבייטים על סוגיות אינטלקטואליות מגוונות בין נשים עם רמות עברית וערבית גבוהות מאוד"
    },
    {
      img: "./assets/images/begginer.jpeg",
      title: "מתחילות לדבר مبتدئات",
      description: language === 'AR' ? "مجموعة للمبتدئات في الحديث" : "קבוצה למתחילות לדבר"
    }
  ];

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const regex = /^05\d{8}$/;
    return regex.test(phone);
  };

  const validateName = (name) => {
    const regex = /^[^\d]+$/;
    return regex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const firstName = nameRef.current.value;
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = language === 'AR' ? 'صيغة البريد الإلكتروني غير صحيحة' : 'כתובת מייל לא תקינה';
    }

    if (!validatePhoneNumber(phone)) {
      newErrors.phone = language === 'AR' ? 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ 05 ويحتوي على 10 أرقام على الأقل.' : 'מספר הטלפון לא תקין. הוא צריך להתחיל ב-05 ולכלול לפחות 10 ספרות.';
    }

    if (!validateName(firstName)) {
      newErrors.name = language === 'AR' ? 'يجب أن لا يحتوي الاسم على أرقام' : 'השם לא צריך להכיל מספרים';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage(Object.values(newErrors).join(', '));
      setTimeout(() => {
        setErrorMessage('');
      }, 10000);
      return;
    }

    emailjs.sendForm('service_onlznch', 'template_nm3z6tt', form.current, {
      publicKey: 'tWA5BESHzduW8do5B',
    }).then(
      () => {
        setSuccessMessage(language === 'AR' ? "تم إرسال البريد الإلكتروني بنجاح" : "האימייל נשלח בהצלחה");
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 10000);
      },
      (error) => {
        setErrorMessage(language === 'AR' ? "مشكلة في إرسال البريد الإلكتروني" : "בעיה בשליחת מייל");
        console.log(error);
        setTimeout(() => {
          setErrorMessage('');
        }, 10000);
      },
    );

    nameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
    groupRef.current.value = '';
    levelRef.current.value = '';
  };

  return (
    <div>
      <button className="scroll-button" onClick={() => setFormBoolean(true)}>
        {language === 'AR' ? 'للانضمام' : 'להצטרף'}
      </button>
      <div className='gallery-container'>
        <hr className="separator" />
        <h1 className="main-title">{language === 'AR' ? 'شو منعمل ' : 'מה עושים'}</h1>
        <div className='gallery'>
          {projects.map((project) => (
            <div key={project.title} className="photo-container" onClick={() => handleProjectClick(project)}>
              <img src={project.img} alt={project.title} />
              <div className="line"></div>
              <div className="title">{project.title}</div>
              <div className="overlay">
                <div className="description_iii">{project.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='textEnd' >
          <p>
          
          
          <button  className='formButton' onClick={() => setFormBoolean(true)}>{language === "AR" ? 'هذه' : 'זה'}</button>

          {language === "AR" ? 'حابة تنضميلنا؟ الرجاء تعبئة الوثيقة ' : 'רוצה להצטרף אלינו? בבשקשה תמלי את הטיפס'}
                    </p>
         
        </div>
      </div>
      <ProjectModal show={showModal} onClose={handleCloseModal} project={selectedProject} />
      <Modal isOpen={formBoolean} onClose={handleCloseModal}>
        <CommunityForm 
          form={form} 
          handleSubmit={handleSubmit}
          nameRef={nameRef}
          emailRef={emailRef}
          phoneRef={phoneRef}
          groupRef={groupRef}
          levelRef={levelRef}
          language={language}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      </Modal>
    </div>
  );
};

export default LanguageExchange;
