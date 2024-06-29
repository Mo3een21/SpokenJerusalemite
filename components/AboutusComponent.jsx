'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect,useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import images from "../app/images.js";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            subject: subjectRef.current.value,
            message: messageRef.current.value
        };
       
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

    return (
        <div className="container">
            <div className="text">
                <p className='highlight'>
                    {language === 'AR' ? 
                    `بدأت قصة مجتمعنا بصديقتين مقدسيتين، من شرق وغرب المدينة، ونمت اليوم إلى أكبر وأقدم مجتمع مشترك في القدس.
                    المقدسية المحكية تضع اللغة في المركز، بهدف تحويلها من عامل يولد الخوف والتغريب، إلى أداة تتيح التواصل والفهم والتعارف الحقيقي بين سكان المدينة.
                    في المدينة الأكثر توتراً في البلاد ربما، ننجح في خلق لغة مشتركة ونلتقي بمئات النساء، اللاتي من المحتمل أنهن لم يكن ليلتقين بطريقة أخرى.
                    بالإضافة إلى اللقاء المشترك، نعمل على تعزيز المساواة في الحقوق والفرص، وضمان ألا تشكل اللغة حاجزًا أمام أي امرأة لتحقيق الاستقلال والتمكين الشخصي.
                    المجتمع في نمو مستمر منذ عام 2017، ويدار بشكل متساوٍ من قبل فريق من المتطوعات من شرق وغرب المدينة، كجزء من جمعية كلنا القدس.
                    بالإضافة إلى نشاط المجتمع الداخلي، نقدم دورات لغة، وورش عمل، وخدمات ترجمة للأفراد والمنظمات من جميع أنحاء البلاد.
                    ` 
                    : 
                    `סיפור הקהילה שלנו התחיל עם שתי חברות ירושלמיות, ממזרח ומערב העיר, וצמח כיום לקהילה המשותפת הגדולה והותיקה בירושלים.
                    ירושלמית מדוברת שמה את השפה במרכז, במטרה להפוך אותה מגורם המייצר פחד וניכור, לכלי המאפשר תקשורת, הבנה והיכרות אמיתית בין אוכלוסיות העיר.
                    בעיר אולי המתוחה בארץ, אנחנו מצליחות ליצור יחד שפה משותפת ולהפגיש בין מאות נשים, שסביר להניח שלא היו נפגשות אחרת.
                    מעבר למפגש המשותף, אנחנו פועלות לקדם שוויון זכויות והזדמנויות, ולהבטיח שהשפה לא תהווה חסם בפני אף אישה לעצמאות והגשמה עצמית.
                    הקהילה נמצאת בצמיחה מתמדת משנת 2017, ומנוהלת באופן שוויוני ע"י צוות של מתנדבות ממזרח וממערב העיר, כחלק מעמותת כולנא ירושלים.
                    מעבר לפעילות הפנים של הקהילה, אנו מציעות קורסי שפה, סדנאות ושירותי תרגום לא.נשים וארגונים מכל הארץ.
                    `}
                    <Link href="/contact" className='highlight'>
                        {language === 'AR' ? 'تواصلوا معنا لمزيد من التفاصيل!' : 'פנו אלינו לפרטים נוספים!'}
                    </Link>
                </p>
                <div className='ImageFounder'>
                    <Image 
                        src="/assets/images/3.jpeg"
                        alt="Description of the image"
                        width={300} // specify the width of the image
                        height={300} // specify the height of the image
                    />
                </div>
            </div>
            {/* <div className="numbers">
                <div>{language === 'AR' ? '2900 امرأة من جميع أنحاء القدس' : '2900 נשים מכל המגוון הירושלמי'}</div>
                <div>{language === 'AR' ? '+ 50 متطوعة' : '+ 50 מתנדבות'}</div>
                <div>{language === 'AR' ? '+ 7 سنوات من المجتمع' : '+ 7 שנות קהילה'}</div>
            </div> */}
            <ImageGrid></ImageGrid>

            <h2 className="highlight">{language === 'AR' ? 'فريقنا' : 'הצוות שלנו'}</h2>
            <div className="team">
                {/* Team members */}
                <div className="team-member">
                    <Image 
                        src="/assets/images"
                        alt="Lior Orien"
                        width={150}
                        height={150}
                    />
                    <div className="details">
                        <p>{language === 'AR' ? 'ليؤور أورين' : 'ליאור אוריין'}</p>
                        <p>{language === 'AR' ? 'مدير مشارك' : 'מנהלת משותפת'}</p>
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
                        <p>{language === 'AR' ? 'سوزان سيايد' : 'סוזן סייאד'}</p>
                        <p>{language === 'AR' ? 'مدير مشارك' : 'מנהלת משותפת'}</p>
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
            <p>{language === 'AR' ? 'نجاة زر' : 'נגה זר'}</p>
            <p>{language === 'AR' ? 'منسق الأحداث' : 'רכזת אירועים'}</p>
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
            <p>{language === 'AR' ? 'هباء برق' : 'הבה ברק'}</p>
            <p>{language === 'AR' ? 'منسق الأحداث' : 'רכזת אירועים'}</p>
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
            <p>{language === 'AR' ? 'مدير البرامج وتطوير الأعمال' : 'מנהלת תכניות ופיתוח עסקי'}</p>
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
            <p>{language === 'AR' ? 'مدرب' : 'מנחה'}</p>
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
            <p>{language === 'AR' ? 'منسق برنامج التوظيف' : 'רכזת תכנית התעסוקה'}</p>
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
            <p>{language === 'AR' ? 'مدير المحتوى والبيداغوجيا' : 'מנהלת תוכן ופדגוגיה'}</p>
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
            <p>{language === 'AR' ? 'منسق مجتمعات الممارسة' : 'רכזת קהילות תרגול'}</p>
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
            <p>{language === 'AR' ? 'منسق الاجتماعات' : 'רכזת מפגשים'}</p>
        </div>
    </div>
    <div className="team-member">
        <Image 
            src="/assets/images/nogazar.jpg"
            alt="Noga Gadish"
            width={150}
            height={150}
        />
        <div className="details">
            <p>{language === 'AR' ? 'نجاة جدش' : 'נוגה גדיש'}</p>
            <p>{language === 'AR' ? 'مدرب' : 'מנחה'}</p>
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
            <p>{language === 'AR' ? 'يائيل حزان' : 'יעל חזן'}</p>
            <p>{language === 'AR' ? 'منسق المجتمع' : 'רכזת קהילה'}</p>
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
            <p>{language === 'AR' ? 'منسق المجتمع' : 'רכזת קהילה'}</p>
        </div>
    </div>
    <div className="team-member">
        <Image 
            src="/assets/images/intisarkhales.jpg"
            alt="Intasar Khales"
            width={150}
            height={150}
        />
        <div className="details">
            <p>{language === 'AR' ? 'انتصار خالس' : 'אנתסאר חאלס'}</p>
            <p>{language === 'AR' ? 'مدرب' : 'מנחה'}</p>
        </div>
    </div>
            </div>

            <h2 className="highlight" id="contact">{language === 'AR' ? 'تحدثوا إلينا!' : 'דברו איתנו!'}</h2>
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
