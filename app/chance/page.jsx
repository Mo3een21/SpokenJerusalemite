'use client';
import React, { useRef, useState } from 'react';
import NavBar from '/components/NavBar';
import Link from 'next/link';
import InfoSection from '@/components/InfoSection';
import emailjs from '@emailjs/browser';
import Slider from '/components/Slider';
import './styles.css';

emailjs.init({
    publicKey: 'tWA5BESHzduW8do5B',
    blockHeadless: true,
    limitRate: {
        id: 'app',
        throttle: 10000,
    },
});

const AboutUs = () => {
    const [language, setLanguage] = useState('HE'); // Default language set to 'HE'
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const messageRef = useRef();
    const subjectRef = useRef();
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


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
                    onClick={() => {
                        const contactForm = document.getElementById('contact-form');
                        if (contactForm) {
                            contactForm.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
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
                        {language === 'HE'
                            ? "73% מהנשים הערביות בירושלים אינן מצליחות להשתלב בשוק העבודה (לפי מכון ירושלים למחקרי מדיניות, 2022). במהלך שנות פעילותנו אנחנו פוגשות נשים מוכשרות ואיכותיות שאינן מצליחות למצות את הפוטנציאל שלהן. למה? חסם השפה, פחד וחוסר היכרות עם מערב העיר, היעדר נטוורקינג. בשנת 2020 החלטנו לנצל את כוחותינו כקהילה משותפת ולפתוח דלתות."
                            : "73% من النساء العربيات في القدس لا ينجحن في الاندماج في سوق العمل (وفقًا لمعهد القدس لأبحاث السياسات ، 2022). خلال سنوات نشاطنا ، نلتقي بنساء موهوبات وذات جودة لا ينجحن في استيعاب إمكاناتهن الكاملة. لماذا؟ عائق اللغة ، الخوف وعدم المعرفة بمناطق غرب المدينة ، ونقص الشبكات الاجتماعية. في عام 2020 ، قررنا استغلال قوتنا كمجتمع مشترك وفتح أبوابًا."
                        }
                    </p>
                    <p>
                        {language === 'HE'
                            ? "הקמנו את קהילת 'בנחקק אחלאמנה بنحقق أحلامنا' קהילת פיתוח אישי ומקצועי עבור נשים מירושלים המזרחית. חברות בקהילה כיום למעלה מאלף נשים מתחומי עיסוק מגוונים, המסייעות זו לזו בכל שאלה. הקהילה מציעה:"
                            : "قمنا بتأسيس مجتمع 'بنحقق أحلامنا' كمجتمع للتطوير الشخصي والمهني للنساء في القدس الشرقية. تضم الآن أكثر من ألف امرأة من مختلف مجالات العمل ، يساعدن بعضهن البعض في أي مسألة. يقدم المجتمع:"
                        }
                    </p>
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
                        {language === 'HE'
                            ? "הקורסים הייחודיים שלנו שמים דגש על מיומנויות שיחה ותקשורת פורמלית ובלתי פורמלית. הם נבנו במטרה להוציא את הלומד.ת כמה שיותר מהר מהכיתה, משלב הלמידה לשלב התרגול, הדיבור והיישום. הם כוללים מרכיבי תרגול רבים על מנת לאפשר צבירת ביטחון בשימוש בשפה. צוות המורות שלנו דוברות עברית שפת אם וערבית ברמה גבוהה, הן מכירות את החסמים ואת החברה המזרח ירושלמית ופועלות ליצור סביבה לימודית מיטבית."
                            : "دوراتنا الفريدة التي تركز على مهارات التحدث والاتصال الرسمي وغير الرسمي. تم بناؤها لإخراج التلميذ بأسرع ما يمكن من الفصل، من مرحلة التعلم إلى مرحلة الممارسة من خلال التعليم الشخصي. نرى في ذلك وسيلة لتعزيز وتحسين الاستثمار والإنفاق."
                        }
                    </p>
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
                <form id="contact-form" className='contact-form' ref={form} onSubmit={handleSubmit}>
                    <label htmlFor="name">{language === 'AR' ? 'اسم:' : 'שם:'}</label>
                    <input type="text" id="name" name="name" required ref={nameRef} />
                    
                    <label htmlFor="email">{language === 'AR' ? 'البريد الإلكتروني:' : 'מייל:'}</label>
                    <input type="email" id="email" name="email" required ref={emailRef}/>
                    
                    <label htmlFor="phone">{language === 'AR' ? 'هاتف:' : 'טלפון:'}</label>
                    <input type="tel" id="phone" name="phone" required ref={phoneRef}/>
                    
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
            <InfoSection language={language}  ></InfoSection>
        </>
    );
};

export default AboutUs;
