"use client";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavBar from '/components/NavBar';
import Link from 'next/link';
import Slider from '/components/Slider';
import './styles.css';

export default function aboutus() {
  return (
    <>
      <NavBar />
      <div className="main">
        <div className="section">
          <div className="image-container" style={{ backgroundImage: `url("/assets/opportunities/opportunities-1.jpeg")` }}>
            <div className="image-title">
              <h2>שפה להזדמנויות</h2>
            </div>
          </div>
          <p>
            73% מהנשים הערביות בירושלים אינן מצליחות להשתלב בשוק העבודה 
            (לפי מכון ירושלים למחקרי מדיניות, 2022). במהלך שנות פעילותנו אנחנו פוגשות 
            נשים מוכשרות ואיכותיות שאינן מצליחות למצות את הפוטנציאל שלהן.
            למה? חסם השפה, פחד וחוסר היכרות עם מערב העיר, היעדר נטוורקינג.
            בשנת 2020 החלטנו לנצל את כוחותינו כקהילה משותפת ולפתוח דלתות.
          </p>
          <p>
            הקמנו את קהילת "בנחקק אחלאמנה بنحقق أحلامنا" קהילת פיתוח אישי ומקצועי עבור נשים מירושלים המזרחית. 
            חברות בקהילה כיום למעלה מאלף נשים מתחומי עיסוק מגוונים, המסייעות זו לזו בכל שאלה. הקהילה מציעה:
          </p>
          <ul className="lista">
            <li>סיוע בכתיבת קורות חיים</li>
            <li>הכנה לראיונות עבודה</li>
            <li>ליווי אישי</li>
            <li>הנגשת משרות והזדמנויות</li>
            <li>קורסים וסדנאות מקצועיים</li>
            <li>קבוצות לתרגול עברית</li>
          </ul>
          <p>בזכות רשת סולידריות של מתנדבות מהקהילה המסייעות כל אחת בתחומה.</p>
          <div className="image-container" style={{ backgroundImage: `url("/assets/opportunities/opportunities-2.jpeg")` }}>
            <div className="image-title">
              <h2>השותפים שלנו</h2>
            </div>
          </div>
          <br></br>
          <Slider />
          <br></br>
          <br></br>
          <div className="image-container" style={{ backgroundImage: `url("/assets/opportunities/opportunities-3.jpeg")` }}>
            <div className="image-title">
              <h2>קורסי העברית שלנו</h2>
            </div>
          </div>
          <p>
            הקורסים הייחודיים שלנו שמים דגש על מיומנויות שיחה ותקשורת פורמלית ובלתי פורמלית. הם נבנו במטרה 
            להוציא את הלומד.ת כמה שיותר מהר מהכיתה, משלב הלמידה לשלב התרגול, הדיבור והיישום. הם כוללים מרכיבי 
            תרגול רבים על מנת לאפשר צבירת ביטחון בשימוש בשפה. צוות המורות שלנו דוברות עברית שפת אם וערבית ברמה 
            גבוהה, הן מכירות את החסמים ואת החברה המזרח ירושלמית ופועלות ליצור סביבה לימודית מיטבית.
          </p>
          <p>
            תלמידות ובוגרות הקורסים יכולות להצטרף ל<Link href="/courses">קהילה הלומדת שלנו</Link>, בה מגוון אפשרויות לתרגול השפה עם דוברותיה. 
            שם, יוכלו בדרך חוויתית ומהירה להתקדם בין שלבי הלימוד, לתרגל ולצבור ביטחון בשימוש בשפה.
          </p>

          <ul className="lista">
            <li>קורס שיחה לרמת מתחילות</li>
            <li>עברית לתעסוקה</li>
            <li>עברית לאקדמיה</li>
            <li>עברית לפיתוח אישי ומקצועי</li>
          </ul>
          <p>תכני הקורסים עוברים התאמות ודיוקים לפי כל קהל יעד וצרכיו.</p>
          <Link href="#">רוצים לשמוע עוד על הקורסים?</Link>
        </div>
      </div>
    </>
  );
}
