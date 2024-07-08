import React, { useEffect, useState, useRef } from 'react';
import './MyPage.css';
import images from "../app/images.js";

const AComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 7000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="aaaaaa">
      <div className="slider">
        <img src={images.big_image} alt="Descriptive Text" className={`qqqqqqqqqqqqq ${currentIndex === 0 ? 'active' : ''}`} />
        <img src={images.mypage} alt="Descriptive Text 2" className={`qqqqqqqqqqqqq ${currentIndex === 1 ? 'active' : ''}`} />
      </div>
      <div className="dots">
        <span className={`dot ${currentIndex === 0 ? 'active' : ''}`} onClick={() => handleDotClick(0)}></span>
        <span className={`dot ${currentIndex === 1 ? 'active' : ''}`} onClick={() => handleDotClick(1)}></span>
      </div>
    </div>
  );
};

const CategoryCard = ({ title, description, link, icon, language }) => (
  <div className="category-card">
    {icon && <img src={icon} alt={`${title} icon`} className="icon" />}
    <h2>{title}</h2>
    <p>{description}</p>
    <a href={link} className="button">
      {language === 'AR' ? 'اقرأ المزيد' : 'קראו עוד'}
    </a>
  </div>
);

const Categories = ({ language }) => {
  return (
    <div className="categories-container">
      <h1 className="main-title">{language === 'AR' ? 'انضموا إلينا' : 'הצטרפו אלינו'}</h1>
      <p className="explanation">
        {language === 'AR' ?
          'نحن ننجح في خلق لغة مشتركة ولقاء بين مئات النساء، ونعمل على تعزيز المساواة في الحقوق والفرص، وضمان ألا تشكل اللغة حاجزًا أمام أي امرأة لتحقيق الاستقلال والتمكين الشخصي، ونقدم دورات لغة، وورش عمل، وخدمات ترجمة للأفراد والمنظمات من جميع أنحاء البلاد'
          :
          'אנחנו מצליחות ליצור יחד שפה משותפת ולהפגיש בין מאות נשים, ופועלות לקדם שוויון זכויות והזדמנויות, ולהבטיח שהשפה לא תהווה חסם בפני אף אישה לעצמאות והגשמה עצמית, ומציעות קורסי שפה, סדנאות ושירותי תרגום לא.נשים וארגונים מכל הארץ'
        }
      </p>
      <div className="categories">
        <CategoryCard
          title={language === 'AR' ? 'مجتمع التعلم: تبادل اللغات' : 'קהילה לומדת: חילופי שפות'}
          description={language === 'AR' ? 'منصات متنوعة لممارسة اللغة العبرية والعربية المحكية مع الناطقات باللغة. مجتمع نسائي مقدسي من كل' : 'מגוון פלטפורמות לתרגול עברית וערבית מדוברת יחד עם דוברות השפה. קהילת נשים ירושלמית מכל'}
          link="../community"
          icon={images.LearningIcon}
          language={language}
        />
        <CategoryCard
          title={language === 'AR' ? 'لغة للفرص: بنحقق أحلامنا' : 'שפה להזדמנויות: بنحقق أحلامنا'}
          description={language === 'AR' ? 'مجتمع نسائي مقدسي شرقي للتطوير الشخصي والمهني والمساعدة في مجالات التوظيف والأكاديميا واستغلال الحقوق' : 'קהילת נשים מזרח ירושלמית לפיתוח אישי ומקצועי ולסיוע בתחומי תעסוקה, אקדמיה ומיצוי זכויות'}
          link="../chance"
          icon={images.OpportunitiesIcon}
          language={language}
        />
        <CategoryCard
          title={language === 'AR' ? 'دورات عبرية وعربية محكية' : 'קורסי עברית וערבית מדוברת'}
          description={language === 'AR' ? 'دورات لغة موجهة لمهارات المحادثة والتواصل والتعرف على المجتمع خلف اللغة' : 'קורסי שפה מוכווני מיומנויות שיחה, תקשורת והכרות עם החברה שמאחורי השפה'}
          link="/hebrew-arabic-courses"
          icon={images.CoursesIcon}
          language={language}
        />
      </div>
    </div>
  );
};

const ImageGrid = ({ language }) => {
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

const MyPage = ({ language }) => {
  return (
    <div className="container_mypage">
      
      <div className="text_mypage">
        <p>
          {language === 'AR' ? '4% من سكان القدس الشرقية يتحدثون العبرية بطلاقة' : '4% מערבי ירושלים מדברים עברית ברמה גבוהה'}
          <br />
          {language === 'AR' ? 'أقل من 10% من اليهود في إسرائيل قادرون على إجراء محادثة باللغة العربية' : 'פחות מ-10% מהיהודים בישראל מסוגלים לנהל שיחה בערבית'}
          <br />
          {language === 'AR' ? 'بدون لغة مشتركة، كيف يمكننا التحدث عن حياة مشتركة؟' : 'בלי שפה משותפת, איך אפשר לדבר על חיים משותפים?'}
          <br />
          {language === 'AR' ? 'يروشاليميت مدبرة تعمل على تعزيز دراسة اللغة العربية والعبرية كأداة للتواصل وتكافؤ الفرص' : 'ירושלמית מדוברת פועלת לקדם לימודי ערבית ועברית ככלי לתקשורת ולשוויון ההזדמניות'}
        </p>
        <a href="../aboutus" className="yuuuo">
          {language === 'AR' ? 'اقرأ المزيد' : 'קראו עוד'}
        </a>
      </div>
      <div className="images_wrapper">
        <img className="responsive-image" src={images.logo} alt="New_Description" />
      </div>
    </div>
  );
};



const PhotoGallery = ({ language }) => {
  const photos = [
    {
      src: images.h_arets,
      title: language === 'AR' ? 'هآرتس' : 'הארץ',
      description: language === 'AR' ? 'بدأت بقصتين، يهودية وفلسطينية، أرادت كل منهما تعلم لغة الأم الأخرى. الطريقة نجحت، والمجموعة التي أنشأتاها تضم الآن مئات المشاركات - من شرق وغرب المدينة' : 'זה התחיל בשתי חברות, יהודייה ופלסטינית, שרצו ללמוד כל אחת את שפת האם של השנייה. השיטה עבדה, והן החליטו לחלוק אותה. הקבוצה שהקימו מונה כיום מאות משתתפות - ממזרח וממערב העיר',
      link: 'https://www.haaretz.co.il/news/education/2019-10-08/ty-article/.premium/0000017f-f856-d044-adff-fbff41060000'
    },
    {
      src: images.kol_ha3er,
      title: language === 'AR' ? 'كل المدينة - جائزة مختاري المدينة' : 'כל העיר - פרס נבחרי העיר',
      description: language === 'AR' ? 'الأكثر يهودية وفلسطينية في القدس: لأول مرة - جائزة مختاري المدينة 2020' : 'הכי ירושלמים וירושלמיות שיש: לראשונה – פרס נבחרי העיר 2020',
      link: 'https://www.kolhair.co.il/jerusalem-news/147007/'
    },
    {
      src: images.TheNewIsraelFund,
      title: language === 'AR' ? 'صندوق إسرائيل الجديد - جائزة يافا لندن ياري' : 'הקרן החדשה לישראל - פרס יפה לונדון-יערי',
      description: language === 'AR' ? 'بطلات! لיאור أورين ومنار بدر فازتا هذا الأسبوع بجائزة يافا لندن ياري بالتعاون مع صندوق إسرائيل الجديد' : 'גיבורות! ליאור אוריין ומנאר בדר זכו השבוע בפרס יפה לונדון יערי בשיתוף הקרן החדשה לישראל',
      link: 'https://www.facebook.com/NewIsraelFund.IL/posts/%D7%92%D7%99%D7%91%D7%95%D7%A8%D7%95%D7%AA-%D7%9C%D7%99%D7%90%D7%95%D7%A8-%D7%90%D7%95%D7%A8%D7%99%D7%99%D7%9F-%D7%95%D7%9E%D7%A0%D7%90%D7%A8-%D7%91%D7%93%D7%A8-%D7%96%D7%9B%D7%95-%D7%94%D7%A9%D7%91%D7%95%D7%A2-%D7%91%D7%A4%D7%A8%D7%A1-%D7%99%D7%A4%D7%94-%D7%9C%D7%95%D7%A0%D7%93%D7%95%D7%9F-%D7%99%D7%A2%D7%A8%D7%99-%D7%91%D7%A9%D7%99%D7%AA%D7%95%D7%A3-%D7%94%D7%A7%D7%A8%D7%9F-%D7%94%D7%97%D7%93%D7%A9%D7%94-/2015034681863342/'
    },
    {
      src: images.DandA,
      title: 'D&A',
      description: language === 'AR' ? 'القدس يتحدثن - لكنهن أيضا يفعلن' : 'ירושלית הן מדברות - אבל גם עושות',
      link: 'https://www.da-magazine.co.il/%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A/%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%AA-%D7%94%D7%9F-%D7%9E%D7%93%D7%91%D7%A8%D7%95%D7%AA-%D7%90%D7%91%D7%9C-%D7%92%D7%9D-%D7%A2%D7%95%D7%A9%D7%95%D7%AA/'
    }
  ];
  return (
    <div className="gallery-container">
      <hr className="separator" />
      <h1 className="main-title">{language === 'AR' ? 'كتبوا عنا' : 'כתבו עלינו'}</h1>
      <p className="explanation">
        {language === 'AR' ?
          'مؤسسات وصحف عديدة كتبت عنا، كتبت كيف بدأت يروشاليميت مدبرة، حيث بدأت بصديقتين، يهودية وفلسطينية، أرادتا تعلم لغة الأم لكل منهما. الطريقة نجحت، والمجموعة التي أنشأتاها تضم الآن مئات المشاركات - من شرق وغرب المدينة، وفازت بالعديد من الجوائز (جائزة مختاري المدينة 2020، جائزة يافا لندن-ياري)'
          :
          'מוסדות ועיתונים רבים כתבו עלינו, כתבו כיצד התחילה ירושלמית מדוברת, שזה התחיל בשתי חברות, יהודייה ופלסטינית, שרצו ללמוד כל אחת את שפת האם של השנייה. השיטה עבדה, הקבוצה שהקימו מונה כיום מאות משתתפות - ממזרח וממערב העיר, וזכו בהרבה פרסים (פרס נבחרי העיר 2020 , פרס יפה לונדון-יערי)'
        }
      </p>
      <div className="gallery">
        {photos.map((photo, index) => (
          <div className="photo-container" key={index}>
            <img src={photo.src} alt={photo.title} />
            <div className="line"></div>
            <div className="title">{photo.title}</div>
            <div className="overlay">
              <div className="description_iii">{photo.description}</div>
              <a href={photo.link} className="read-more">
                {language === 'AR' ? 'اقرأ المزيد' : 'קראו עוד'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



const ImageCarousel = ({ language }) => {
  const image = [
    {
      src: images.LearningIcon,
      title: language === 'AR' ? 'تعلم' : 'למידה',
      description: language === 'AR' ? 'هذا الرمز يمثل التعلم.' : 'הסמל הזה מייצג למידה.',
      link: 'https://www.haaretz.co.il/news/education/2019-10-08/ty-article/.premium/0000017f-f856-d044-adff-fbff41060000'
    },
    {
      src: images.OpportunitiesIcon,
      title: language === 'AR' ? 'فرص' : 'הזדמנויות',
      description: language === 'AR' ? 'هذا الرمز يمثل الفرص.' : 'הסמל הזה מייצג הזדמנויות.',
      link: 'https://example.com/opportunities'
    },
    {
      src: images.TheNewIsraelFund,
      title: language === 'AR' ? 'صندوق إسرائيل الجديد' : 'הקרן החדשה לישראל',
      description: language === 'AR' ? 'هذا الرمز يمثل الدورات.' : 'הסמל הזה מייצג קורסים.',
      link: 'https://www.facebook.com/NewIsraelFund.IL/posts/%D7%92%D7%99%D7%91%D7%95%D7%A8%D7%95%D7%AA-%D7%9C%D7%99%D7%90%D7%95%D7%A8-%D7%90%D7%95%D7%A8%D7%99%D7%99%D7%9F-%D7%95%D7%9E%D7%A0%D7%90%D7%A8-%D7%91%D7%93%D7%A8-%D7%96%D7%9B%D7%95-%D7%94%D7%A9%D7%91%D7%95%D7%A2-%D7%91%D7%A4%D7%A8%D7%A1-%D7%99%D7%A4%D7%94-%D7%9C%D7%95%D7%A0%D7%93%D7%95%D7%9F-%D7%99%D7%A2%D7%A8%D7%99-%D7%91%D7%A9%D7%99%D7%AA%D7%95%D7%A3-%D7%94%D7%A7%D7%A8%D7%9F-%D7%94%D7%97%D7%93%D7%A9%D7%94-/2015034681863342/'
    },
    {
      src: images.current11,
      title: language === 'AR' ? 'الحالي 11' : 'Current 11',
      description: language === 'AR' ? 'هذا الرمز يمثل الحالي 11.' : 'הסמל הזה מייצג current 11.',
      link: 'https://example.com/current11'
    }
  ];

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
        <h1 className="title__nashot_khela">{language === 'AR' ? 'نساء المجتمع' : 'נשות הקהילה'}</h1>
        <div className="title-separator"></div>
        <p className="explanation_nashot_khela">
          {language === 'AR' ?
            'نساء المجتمع يشكلن ركيزة أساسية في المجتمع، ويؤدين أدوارًا متنوعة وهامة في الحياة اليومية. على الرغم من العديد من التحديات عبر التاريخ، أثبتن قوة وتصميم، واستمرن في التأثير وقيادة التغيير الإيجابي في بيئتهن'
            :
            'נשות הקהילה מהוות עמוד תווך חשוב בחברה, ממלאות תפקידים מגוונים ומשמעותיים בחיי היום-יום. למרות אתגרים רבים לאורך ההיסטוריה, הן הוכיחו כוח ונחישות, והמשיכו להשפיע ולהוביל שינוי חיובי בסביבתן'
          }
        </p>
      </header>
      <div className="carousel-container">
        <div className="carousel-slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {image.map((image, index) => (
            <div className="carousel-image-container" key={index}>
              <img src={image.src} alt={`Slide ${index}`} className="carousel-image" />
              <div className="carousel-overlay">
                <h2>{image.title}</h2>
                <p>{image.description}</p>
                <a href={image.link} className="carousel-button">
                  {language === 'AR' ? 'اقرأ المزيد' : 'קראו עוד'}
                </a>
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

const ImageSlider = ({ language }) => {
  const image_shtafem = [
    images.current1, images.current2, images.current3, images.current4,
    images.current5, images.current6, images.current7, images.current8,
    images.current9, images.current10, images.current11, images.current12,
    images.current13, images.current14, images.current15, images.current16,
    images.current17, images.current18, images.current19
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const animation = slider.animate(
        [{ transform: 'translateX(0)' }, { transform: `translateX(-90%)` }],
        {
          duration: image_shtafem.length * 1500, // Adjust duration for smoother animation
          iterations: Infinity,
          easing: 'linear',
        }
      );
      return () => animation.cancel();
    }
  }, [image_shtafem.length]);

  return (
    <div className="image-slider-container">
      <hr className="top-line" />
      <h1 className="main-title">{language === 'AR' ? 'شركاء' : 'שותפים'}</h1>
      <div className="title-separator"></div>
      <p className="explanation">
        {language === 'AR' ?
          'الشراكات تتيح لنا العمل في مجموعة متنوعة من المجالات، كل واحد منهم مهم لنشاطنا ونحن نشكرهم جميعًا على مساهمتهم في نشاطنا'
          :
          'השותפות והשותפים מאפשרים לנו להתקיים במגוון תחומים, כל אחת ואחת חשובה לפעילות שלנו ואנחנו מודות לכולן על תרומתן לפעילות שלנו'
        }
      </p>
      <div className="image-slider">
        <div className="image-container" ref={sliderRef}>
          {image_shtafem.concat(image_shtafem).map((image, index) => (
            <img key={index} src={image} alt={`Image ${index}`} className="image-item" />
          ))}
        </div>
      </div>
    </div>
  );
};

const CombinedComponent = ({ language }) => (
  <>
    <AComponent />
    <MyPage language={language} />
    <ImageGrid language={language} />
    <Categories language={language} />
    <PhotoGallery language={language} />
    <ImageCarousel language={language} />
    <ImageSlider language={language} />
  </>
);

export default CombinedComponent;
