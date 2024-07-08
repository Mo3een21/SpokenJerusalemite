
'use client';
import React, { useState } from 'react';
import NavBar from '/components/NavBar';
import InfoSection from '/components/InfoSection';
import Link from 'next/link';
import Slider from '/components/Slider';
import './styles.css';

const AboutUs = () => {
    const [language, setLanguage] = useState('HE'); // Default language set to 'HE'

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'AR' ? 'HE' : 'AR'));
    };

    return (
        <>
            <NavBar language={language} toggleLanguage={toggleLanguage} />
            <div className="main">
                <div className="section">
                    <div className="image-container" style={{ backgroundImage: `url("/assets/chanceImages/opportunities-1.jpeg")` }}>
                        <div className="image-title">
                            <h2>{language === 'HE' ? 'שפה להזדמנויות' : 'لغة للفرص'}</h2>
                        </div>
                    </div>
                    <p>
                        {language === 'HE' ?
                            "73% מהנשים הערביות בירושלים אינן מצליחות להשתלב בשוק העבודה (לפי מכון ירושלים למחקרי מדיניות, 2022). במהלך שנות פעילותנו אנחנו פוגשות נשים מוכשרות ואיכותיות שאינן מצליחות למצות את הפוטנציאל שלהן. למה? חסם השפה, פחד וחוסר היכרות עם מערב העיר, היעדר נטוורקינג. בשנת 2020 החלטנו לנצל את כוחותינו כקהילה משותפת ולפתוח דלתות." :
                            "73% من النساء العربيات في القدس لا ينجحن في الاندماج في سوق العمل (وفقًا لمعهد القدس لأبحاث السياسات ، 2022). خلال سنوات نشاطنا ، نلتقي بنساء موهوبات وذات جودة لا ينجحن في استيعاب إمكاناتهن الكاملة. لماذا؟ عائق اللغة ، الخوف وعدم المعرفة بمناطق غرب المدينة ، ونقص الشبكات الاجتماعية. في عام 2020 ، قررنا استغلال قوتنا كمجتمع مشترك وفتح أبوابًا."
                        }
                    </p>
                    <p>
                        {language === 'HE' ?
                            "הקמנו את קהילת 'בנחקק אחלאמנה بنحقق أحلامنا' קהילת פיתוח אישי ומקצועי עבור נשים מירושלים המזרחית. חברות בקהילה כיום למעלה מאלף נשים מתחומי עיסוק מגוונים, המסייעות זו לזו בכל שאלה. הקהילה מציעה:" :
                            "قمنا بتأسيس مجتمع 'بنحقق أحلامنا' كمجتمع للتطوير الشخصي والمهني للنساء في القدس الشرقية. تضم الآن أكثر من ألف امرأة من مختلف مجالات العمل ، يساعدن بعضهن البعض في أي مسألة. يقدم المجتمع:"
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
                        {language === 'HE' ?
                            "בזכות רשת סולידריות של מתנדבות מהקהילה המסייעות כל אחת בתחומה." :
                            "بفضل شبكة التضامن بين المتطوعات من المجتمع المساعدة الخاصة في كل مجال."
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
                        {language === 'HE' ?
                            "הקורסים הייחודיים שלנו שמים דגש על מיומנויות שיחה ותקשורת פורמלית ובלתי פורמלית. הם נבנו במטרה להוציא את הלומד.ת כמה שיותר מהר מהכיתה, משלב הלמידה לשלב התרגול, הדיבור והיישום. הם כוללים מרכיבי תרגול רבים על מנת לאפשר צבירת ביטחון בשימוש בשפה. צוות המורות שלנו דוברות עברית שפת אם וערבית ברמה גבוהה, הן מכירות את החסמים ואת החברה המזרח ירושלמית ופועלות ליצור סביבה לימודית מיטבית."
                            :
                            "دوراتنا الفريدة التي تركز على مهارات التحدث والاتصال الرسمي وغير الرسمي. تم بناؤها لإخراج التلميذ بأسرع ما يمكن من الفصل، من مرحلة التعلم إلى مرحلة الممارسة من خلال التعليم الشخصي. نرى في ذلك وسيلة لتعزيز وتحسين الاستثمار والإنفاق."
                        }
                    </p>
                    <p>
                        {language === 'HE' ?
                            "תלמידות ובוגרות הקורסים יכולות להצטרף ל" :
                            "يمكن لطالباتنا وخريجات دوراتنا الانضمام إلى "
                        }
                        <Link href="/courses">
                            {language === 'HE' ? "קהילה הלומדת שלנו" : "المجتمع التعليمي لدينا"}
                        </Link>,
                        {language === 'HE' ?
                            " בה מגוון אפשרויות לתרגול השפה עם דוברותיה. שם, יוכלו בדרך חוויתית ומהירה להתקדם בין שלבי הלימוד, לתרגל ולצבור ביטחון בשימוש בשפה." :
                            " حيث يمكنهن التقدم بطريقة تجريبية وسريعة بين مراحل التعلم، للتدريب واكتساب الثقة في استخدام اللغة."
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
            </div>
        </>
    );
};

export default AboutUs;