'use client';
import React, { useRef, useState, useEffect } from 'react';
import NavBar from '/components/NavBar';
import Link from 'next/link';
import InfoSection from '@/components/InfoSection';
import emailjs from '@emailjs/browser';
import Slider from '/components/Slider';
import './styles.css';

import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Modal from '../../components/Modal';
import ContactFormModal from '../../components/ContactFormModal';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

emailjs.init({
    publicKey: 'tWA5BESHzduW8do5B',
    blockHeadless: true,
    limitRate: {
        id: 'app',
        throttle: 10000,
    },
});

const chance = () => {
    const [language, setLanguage] = useState('HE'); // Default language set to 'HE'
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const messageRef = useRef();
    const subjectRef = useRef();
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);

    // State variables for text_A1 and text_H1
    const [textA1, setTextA1] = useState('');
    const [textH1, setTextH1] = useState('');
    const [tempTextA1, setTempTextA1] = useState('');
    const [tempTextH1, setTempTextH1] = useState('');
    const [isEditing1, setIsEditing1] = useState(false);

    // State variables for text_A2 and text_H2
    const [textA2, setTextA2] = useState('');
    const [textH2, setTextH2] = useState('');
    const [tempTextA2, setTempTextA2] = useState('');
    const [tempTextH2, setTempTextH2] = useState('');
    const [isEditing2, setIsEditing2] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const docRef1 = doc(db, 'opportunities', 'KJr2z1hrnGU8u86Gm3gE');
                const docSnap1 = await getDoc(docRef1);
                if (docSnap1.exists()) {
                    const data = docSnap1.data();
                    setTextA1(data.text_A1);
                    setTextH1(data.text_H1);
                    setTempTextA1(data.text_A1);
                    setTempTextH1(data.text_H1);
                } else {
                    console.log('No such document!');
                }

                const docRef2 = doc(db, 'opportunities', '007I4kuAudohsHMLFPRm');
                const docSnap2 = await getDoc(docRef2);
                if (docSnap2.exists()) {
                    const data = docSnap2.data();
                    setTextA2(data.text_A2);
                    setTextH2(data.text_H2);
                    setTempTextA2(data.text_A2);
                    setTempTextH2(data.text_H2);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchTexts();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    const handleEdit1 = () => {
        setIsEditing1(true);
    };

    const handleSave1 = async () => {
        try {
            const docRef = doc(db, 'opportunities', 'KJr2z1hrnGU8u86Gm3gE');
            await updateDoc(docRef, {
                text_A1: tempTextA1,
                text_H1: tempTextH1
            });
            setTextA1(tempTextA1);
            setTextH1(tempTextH1);
            setIsEditing1(false);
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const handleEdit2 = () => {
        setIsEditing2(true);
    };

    const handleSave2 = async () => {
        try {
            const docRef = doc(db, 'opportunities', '007I4kuAudohsHMLFPRm');
            await updateDoc(docRef, {
                text_A2: tempTextA2,
                text_H2: tempTextH2
            });
            setTextA2(tempTextA2);
            setTextH2(tempTextH2);
            setIsEditing2(false);
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

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
                setSuccessMessage(language === 'AR' ? "تم إرسال البريد الإلكتروني بنجاح" : "Email sent successfully");
                setErrorMessage('');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 10000);
            },
            (error) => {
                setErrorMessage(language === 'AR' ? "مشكلة في إرسال البريد الإلكتروني" : "Problem with sending email", error);
                console.log(error);
                setTimeout(() => {
                    setErrorMessage('');
                }, 10000);
            },
        );

        nameRef.current.value = '';
        emailRef.current.value = '';
        phoneRef.current.value = '';
        subjectRef.current.value = '';
        messageRef.current.value = '';
    };

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'AR' ? 'HE' : 'AR'));
    };

    return (
        <>
            <NavBar language={language} toggleLanguage={toggleLanguage} />
            <div className="main">
                <button
                    className="scroll-button"
                    onClick={() => setIsContactFormOpen(true)}
                >
                    {language === 'AR' ? 'للانضمام' : 'להצטרף'}
                </button>
                <div className="section">
                    <div className="image-container" style={{ backgroundImage: `url("/assets/chanceImages/opportunities-1.jpeg")` }}>
                        <div className="image-title">
                            <h2>{language === 'HE' ? 'שפה להזדמנויות' : 'لغة للفرص'}</h2>
                        </div>
                    </div>
                    <p>
                        {language === 'HE' ? textH1 : textA1}
                    </p>
                    {isAuthenticated && (
                        <div className="button-container">
                            <button onClick={handleEdit1} className="edit-button">
                                <img 
                                    src="/assets/images/edit.png"
                                    alt={language === 'AR' ? 'تعديل' : 'ערוך'}
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    )}
                    <Modal isOpen={isEditing1} onClose={() => setIsEditing1(false)}>
                        <div>
                            <label>
                                عربي
                                <textarea
                                    value={tempTextA1}
                                    onChange={(e) => setTempTextA1(e.target.value)}
                                />
                            </label>
                            <label>
                                עברית
                                <textarea
                                    value={tempTextH1}
                                    onChange={(e) => setTempTextH1(e.target.value)}
                                />
                            </label>
                            <button className='button-save' onClick={handleSave1}>Save</button>
                        </div>
                    </Modal>
                    <ul className="lista">
                        <li>{language === 'HE' ? 'סיוע בכתיבת קורות חיים' : 'مساعدة في كتابة السيرة الذاتية'}</li>
                        <li>{language === 'HE' ? 'הכנה לראיונות עבודה' : 'تحضير لمقابلات العمل'}</li>
                        <li>{language === 'HE' ? 'ליווי אישי' : 'متابعة شخصية'}</li>
                        <li>{language === 'HE' ? 'הנגשת משרות והזדמנויות' : 'توفير فرص عمل وفرص تطوير'}</li>
                        <li>{language === 'HE' ? 'קורסים וסדנאות מקצועיים' : 'دورات وورش عمل مهنية'}</li>
                        <li>{language === 'HE' ? 'קבוצות לתרגול עברית' : 'مجموعات لتدريب اللغة العبرية'}</li>
                    </ul>
                    <p>
                        {language === 'HE'
                            ? "בזכות רשת סולידריות של מתנדבות מהקהילה המסייעות כל אחת בתחומה."
                            : "بفضل شبكة التضامن بين المتطوعات من المجتمع المساعدة الخاصة في كل مجال."
                        }
                    </p>
                    <div className="image-container" style={{ backgroundImage: `url("/assets/chanceImages/opportunities-2.jpeg")` }}>
                        <div className="image-title">
                            <h2>{language === 'HE' ? 'השותפים שלנו' : 'شركاؤنا'}</h2>
                        </div>
                    </div>
                    <br></br>
                    <Slider />
                    <br></br>
                    <br></br>
                    <div className="image-container" style={{ backgroundImage: `url("/assets/chanceImages/opportunities-3.jpeg")` }}>
                        <div className="image-title">
                            <h2>{language === 'HE' ? 'קורסי העברית שלנו' : 'دورات اللغة العبرية لدينا'}</h2>
                        </div>
                    </div>
                    <p>
                        {language === 'HE' ? textH2 : textA2}
                    </p>
                    {isAuthenticated && (
                        <div className="button-container">
                            <button onClick={handleEdit2} className="edit-button">
                                <img 
                                    src="/assets/images/edit.png"
                                    alt={language === 'AR' ? 'تعديل' : 'ערוך'}
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    )}
                    <Modal isOpen={isEditing2} onClose={() => setIsEditing2(false)}>
                        <div>
                            <label>
                                عربي
                                <textarea
                                    value={tempTextA2}
                                    onChange={(e) => setTempTextA2(e.target.value)}
                                />
                            </label>
                            <label>
                                עברית
                                <textarea
                                    value={tempTextH2}
                                    onChange={(e) => setTempTextH2(e.target.value)}
                                />
                            </label>
                            <button className='button-save' onClick={handleSave2}>Save</button>
                        </div>
                    </Modal>
                    <p>
                        {language === 'HE'
                            ? "תלמידות ובוגרות הקורסים יכולות להצטרף ל"
                            : "يمكن لطالباتنا وخريجات دوراتنا الانضمام إلى "
                        }
                        <Link href="/courses">
                            {language === 'HE' ? "קהילה הלומדת שלנו" : "المجتمع التعليمي لدينا"}
                        </Link>,
                        {language === 'HE'
                            ? " בה מגוון אפשרויות לתרגול השפה עם דוברותיה. שם, יוכלו בדרך חוויתית ומהירה להתקדם בין שלבי הלימוד, לתרגל ולצבור ביטחון בשימוש בשפה."
                            : " حيث يمكنهن التقدم بطريقة تجريبية وسريعة بين مراحل التعلم، للتدريب واكتساب الثقة في استخدام اللغة."
                        }
                    </p>
                    <ul className="lista">
                        <li>{language === 'HE' ? "קורס שיחה לרמת מתחילות" : "دورة حديثة للمبتدئين"}</li>
                        <li>{language === 'HE' ? "עברית לתעסוקה" : "العبرية للعمل"}</li>
                        <li>{language === 'HE' ? "עברית לאקדמיה" : "العبرية للأكاديمية"}</li>
                        <li>{language === 'HE' ? "עברית לפיתוח אישי ומקצועי" : "العبرية للتطوير الشخصي والمهني"}</li>
                    </ul>
                    <p>{language === 'HE' ? "תכני הקורסים עוברים התאמות ודיוקים לפי כל קהל יעד וצרכיו." : "تتكيف محتويات الدورات وتناسب احتياجات وجمهور كل دورة بدقة."}</p>
                    <Link href="#">
                        {language === 'HE' ? "רוצים לשמוע עוד על הקורסים?" : "هل ترغب في الاطلاع على المزيد عن الدورات؟"}
                    </Link>
                </div>

                <ContactFormModal isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)}>
                    <div className="contact-form" id="contact-form">
                        <form ref={form} onSubmit={handleSubmit}>
                            <label htmlFor="name">{language === 'AR' ? 'اسم:' : 'שם:'}</label>
                            <input type="text" id="name" name="name" required ref={nameRef} />

                            <label htmlFor="email">{language === 'AR' ? 'البريد الإلكتروني:' : 'מייל:'}</label>
                            <input type="email" id="email" name="email" required ref={emailRef} />

                            <label htmlFor="phone">{language === 'AR' ? 'هاتف:' : 'טלפון:'}</label>
                            <input type="tel" id="phone" name="phone" required ref={phoneRef} />

                            <label htmlFor="subject">{language === 'AR' ? 'موضوع الاستفسار:' : 'נושא הפנייה:'}</label>
                            <select id="subject" name="subject" required ref={subjectRef}>
                                <option value="">{language === 'AR' ? 'كيف معني/ة تنضميلنا؟' : 'איך היית מעוניינ/ת להשתלב?'}</option>
                                <option value="התנדבות בפרויקט">{language === 'AR' ? 'تطوع في المشاريع' : 'התנדבות בפרויקט'}</option>
                                <option value="פרסום משרה">{language === 'AR' ? 'نشر وظيفة' : 'פרסום משרה'}</option>
                                <option value="שיתוף פעולה">{language === 'AR' ? 'عمل جماعي' : 'שיתוף פעולה'}</option>
                                <option value="הזמנת קורסים">{language === 'AR' ? 'طلب كورسات' : 'הזמנת קורסים'}</option>
                                <option value="אחר">{language === 'AR' ? 'أخرى' : 'אחר'}</option>
                            </select>

                            <label htmlFor="message">{language === 'AR' ? 'احكيلنا كمان' : 'ספרי לנו עוד'}</label>
                            <textarea id="message" name="message" required ref={messageRef}></textarea>

                            <button type="submit">{language === 'AR' ? 'إرسال' : 'שליחה'}</button>
                            {successMessage && <p>{successMessage}</p>}
                            {errorMessage && <p>{errorMessage}</p>}
                        </form>
                    </div>
                </ContactFormModal>
            </div>
            <InfoSection language={language} />
        </>
    );
};

export default chance;