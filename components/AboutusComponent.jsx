'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import images from "../app/images.js";
import { db } from '../app/firebase/firebase'; // Import your Firestore database
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Modal from './Modal';
import { auth } from '../app/firebase/firebase'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';

emailjs.init({
    publicKey: 'tWA5BESHzduW8do5B',
    blockHeadless: true,
    limitRate: {
      id: 'app',
      throttle: 10000,
    },
});

export default function AboutusComponent({ language }) {
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const phoneRef = useRef();
    const subjectRef = useRef();
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [aboutText, setAboutText] = useState('');
    const [newArabicText, setNewArabicText] = useState('');
    const [newHebrewText, setNewHebrewText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // const formData = {
        //     name: nameRef.current.value,
        //     email: emailRef.current.value,
        //     phone: phoneRef.current.value,
        //     subject: subjectRef.current.value,
        //     message: messageRef.current.value
        // };
       
        emailjs.sendForm('service_onlznch', 'template_nm3z6tt', form.current, {
          publicKey: 'tWA5BESHzduW8do5B',
        }).then(
          () => {
            setSuccessMessage(language === 'AR' ? "تم إرسال البريد الإلكتروني بنجاح" : "Email sent successfully");
          },
          (error) => {
            setErrorMessage(language === 'AR' ? "مشكلة في إرسال البريد الإلكتروني" : "Problem with sending email", error);
            console.log(error)
          },
        );

        nameRef.current.value='';
        emailRef.current.value='';
        phoneRef.current.value='';
        subjectRef.current.value='';
        messageRef.current.value='';
    };

    const ImageGrid = () => {
        const [years, setYears] = useState(0);
        const [women, setWomen] = useState(0);
        const [volunteers, setVolunteers] = useState(0);
        const [hasAnimated, setHasAnimated] = useState(false);
        const gridRef = useRef(null);
      
        useEffect(() => {
          const link = document.createElement('link');
          link.href = 'https://fonts.googleapis.com/css2?family=Tel+Aviv+Modernist+Bold&display=swap';
          link.rel = 'stylesheet';
          document.head.appendChild(link);
      
          const handleScroll = () => {
            if (!hasAnimated && gridRef.current) {
              const rect = gridRef.current.getBoundingClientRect();
              if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                startAnimation();
              }
            }
          };
      
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }, [hasAnimated]);
      
        const startAnimation = () => {
          const duration = 900;
          const steps = 100;
          const intervalDuration = duration / steps;
      
          const yearsFinal = 7;
          const womenFinal = 2900;
          const volunteersFinal = 50;
      
          const yearsStep = yearsFinal / steps;
          const womenStep = womenFinal / steps;
          const volunteersStep = volunteersFinal / steps;
      
          let currentStep = 0;
      
          const interval = setInterval(() => {
            currentStep += 1;
            setYears(Math.min(Math.ceil(currentStep * yearsStep), yearsFinal));
            setWomen(Math.min(Math.ceil(currentStep * womenStep), womenFinal));
            setVolunteers(Math.min(Math.ceil(currentStep * volunteersStep), volunteersFinal));
      
            if (currentStep >= steps) {
              clearInterval(interval);
            }
          }, intervalDuration);
      
          setHasAnimated(true);
        };
      
        return (
            <div ref={gridRef} className="image-grid">
            <div className="image_threephotos">
                <img src={images.yearsImage} alt="Years" />
                <div className="number-box">
                    <p className="number">{years}+</p>
                </div>
                <h2 className="description">
                    {language === 'AR' ? 'سنوات من المجتمع' : 'שנות קהילה'}
                </h2>
            </div>
            <div className="image_threephotos">
                <img src={images.womanImage} alt="Women" />
                <div className="number-box">
                    <p className="number">{women}+</p>
                </div>
                <h2 className="description">
                    {language === 'AR' ? 'امرأة من جميع أنحاء القدس' : 'נשים מכל המגוון הירושלמי'}
                </h2>
            </div>
            <div className="image_threephotos">
                <img src={images.volunteerImage} alt="Volunteers" />
                <div className="number-box">
                    <p className="number">{volunteers}+</p>
                </div>
                <h2 className="description">
                    {language === 'AR' ? 'متطوعات' : 'מתנדבות'}
                </h2>
            </div>
        </div>
        );
      };
    
    useEffect(() => {
        const fetchAboutText = async () => {
            const docRef = doc(db, 'AboutUs', 'E66ySCkovcI1AQpf7J2r');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setAboutText(language === 'AR' ? data.arabicText : data.hebrewText);
                setNewArabicText(data.arabicText);
                setNewHebrewText(data.hebrewText);
            } else {
                console.log("No such document!");
            }
        };

        fetchAboutText();
    }, [language]);

    const handleUpdateText = async () => {
        try {
            const docRef = doc(db, 'AboutUs', 'E66ySCkovcI1AQpf7J2r');
            await setDoc(docRef, {
                arabicText: newArabicText,
                hebrewText: newHebrewText
            }, { merge: true });
            setAboutText(language === 'AR' ? newArabicText : newHebrewText);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <div className="container">
            <button className="scroll-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                 {language === 'AR' ? 'للأنضمام' : 'להצטרף'}
            </button>
            <div className="text-container">
                <p className="highlight">
                    {aboutText}
                </p>
                <div className="image-founder">
                    <Image 
                        src="/assets/images/3.jpeg"
                        alt="Description of the image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
            {isAuthenticated && (
                <div className="button-container">
                    <button onClick={() => setIsEditing(true)} className="edit-button">
                        <Image 
                            src="/assets/images/edit.png" // Replace with the correct path to your image
                            alt={language === 'AR' ? 'تعديل النص' : 'ערוך טקסט'}
                            width={20} // Adjust the width and height as needed
                            height={20}
                        />
                    </button>
                </div>
            )}
            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <textarea
                    value={newArabicText}
                    onChange={(e) => setNewArabicText(e.target.value)}
                    placeholder="Edit Arabic Text"
                    style={{ display: language === 'AR' ? 'block' : 'none', width: '100%', height: '150px', marginBottom: '10px' }}
                />
                <textarea
                    value={newHebrewText}
                    onChange={(e) => setNewHebrewText(e.target.value)}
                    placeholder="Edit Hebrew Text"
                    style={{ display: language === 'HE' ? 'block' : 'none', width: '100%', height: '150px', marginBottom: '10px' }}
                />
                <div className="button-container">
                    <button onClick={handleUpdateText} className="save-button">
                        {language === 'AR' ? 'حفظ' : 'שמור'}
                    </button>
                    <button onClick={() => setIsEditing(false)} className="cancel-button">
                        {language === 'AR' ? 'إلغاء' : 'בטל'}
                    </button>
                </div>
            </Modal>
            <ImageGrid></ImageGrid>

            <h2 className="title">{language === 'AR' ? 'فريقنا' : 'הצוות שלנו'}</h2>
            <div className="team">
                {/* Team members */}
                <div className="team-member">
                    <Image 
                        src=""
                        alt="Lior Orien"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'ليؤور أورين' : 'ליאור אוריין'}</p>
                        <p>{language === 'AR' ? 'مديرة مشاركة' : 'מנהלת משותפת'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src="/assets/images/suzansayad.jpg"
                        alt="Suzan Sayad"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'سوزان صياد' : 'סוזן סייאד'}</p>
                        <p>{language === 'AR' ? 'مديرة مشاركة' : 'מנהלת משותפת'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src="/assets/images/nogazar.jpg"
                        alt="Noga Zar"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'نوجا زر' : 'נגה זר'}</p>
                        <p>{language === 'AR' ? 'منسقة الأحداث' : 'רכזת אירועים'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src="/assets/images/hibabarq.jpg"
                        alt="Haba Barak"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'هبة برق' : 'הבה ברק'}</p>
                        <p>{language === 'AR' ? 'منسقة الأحداث' : 'רכזת אירועים'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src="/assets/images/odiahgori.jpg"
                        alt="Odia Guri"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'عادية غوري' : 'אודיה גורי'}</p>
                        <p>{language === 'AR' ? 'مديرة البرامج وتطوير الأعمال' : 'מנהלת תכניות ופיתוח עסקי'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src="/assets/images/dareenodeh.jpg"
                        alt="Darin Ouda"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'دارين عودة' : 'דרין עודה'}</p>
                        <p>{language === 'AR' ? 'مدربة' : 'מנחה'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src="/assets/images/yasmeenrishq.jpg"
                        alt="Yasmin Rashk"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'ياسمين رشق' : 'יאסמין רשק'}</p>
                        <p>{language === 'AR' ? 'منسقة برنامج التوظيف' : 'רכזת תכנית התעסוקה'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src=""
                        alt="Ayla Erlich"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'آيلا إيرليش' : 'איילה ארליך'}</p>
                        <p>{language === 'AR' ? 'مديرة المحتوى والبيداغوجيا' : 'מנהלת תוכן ופדגוגיה'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src="/assets/images/tamarajaber.jpg"
                        alt="Tamara Jaber"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'تمارا جابر' : 'תמארה ג\'אבר'}</p>
                        <p>{language === 'AR' ? 'منسقة مجتمعات الممارسة' : 'רכזת קהילות תרגול'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src="/assets/images/hagarbartna.jpg"
                        alt="Hagar Bartna"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'هاجر برتنا' : 'הגר ברתנא'}</p>
                        <p>{language === 'AR' ? 'منسقة الاجتماعات' : 'רכזת מפגשים'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src=""
                        alt="Noga Gadish"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'نوجا جدش' : 'נוגה גדיש'}</p>
                        <p>{language === 'AR' ? 'مدربة' : 'מנחה'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src="/assets/images/yaelhazan.jpg"
                        alt="Yael Hazan"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'ياعيل حزان' : 'יעל חזן'}</p>
                        <p>{language === 'AR' ? 'منسقة المجتمع' : 'רכזת קהילה'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src="/assets/images/hadeelshqeirat.jpg"
                        alt="Hadil Shakirat"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'هديل شقيرات' : 'הדיל שקיראת'}</p>
                        <p>{language === 'AR' ? 'منسقة المجتمع' : 'רכזת קהילה'}</p>
                    </div>
                </div>
                <div className="team-member">
                    <Image 
                        src=""
                        alt="Intasar Khales"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'انتصار خالس' : 'אנתסאר חאלס'}</p>
                        <p>{language === 'AR' ? 'مدربة' : 'מנחה'}</p>
                    </div>
                </div>
            </div>
            <div className="separator"></div>
            <h2 className="title" id="contact">{language === 'AR' ? 'تحدثوا إلينا!' : 'דברו איתנו!'}</h2>
            <div className="contact-form">
                <form ref={form} onSubmit={handleSubmit}>
                    <label htmlFor="name">{language === 'AR' ? 'اسم:' : 'שם:'}</label>
                    <input type="text" id="name" name="name" required ref={nameRef} />
                    
                    <label htmlFor="email">{language === 'AR' ? 'البريد الإلكتروني:' : 'מייל:'}</label>
                    <input type="email" id="email" name="email" required ref={emailRef}/>
                    
                    <label htmlFor="phone">{language === 'AR' ? 'هاتف:' : 'טלפון:'}</label>
                    <input type="tel" id="phone" name="phone" required ref={phoneRef}/>
                    
                    <label htmlFor="subject">{language === 'AR' ? 'موضوع الاستفسار:' : 'נושא הפנייה:'}</label>
                    <select id="subject" name="subject" required ref={subjectRef}>
                        <option value="">{language === 'AR' ? '...اختر الموضوع' : 'בחר נושא...'}</option>
                        <option value="language_exchange">{language === 'AR' ? 'تبادل اللغات' : 'חילופי שפות'}</option>
                        <option value="hebrew_arabic_courses">{language === 'AR' ? 'دورات عبرية / عربية محكية' : 'קורסי עברית / ערבית מדוברת'}</option>
                        <option value="translation_services">{language === 'AR' ? 'طلب خدمات الترجمة' : 'הזמנת שירותי תרגום'}</option>
                        <option value="workshop_activity">{language === 'AR' ? 'طلب ورشة عمل أو نشاط' : 'הזמנת סדנה או פעילות'}</option>
                        <option value="volunteering">{language === 'AR' ? 'تطوع' : 'התנדבות'}</option>
                        <option value="employment_help">{language === 'AR' ? 'مساعدة في التوظيف' : 'עזרה בתעסוקה'}</option>
                        <option value="collaboration">{language === 'AR' ? 'اقتراحات للتعاون' : 'הצעות לשיתוף פעולה'}</option>
                        <option value="other">{language === 'AR' ? 'أخرى' : 'אחר'}</option>
                    </select>
                    
                    <label htmlFor="message">{language === 'AR' ? 'نص الرسالة:' : 'תוכן ההודעה:'}</label>
                    <textarea id="message" name="message" required ref={messageRef}></textarea>
                    
                    <button type="submit">{language === 'AR' ? 'إرسال' : 'שליחה'}</button>
                    {successMessage && <p>{successMessage}</p>}
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
}
