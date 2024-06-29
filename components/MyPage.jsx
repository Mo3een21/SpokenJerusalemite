import React, { useEffect, useState, useRef } from 'react';
import './MyPage.css';
import images from "../app/images.js";

const AComponent = () => {
  return (
    <div className="aaaaaa">
      <img src={images.big_image} alt="Descriptive Text" className="qqqqqqqqqqqqq" />
    </div>
  );
};


const CategoryCard = ({ title, description, link, icon }) => (
  <div className="category-card">
    {icon && <img src={icon} alt={`${title} icon`} className="icon" />}
    <h2>{title}</h2>
    <p>{description}</p>
    <a href={link} className="button">קראו עוד</a>
  </div>
);

const Categories = () => {
  return (
    <div className="categories-container">
      <h1 className="main-title">הצטרפו אלינו</h1>
      <p className="explanation">
        אנחנו מצליחות ליצור יחד שפה משותפת ולהפגיש בין מאות נשים, ופועלות לקדם שוויון זכויות והזדמנויות, ולהבטיח שהשפה לא תהווה חסם בפני אף אישה לעצמאות והגשמה עצמית, ומציעות קורסי שפה, סדנאות ושירותי תרגום לא.נשים וארגונים מכל הארץ
      </p>
      <div className="categories">
        <CategoryCard
          title="קהילה לומדת: חילופי שפות"
          description="מגוון פלטפורמות לתרגול עברית וערבית מדוברת יחד עם דוברות השפה. קהילת נשים ירושלמית מכל"
          link="/learning-community-language-exchange"
          icon={images.LearningIcon}
        />
        <CategoryCard
          title="שפה להזדמנויות: بنحقق أحلامنا"
          description="קהילת נשים מזרח ירושלמית לפיתוח אישי ומקצועי ולסיוע בתחומי תעסוקה, אקדמיה ומיצוי זכויות"
          link="/language-for-opportunities"
          icon={images.OpportunitiesIcon}
        />
        <CategoryCard
          title="קורסי עברית וערבית מדוברת"
          description="קורסי שפה מוכווני מיומנויות שיחה, תקשורת והכרות עם החברה שמאחורי השפה"
          link="/hebrew-arabic-courses"
          icon={images.CoursesIcon}
        />
      </div>
    </div>
  );
};
//=================moeen========================
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
        <h2 className="description">שנות קהילה</h2>
      </div>
      <div className="image_threephotos">
        <img src={images.womanImage} alt="Women" />
        <div className="number-box">
          <p className="number">{women}+</p>
        </div>
        <h2 className="description">נשים מכל המגוון הירושלמי</h2>
      </div>
      <div className="image_threephotos">
        <img src={images.volunteerImage} alt="Volunteers" />
        <div className="number-box">
          <p className="number">{volunteers}+</p>
        </div>
        <h2 className="description">מתנדבות</h2>
      </div>
    </div>
  );
};

const MyPage = () => {
  return (
    <div className="container_mypage">
      <div className="images_wrapper">
        <img className="responsive-image" src={images.logo} alt="New_Description" />
        <img className="responsive-image" src={images.mypage} alt="Description_mypage" />
      </div>
      <div className="text_mypage">
        <p>
          4% מערבי ירושלים מדברים עברית ברמה גבוהה
          <br />
          פחות מ-10% מהיהודים בישראל מסוגלים לנהל שיחה בערבית
          <br />
          בלי שפה משותפת, איך אפשר לדבר על חיים משותפים?
          <br />
          ירושלמית מדוברת פועלת לקדם לימודי ערבית ועברית ככלי לתקשורת ולשוויון ההזדמניות
        </p>
        
        <a href="#" className="yuuuo">קראו עוד</a>
      </div>
    </div>
  );
};
//=======================================================

const photos = [
  {
    src: images.h_arets,
    title: 'הארץ',
    description: 'זה התחיל בשתי חברות, יהודייה ופלסטינית, שרצו ללמוד כל אחת את שפת האם של השנייה. השיטה עבדה, והן החליטו לחלוק אותה. הקבוצה שהקימו מונה כיום מאות משתתפות - ממזרח וממערב העיר',
    link: 'https://www.haaretz.co.il/news/education/2019-10-08/ty-article/.premium/0000017f-f856-d044-adff-fbff41060000'
  },
  {
    src: images.kol_ha3er,
    title:'כל העיר - פרס נבחרי העיר' ,
    description: 'הכי ירושלמים וירושלמיות שיש: לראשונה – פרס נבחרי העיר 2020',
    link: 'https://www.kolhair.co.il/jerusalem-news/147007/'
  },
  {
    src: images.TheNewIsraelFund,
    title: 'הקרן החדשה לישראל - פרס יפה לונדון-יערי',
    description: 'גיבורות!  ליאור אוריין ומנאר בדר זכו השבוע בפרס יפה לונדון יערי בשיתוף הקרן החדשה לישראל ',
    link: 'https://www.facebook.com/NewIsraelFund.IL/posts/%D7%92%D7%99%D7%91%D7%95%D7%A8%D7%95%D7%AA-%D7%9C%D7%99%D7%90%D7%95%D7%A8-%D7%90%D7%95%D7%A8%D7%99%D7%99%D7%9F-%D7%95%D7%9E%D7%A0%D7%90%D7%A8-%D7%91%D7%93%D7%A8-%D7%96%D7%9B%D7%95-%D7%94%D7%A9%D7%91%D7%95%D7%A2-%D7%91%D7%A4%D7%A8%D7%A1-%D7%99%D7%A4%D7%94-%D7%9C%D7%95%D7%A0%D7%93%D7%95%D7%9F-%D7%99%D7%A2%D7%A8%D7%99-%D7%91%D7%A9%D7%99%D7%AA%D7%95%D7%A3-%D7%94%D7%A7%D7%A8%D7%9F-%D7%94%D7%97%D7%93%D7%A9%D7%94-/2015034681863342/'
  },
  {
    src: images.DandA,
    title: 'D&A',
    description: 'ירושלית הן מדברות - אבל גם עושות',
    link: 'https://www.da-magazine.co.il/%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A/%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%9E%D7%99%D7%AA-%D7%94%D7%9F-%D7%9E%D7%93%D7%91%D7%A8%D7%95%D7%AA-%D7%90%D7%91%D7%9C-%D7%92%D7%9D-%D7%A2%D7%95%D7%A9%D7%95%D7%AA/'
  }
];

const PhotoGallery = () => {
  return (
    <div className="gallery-container">
      <hr className="separator" />
      <h1 className="main-title">כתבו עלינו</h1>
      <p className="explanation">מוסדות ועיתונים רבים כתבו עלינו, כתבו כיצד התחילה ירושלמית מדוברת, שזה התחיל בשתי חברות, יהודייה ופלסטינית, שרצו ללמוד כל אחת את שפת האם של השנייה. השיטה עבדה, הקבוצה שהקימו מונה כיום מאות משתתפות - ממזרח וממערב העיר, וזכו בהרבה פרסים (פרס נבחרי העיר 2020 , פרס יפה לונדון-יערי) </p>
      <div className="gallery">
        {photos.map((photo, index) => (
          <div className="photo-container" key={index}>
            <img src={photo.src} alt={photo.title} />
            <div className="line"></div>
            <div className="title">{photo.title}</div>
            <div className="overlay">
              <div className="description_iii">{photo.description}</div>
              <a href={photo.link} className="read-more">קראו עוד</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
//=======================================================
const image = [
  {
      src: "images.LearningIcon",
      title: 'הארץ',
      description: 'This icon represents learning.',
      link: 'https://www.haaretz.co.il/news/education/2019-10-08/ty-article/.premium/0000017f-f856-d044-adff-fbff41060000'
  },
  {
      src: images.OpportunitiesIcon,
      title: 'פרס פה לונדון יערי',
      description: 'This icon represents opportunities.',
      link: 'https://example.com/opportunities'
  },
  {
      src: images.TheNewIsraelFund,
      title: 'פרס פה לונדון יערי',
      description: 'This icon represents courses.',
      link: 'https://www.facebook.com/NewIsraelFund.IL/posts/%D7%92%D7%99%D7%91%D7%95%D7%A8%D7%95%D7%AA-%D7%9C%D7%99%D7%90%D7%95%D7%A8-%D7%90%D7%95%D7%A8%D7%99%D7%99%D7%9F-%D7%95%D7%9E%D7%A0%D7%90%D7%A8-%D7%91%D7%93%D7%A8-%D7%96%D7%9B%D7%95-%D7%94%D7%A9%D7%91%D7%95%D7%A2-%D7%91%D7%A4%D7%A8%D7%A1-%D7%99%D7%A4%D7%94-%D7%9C%D7%95%D7%A0%D7%93%D7%95%D7%9F-%D7%99%D7%A2%D7%A8%D7%99-%D7%91%D7%A9%D7%99%D7%AA%D7%95%D7%A3-%D7%94%D7%A7%D7%A8%D7%9F-%D7%94%D7%97%D7%93%D7%A9%D7%94-/2015034681863342/'
  },
  {
      src: images.current11,
      title: 'Current 11',
      description: 'This icon represents current 11.',
      link: 'https://example.com/current11'
  }
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => {
              let nextIndex = prevIndex + direction;
              if (nextIndex === image.length) {
                  setDirection(-1); // Reverse direction
                  nextIndex = prevIndex - 1;
              } else if (nextIndex === -1) {
                  setDirection(1); // Forward direction
                  nextIndex = prevIndex + 1;
              }
              return nextIndex;
          });
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval); // Clean up interval on component unmount
  }, [direction]);

  const handleDotClick = (index) => {
      setCurrentIndex(index);
      setDirection(index > currentIndex ? 1 : -1); // Set direction based on dot click
  };

  return (
      <div className="carousel-page">
          <hr className="top-line" />
          <header className="title__nashot_khela">
          <h1 className="title__nashot_khela">נשות הקהילה</h1>
    <div className="title-separator"></div>
    <p className="explanation_nashot_khela">נשות הקהילה מהוות עמוד תווך חשוב בחברה, ממלאות תפקידים מגוונים ומשמעותיים בחיי היום-יום. למרות אתגרים רבים לאורך ההיסטוריה, הן הוכיחו כוח ונחישות, והמשיכו להשפיע ולהוביל שינוי חיובי בסביבתן</p>
          </header>
          <div className="carousel-container">
              <div className="carousel-slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                  {image.map((image, index) => (
                      <div className="carousel-image-container" key={index}>
                          <img src={image.src} alt={`Slide ${index}`} className="carousel-image" />
                          <div className="carousel-overlay">
                              <h2>{image.title}</h2>
                              <p>{image.description}</p>
                              <a href={image.link} className="carousel-button">קראו עוד</a>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="carousel-dots">
                  {image.map((_, index) => (
                      <span
                          key={index}
                          className={`dot ${currentIndex === index ? 'active' : ''}`}
                          onClick={() => handleDotClick(index)}
                      ></span>
                  ))}
              </div>
          </div>
      </div>
  );
};
//=======================================================

const ImageSlider = () => {
  const [startIndex, setStartIndex] = useState(0); // State to track the starting index of the visible images
  const image_shtafem = [images.current1, images.current2, images.current3, images.current4, images.current5, images.current6, images.current7, images.current8, images.current9, images.current10, images.current11, images.current12, images.current13, images.current14, images.current15, images.current16, images.current17, images.current18, images.current19];

  const intervalDuration = 3000; // Adjust the interval duration as needed

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < image_shtafem.length - 8) {
      setStartIndex(startIndex + 1);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (startIndex < image_shtafem.length - 8) {
        setStartIndex(startIndex + 1);
      } else {
        setStartIndex(0);
      }
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, [startIndex, image_shtafem.length, intervalDuration]);

  return (
    <div className="image-slider-container">
      <hr className="top-line" />
      <h1 className="main-title">שותפים</h1>
      <div className="title-separator"></div>
      <p className="explanation">השותפות והשותפים מאפשרים לנו להתקיים במגוון תחומים, כל אחת ואחת חשובה לפעילות שלנו ואנחנו מודות לכולן על תרומתן לפעילות שלנו</p>
      <div className="image-slider">
        <button onClick={handlePrev} className="button_yamen">&lt;</button>
        <div className="image-container">
          {image_shtafem.slice(startIndex, startIndex + 8).map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + startIndex}`} className="image-item" />
          ))}
        </div>
        <button onClick={handleNext} className="button-next">&gt;</button>
      </div>
    </div>
  );
};
//=======================================================
const CombinedComponent = () => (
  <>
    <AComponent />
    <MyPage />
     <ImageGrid />
   <Categories />
    <PhotoGallery />
    <ImageCarousel />
    <ImageSlider />
  </>
);

export default CombinedComponent;
