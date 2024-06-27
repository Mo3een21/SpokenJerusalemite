"use client";

import Link from 'next/link';
import Image from 'next/image'
import { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';

emailjs.init({
    publicKey: 'tWA5BESHzduW8do5B',
    // Do not allow headless browsers
    blockHeadless: true,
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 10000,
    },
  });



export default function AboutusComponent() {
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
            phone:phoneRef.current.value,
            subject:subjectRef.current.value,
            message: messageRef.current.value
        };
       
        emailjs
        .sendForm('service_onlznch', 'template_nm3z6tt', form.current, {
          publicKey: 'tWA5BESHzduW8do5B',
        })
        .then(
          () => {
                setSuccessMessage("Email sent succesfully");
          },
          (error) => {
            setErrorMessage("problem with sending email" , error);
            console.log(error)
          },
        );


        nameRef.current.value='';
        emailRef.current.value='';
        phoneRef.current.value='';
        subjectRef.current.value='';
        messageRef.current.value='';

    };
    return (
    
    <div class="container" >
        <div class ="text">
        <p class= 'highlight'>
    סיפור הקהילה שלנו התחיל עם שתי חברות ירושלמיות, ממזרח ומערב העיר, וצמח כיום לקהילה המשותפת הגדולה והותיקה בירושלים.
    ירושלמית מדוברת שמה את השפה במרכז, במטרה להפוך אותה מגורם המייצר פחד וניכור, לכלי המאפשר תקשורת, הבנה והיכרות אמיתית בין אוכלוסיות העיר. 
    בעיר אולי המתוחה בארץ, אנחנו מצליחות ליצור יחד שפה משותפת ולהפגיש בין מאות נשים, שסביר להניח שלא היו נפגשות אחרת.
    מעבר למפגש המשותף, אנחנו פועלות לקדם שוויון זכויות והזדמנויות, ולהבטיח שהשפה לא תהווה חסם בפני אף אישה לעצמאות והגשמה עצמית. 
    הקהילה נמצאת בצמיחה מתמדת משנת 2017, ומנוהלת באופן שוויוני ע"י צוות של מתנדבות ממזרח וממערב העיר, כחלק מעמותת כולנא ירושלים. 
    מעבר לפעילות הפנים של הקהילה, אנו מציעות קורסי שפה, סדנאות ושירותי תרגום לא.נשים וארגונים מכל הארץ. 
  <Link href="/contact"  class = 'highlight'>פנו אלינו לפרטים נוספים!</Link>
        </p>
<div className='ImageFounder' >
        <Image 
        src="/assets/images/3.jpeg"
        alt="Description of the image"
        width={300} // specify the width of the image
        height={300} // specify the height of the image
      />
      </div>
      </div>
        <div class="numbers">
            <div>2900 נשים מכל המגוון הירושלמי</div>
            <div>+ 50 מתנדבות</div>
            <div>+ 7 שנות קהילה</div>
        </div>

        <h2 class="highlight">הצוות שלנו</h2>
        <div class="team">
    <div class="team-member">
        <img src="assets/images/" alt="Lior Orien"/>
        <div class="details">
            <p>ליאור אוריין</p>
            <p>מנהלת משותפת</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/suzansayad.jpg" alt="Suzan Sayad"/>
        <div class="details">
            <p>סוזן סייאד</p>
            <p>מנהלת משותפת</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/nogazar.jpg" alt="Noga Zar"/>
        <div class="details">
            <p>נגה זר</p>
            <p>רכזת אירועים</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/hibabarq.jpg" alt="Haba Barak"/>
        <div class="details">
            <p>הבה ברק</p>
            <p>רכזת אירועים</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/odiahgori.jpg" alt="Odia Guri"/>
        <div class="details">
            <p>אודיה גורי</p>
            <p>מנהלת תכניות ופיתוח עסקי</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/dareenodeh.jpg" alt="Darin Ouda"/>
        <div class="details">
            <p>דרין עודה</p>
            <p>מנחה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/yasmeenrishq.jpg" alt="Yasmin Rashk"/>
        <div class="details">
            <p>יאסמין רשק</p>
            <p>רכזת תכנית התעסוקה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="" alt="Ayla Erlich"/>
        <div class="details">
            <p>איילה ארליך</p>
            <p>מנהלת תוכן ופדגוגיה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/tamarajaber.jpg" alt="Tamara Jaber"/>
        <div class="details">
            <p>תמארה ג'אבר</p>
            <p>רכזת קהילות תרגול</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/hagarbartna.jpg" alt="Hagar Bartna"/>
        <div class="details">
            <p>הגר ברתנא</p>
            <p>רכזת מפגשים</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/nogazar.jpg" alt="Noga Gadish"/>
        <div class="details">
            <p>נוגה גדיש</p>
            <p>מנחה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/yaelhazan.jpg" alt="Yael Hazan"/>
        <div class="details">
            <p>יעל חזן</p>
            <p>רכזת קהילה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/hadeelshqeirat.jpg" alt="Hadil Shakirat"/>
        <div class="details">
            <p>הדיל שקיראת</p>
            <p>רכזת קהילה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="./assets/images/intisarkhales.jpg" alt="Intasar Khales"/>
        <div class="details">
            <p>אנתסאר חאלס</p>
            <p>מנחה</p>
        </div>
    </div>
</div>


        <h2 class="highlight" id="contact">דברו איתנו!</h2>
        <div class="contact-form">
            <form  ref={form} onSubmit={handleSubmit}>
                <label for="name">שם:</label>
                <input type="text" id="name" name="name" required ref={nameRef} />
                
                <label for="email">מייל:</label>
                <input type="email" id="email" name="email" required ref={emailRef}/>
                
                <label for="phone">טלפון:</label>
                <input type="tel" id="phone" name="phone" required ref={phoneRef}/>
                
                <label for="subject">נושא הפנייה:</label>
                <select id="subject" name="subject" required ref={subjectRef}>
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
                <textarea id="message" name="message" ref={messageRef}></textarea>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit">שלח</button>
            </form>
        </div>
    </div>
    
  )
}
