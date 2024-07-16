'use client'

import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

emailjs.init({
  publicKey: 'tWA5BESHzduW8do5B',
  blockHeadless: true,
  limitRate: {
    id: 'app',
    throttle: 10000,
  },
});



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


const DynamicForm = ({language}) => {
  const [subject, setSubject] = useState(null);
  
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const courseRef = useRef();
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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


    else{

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
  
  
  }

    nameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
    setSubject('');
    courseRef.current.value = '';
  };

  const renderForm = (formId , language) => {
    return (
      <div className='contact-form'>
        <form ref={form} onSubmit={handleSubmit}>
          <input type="hidden" name="subject" value={subject || ''} />
          <div>
            <label htmlFor='name'>{language==="AR" ? 'الاسم' : 'שם'}</label>

            <input type="text" id='name' name="name" ref={nameRef} required />
          </div>
          <div>
            <label htmlFor='phone'>{language==="AR"? "الهاتف" : "טלפון"}</label>

            <input type="tel" id='phone' name="phone" ref={phoneRef} required />
          </div>
          <div>
            <label htmlFor='email'>email</label>

            <input type="email" id={`email-${formId}`} name="email" ref={emailRef} required />
          </div>
          {formId === "enroll" && (
            <div>
              <div>
                <label htmlFor="course">{language==="AR"? "الدورة " : "קורס"}</label>

                <select id="course" name="course" ref={courseRef} required>
                  <option value="בחרי קורס">{language ==="AR"? " اختاري دورة...":" ...בחרי קורס"}</option>
                  <option value="קורס שיחה לרמת מתחילות">{language==="AR"? "دورة محادثة للمبتدئات":"קורס שיחה לרמת מתחילות"}</option>
                  <option value="עברית לתעסוקה">{language ==="AR"? "لغة عبرية مهنية":"עברית לתעסוקה"}</option>
                  <option value="עברית לאקדמיה">{language==="AR" ? "لغة عبرية اكاديمية": "עברית לתעסוקה"}</option>
                  <option value="עברית לפיתוח אישי ומקצועי">{language ==="AR"? "لغة عبرية للتطوير الشخصي والمهني":"עברית לפיתוח אישי ומקצועי"}</option>
                </select>
              </div>
            </div>
          )}
          <button type="submit">{language==="AR"? "إرسال": "שלח"}</button>

          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    );
  };

  return (
    <div className='container'>
      <h2>{language==="AR"?"حابة تنضمي لمجتمعنا؟":"בואי תהיי חלק מהקהילה שלנו"}</h2>

      <div className='choices'>
        <button onClick={() => setSubject("volunteer")}>{language ==="AR"? "تطوعي ": "התדנבות"}</button>
        <button onClick={() => setSubject("add")}>{language ==="AR"? "انضمي لمجتمعنا": "הצטרפות לקהילה"}</button>
        <button onClick={() => setSubject("enroll")}>{language ==="AR"? "تسجيل لكورساتنا": "רישום לקורסים"}</button>
      </div>
      <div>
        {subject === "volunteer" && renderForm("volunteer" , language)}
        {subject === "add" && renderForm("add", language)}
        {subject === "enroll" && renderForm("enroll" , language)}
      </div>
    </div>
  );
};

export default DynamicForm;
