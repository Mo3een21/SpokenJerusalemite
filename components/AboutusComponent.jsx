import Link from 'next/link';
import Image from 'next/image'
export default function AboutusComponent() {
  return (
    
    <div class="container" >
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
        <div class="numbers">
            <div>2900 נשים מכל המגוון הירושלמי</div>
            <div>+ 50 מתנדבות</div>
            <div>+ 7 שנות קהילה</div>
        </div>

        <h2 class="highlight">הצוות שלנו</h2>
        <div class="team">
    <div class="team-member">
        <img src="path_to_image1.jpg" alt="Lior Orien"/>
        <div class="details">
            <p>ליאור אוריין</p>
            <p>מנהלת משותפת</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image2.jpg" alt="Suzan Sayad"/>
        <div class="details">
            <p>סוזן סייאד</p>
            <p>מנהלת משותפת</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image3.jpg" alt="Noga Zar"/>
        <div class="details">
            <p>נגה זר</p>
            <p>רכזת אירועים</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image4.jpg" alt="Haba Barak"/>
        <div class="details">
            <p>הבה ברק</p>
            <p>רכזת אירועים</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image5.jpg" alt="Odia Guri"/>
        <div class="details">
            <p>אודיה גורי</p>
            <p>מנהלת תכניות ופיתוח עסקי</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image6.jpg" alt="Darin Ouda"/>
        <div class="details">
            <p>דרין עודה</p>
            <p>מנחה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image7.jpg" alt="Yasmin Rashk"/>
        <div class="details">
            <p>יאסמין רשק</p>
            <p>רכזת תכנית התעסוקה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image8.jpg" alt="Ayla Erlich"/>
        <div class="details">
            <p>איילה ארליך</p>
            <p>מנהלת תוכן ופדגוגיה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image9.jpg" alt="Tamara Jaber"/>
        <div class="details">
            <p>תמארה ג'אבר</p>
            <p>רכזת קהילות תרגול</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image10.jpg" alt="Hagar Bartna"/>
        <div class="details">
            <p>הגר ברתנא</p>
            <p>רכזת מפגשים</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image11.jpg" alt="Noga Gadish"/>
        <div class="details">
            <p>נוגה גדיש</p>
            <p>מנחה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image12.jpg" alt="Yael Hazan"/>
        <div class="details">
            <p>יעל חזן</p>
            <p>רכזת קהילה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image13.jpg" alt="Hadil Shakirat"/>
        <div class="details">
            <p>הדיל שקיראת</p>
            <p>רכזת קהילה</p>
        </div>
    </div>
    <div class="team-member">
        <img src="path_to_image14.jpg" alt="Intasar Khales"/>
        <div class="details">
            <p>אנתסאר חאלס</p>
            <p>מנחה</p>
        </div>
    </div>
</div>


        <h2 class="highlight" id="contact">דברו איתנו!</h2>
        <div class="contact-form">
            <form>
                <label for="name">שם:</label>
                <input type="text" id="name" name="name" required/>
                
                <label for="email">מייל:</label>
                <input type="email" id="email" name="email" required/>
                
                <label for="phone">טלפון:</label>
                <input type="tel" id="phone" name="phone" required/>
                
                <label for="subject">נושא הפנייה:</label>
                <select id="subject" name="subject" required>
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
                <textarea id="message" name="message"></textarea>
                
                <button type="submit">שלח</button>
            </form>
        </div>
    </div>
    
  )
}
