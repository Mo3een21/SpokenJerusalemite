'use client';
import React, { useRef, useState, useEffect } from 'react';
import NavBar from '/components/NavBar';
import Link from 'next/link';
import InfoSection from '@/components/InfoSection';
import emailjs from '@emailjs/browser';
import './styles.css';
import ProjectModal from '@/components/ProjectModal';


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

const courses = () => {
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
                const docRef1 = doc(db, 'courses', 'J1db6njBtJ1tqwVWiNhI');
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

                const docRef2 = doc(db, 'courses', 'laS8tYVhNeDLRg2raYzQ');
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
            const docRef = doc(db, 'courses', 'J1db6njBtJ1tqwVWiNhI');
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
            const docRef = doc(db, 'courses', 'laS8tYVhNeDLRg2raYzQ');
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
          img: "./assets/courses/1.jpeg",
          title: language === 'AR' ? "العربية المتحدثة" : "ערבית מדוברת",
          description: language === 'AR' ? "لقد ساعدتني الدورة بعدة طرق. اكتسبت كلمات جديدة باللغة العبرية، وخاصة في اللغة المحكية. وعلى الرغم من حصولي على درجة الماجستير من الجامعة العبرية ولغتي العبرية تعتبر جيدة، إلا أنني لم أتمكن من التحدث قبل ذلك. أعطتني الدورة الفرصة للتدرب والتغلب على خوفي. كما ساعدني في كتابة السيرة الذاتية بطريقة واضحة وبسيطة ومهنية، والتحضير لمقابلات العمل، وهي الأمور التي ساعدتني حقًا في الحصول على وظيفة. تعلمت كيف نعرف حقوقنا ونمارسها. وكان دعم الفريق قبل وأثناء وبعد الدورة مهمًا للغاية. شكرًا لك! (جمانة، شعفاط، القدس)" : "הקורס עזר לי בהרבה דברים. רכשתי מילים חדשות בעברית, במיוחד בשפה המדוברת. אפילו שאני בוגרת  תואר שני מהאוניברסיטה העברית והעברית שלי נחשבת טובה, לא הצלחתי לפני כן לדבר. הקורס פתח לי  את ההזדמנות לתרגל ולשבור את הפחד. הוא גם עזר לי לכתוב קורות חיים בצורה ברורה, פשוטה ומקצועית,  ולהתכונן לראיונות עבודה, דברים שמאוד עזרו לי בקבלה לעבודה. למדתי איך להכיר את זכויותינו ולמצות אותן. וכן הליווי של הצוות לפני, במהלך ואחרי הקורס היה מאוד משמעותי. תודה רבה!  (ג'מאנה, שועפט, ירושלים )         "
        },
        {
          img: "./assets/courses/2.jpeg",
          title: language === 'AR' ? "دورة المحادثة للمبتدئين" : "קורס שיחה למתחילות",
          description: language === 'AR' ? "دورة لتعليم المحادثة للمبتدئات في تعلم اللغة." : "קורס לשיפור יכולות השיחה של מתחילות בלימוד השפה."
        },
        {
          img: "./assets/courses/3.jpeg",
          title: language === 'AR' ? "العبرية للأكاديمية" : "עברית לאקדמיה",
          description: language === 'AR' ? "لقاءات لتعلم اللغة العبرية للأغراض الأكاديمية." : "מפגשים ללימוד השפה העברית למטרות אקדמיות."
        },
        {
          img: "./assets/images/8.jpeg",
          title: language === 'AR' ? "العبرية للتوظيف" : "עברית לתעסוקה",
          description: language === 'AR' ? "دورة تعليم اللغة العبرية لأغراض التوظيف." : "קורס ללימוד השפה העברית למטרות תעסוקה."
        },
        {
          img: "./assets/images/7.jpeg",
          title: language === 'AR' ? "العبرية للتطوير الشخصي والمهني" : "עברית לפיתוח אישי ומקצועי",
          description: language === 'AR' ? "شاركت في دورة اللغة العربية المنطوقة للمبتدئين. لقد استمتعت حقًا بدراستي وطريقة التدريس والمعلم والمجموعة التي درست معي. لقد فوجئت بمعرفة مدى قدرة الدورة القصيرة على منح الثقة الأساسية لقول بضع جمل، مما يتيح التواصل باللغة العربية. لقد تمت دعوتي للمشاركة في حفل إفطار الجالية في رمضان، حيث أتيحت لي فرصة أخرى للقاء شيق وممتع، حيث تحادثت بالعربية أنصاف الجمل التي اكتسبتها. يسعدني جدًا أن أكون جزءًا من هذا المجتمع وأشكركم على هذه الفرصة. (عادا، قطمون، القدس)" : "השתתפתי בקורס ערבית מדוברת למתחילים. מאוד נהניתי מהלימודים, מדרך ההוראה, מהמורה ומהקבוצה שלמדה איתי. הופתעתי לגלות עד כמה קורס קצר יכול לתת בטחון בסיסי לומר כמה משפטים, שמאפשרים תקשורת בשפה הערבית. הוזמנתי להשתתף בארוחת אפטאר של הקהילה לשבירת הצום ברמדאן, שם הייתה לי הזדמנות נוספת למפגש מעניין ומהנה, בו פטפטתי בחצאי משפטים בערבית שרכשתי. אני שמחה מאוד על היותי חלק מהקהילה הזו ומודה על ההזדמנות. (עדה, קטמון, ירושלים)"
        }
      ];
      const handleUpdateText = async () => {
        try {
            // Your update logic here
        } catch (error) {
            console.error("Error updating document: ", error);
        }
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
                    <div className="Title">
                    <br /><br />
                    <h2 style={{ fontWeight: 'bold', fontSize: '36px', textAlign: 'center', color: 'rgba(33, 84, 84)' }}>
                        {language === 'HE' ? 'הקורסים' : 'الكورسات'}
                    </h2>
                    </div>
                    <p style={{ direction: 'rtl', textAlign: 'right', marginLeft: '20px', marginRight: '20px'}}>
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
                    {/* <p style={{ direction: 'rtl', textAlign: 'right', marginLeft: '20px', marginRight: '20px'}}>
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
                    </Modal> */}
                    <p style={{ direction: 'rtl', textAlign: 'right', marginLeft: '20px', marginRight: '20px'}}>
                      {language === 'HE' ? (
                        <>
                          <span style={{ fontWeight: 'bold', fontSize: 'larger' }}>לא </span>
                          מלמדות כתיבה וקריאה. 
                          <span style={{ fontWeight: 'bold', fontSize: 'larger' }}> כן - מיומנויות תקשורת ושיחה, </span> 
                          תוך הכרות עם החברה והתרבות שמאחורי השפה. תלמידות ובוגרות הקורסים יכולות להצטרף ל
                        </>
                      ) : (
                        <>
                          <span style={{ fontWeight: 'bold', fontSize: 'larger' }}> نحن لا </span>
                          نعلم الكتابة والقراءة. 
                          <span style={{ fontWeight: 'bold', fontSize: 'larger' }}>  نعم - مهارات الاتصال والمحادثة، </span> 
                          مع التعرف على المجتمع والثقافة وراء اللغة. يمكن للطلاب وخريجي الدورات الانضمام ل
                        </>
                      )}
                        <Link href="/community">
                            {language === 'HE' ? "קהילה הלומדת שלנו" : "المجتمع التعليمي لدينا"}
                        </Link>,
                        {language === 'HE'
                            ? " בה מגוון אפשרויות לתרגול השפה עם דוברותיה. שם, יוכלו בדרך חוויתית ומהירה להתקדם בין שלבי הלימוד, לתרגל ולצבור ביטחון בשימוש בשפה. "
                            : " حيث توجد خيارات متنوعة لممارسة اللغة مع المتحدثين بها. وهناك، سيكونون قادرين بطريقة تجريبية وسريعة على التقدم بين مراحل الدراسة والممارسة واكتساب الثقة في استخدام اللغة."
                        }
                    </p>
                    <div className='gallery-container'>
                        <hr className="separator" />
                        <div className='projects-container'>
                        {projects.map((project) => (
                            <div className="gallery"  onClick={() => handleProjectClick(project)}>
                                <img src={project.img} alt={project.title} />
                                <div className="line"></div>
                                <div className="title">{project.title}</div>
                                <div className="overlay">
                                    {/* <div className="description_iii">{project.description}</div> */}
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    <ProjectModal show={showModal} onClose={handleCloseModal} project={selectedProject} />
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

                            <label htmlFor="details">{language === 'AR' ? 'تريد أن تسمع تفاصيل عن الدورة:' : 'רוצה לשמוע פרטים על קורס:'}</label>
                            <select id="details" name="details" required ref={subjectRef}>
                                <option value="">{language === 'AR' ? '...اختاري لغة' : 'בחרי שפה...'}</option>
                                <option value="עברית">{language === 'AR' ? 'لغة عبرية' : 'עברית'}</option>
                                <option value="ערבית">{language === 'AR' ? 'لغة عربية' : 'ערבית'}</option>
                            </select>

                            <label htmlFor="courses">{language === 'AR' ? 'لمن هذا الكورس ؟' : 'עבור מי הקורס?'}</label>
                            <select
                                id="courses"
                                name="courses"
                                required
                                ref={subjectRef}>
                                <option value="">{language === 'AR' ? 'اختاري...' : 'בחרי...'}</option>
                                <option value="עבורי">{language === 'AR' ? 'لأجلي' : 'עבורי'}</option>
                                <option value="עבור קבוצה / ארגון">{language === 'AR' ? 'لمؤسسة أو مجموعة' : 'עבור קבוצה / ארגון'}</option>
                            </select>

                            <label htmlFor="else">{language === 'AR' ? 'شيء آخر؟:' : 'משהו נוסף?'}</label>
                            <input type="text" id="else" name="else" />

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

export default courses;
