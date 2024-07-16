import React, { useEffect, useState, useRef } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Ensure this line is present
import { db } from '../app/firebase/firebase'; // Adjust the import path as needed
import './MyPage.css';
import images from "../app/images.js";
import Modal from './Modal'; // Assuming you have a modal component
import { auth } from '../app/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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

const CategoryCard = ({ title, description, link, icon, language, onEdit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  return (
    <div className="category-card"> 
      {icon && <img src={icon} alt={`${title} icon`} className="icon" />}
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={link} className="button">
        {language === 'AR' ? 'اقرأ المزيد' : 'קראו עוד'}
      </a>
              {onEdit && isAuthenticated && (
          <div className="button-container">
            <button className='button-save' onClick={onEdit} className="edit-button">
              <img 
                src="/assets/images/edit.png" // Ensure this is the correct path to your image
                alt={language === 'AR' ? 'تعديل' : 'ערוך'}
                width={20} // Adjust the width and height as needed
                height={20}
              />
            </button>
          </div>
        )}
    </div>
  );
};

// ==================================================================
const CategoryCard1 = ({ language }) => {
  const [pageData, setPageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ arabicText: '', hebrewText: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    const fetchPageData = async () => {
      try {
        const docRef = doc(db, 'HomePage', 'AzexuEWPAoI5YUYdzkE9'); // Adjust the path as needed
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPageData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchPageData();
  }, []);

  const handleEdit = () => {
    setTempData({ arabicText: pageData.text_A2, hebrewText: pageData.text_H2 });
    setIsEditing(true);
    console.log('Edit button clicked');
  };

  const handleSave = async () => {
    console.log('Attempting to save data:', tempData); // Debug log
    try {
      const docRef = doc(db, 'HomePage', 'AzexuEWPAoI5YUYdzkE9'); // Adjust the path as needed
      await updateDoc(docRef, {
        text_A2: tempData.arabicText,
        text_H2: tempData.hebrewText
      });
      setPageData({ text_A2: tempData.arabicText, text_H2: tempData.hebrewText });
      setIsEditing(false);
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div > 
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div>
          <label>
          عربي
            <textarea
              value={tempData.arabicText}
              onChange={(e) => setTempData({ ...tempData, arabicText: e.target.value })}
            />
          </label>
          <label>
          עברית
            <textarea
              value={tempData.hebrewText}
              onChange={(e) => setTempData({ ...tempData, hebrewText: e.target.value })}
            />
          </label>
          <button className='button-save' onClick={handleSave}>Save</button>
        </div>
      </Modal>
      <CategoryCard
          title={language === 'AR' ? 'لغة للفرص: بنحقق أحلامنا' : 'שפה להזדמנויות: بنحقق أحلامنا'}
          description={language === 'AR' ? pageData.text_A2 : pageData.text_H2}
          link="../chance"
          icon={images.OpportunitiesIcon}
          language={language}
          onEdit={handleEdit}
        />
    </div>
  );
};



// ==================================================================
const CategoryCard2 = ({ language }) => {
  const [pageData, setPageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ arabicText: '', hebrewText: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    const fetchPageData = async () => {
      try {
        const docRef = doc(db, 'HomePage', '87PH1GQPA7JkkxLUtK1d'); // Adjust the path as needed
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPageData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchPageData();
  }, []);

  const handleEdit = () => {
    setTempData({ arabicText: pageData.text_A1, hebrewText: pageData.text_H1 });
    setIsEditing(true);
    console.log('Edit button clicked');
  };

  const handleSave = async () => {
    console.log('Attempting to save data:', tempData); // Debug log
    try {
      const docRef = doc(db, 'HomePage', '87PH1GQPA7JkkxLUtK1d'); // Adjust the path as needed
      await updateDoc(docRef, {
        text_A1: tempData.arabicText,
        text_H1: tempData.hebrewText
      });
      setPageData({ text_A1: tempData.arabicText, text_H1: tempData.hebrewText });
      setIsEditing(false);
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div>
          <label>
          عربي
            <textarea
              value={tempData.arabicText}
              onChange={(e) => setTempData({ ...tempData, arabicText: e.target.value })}
            />
          </label>
          <label>
          עברית
            <textarea
              value={tempData.hebrewText}
              onChange={(e) => setTempData({ ...tempData, hebrewText: e.target.value })}
            />
          </label>
          <button className='button-save' onClick={handleSave}>Save</button>
        </div>
      </Modal>
      <CategoryCard
          title={language === 'AR' ? 'دورات عبرية وعربية محكية' : 'קורסי עברית וערבית מדוברת'}
          description={language === 'AR' ? pageData.text_A1 : pageData.text_H1}
          link="/hebrew-arabic-courses"
          icon={images.CoursesIcon}
          language={language}
          onEdit={handleEdit}
        />
    </div>
  );
};



// ==================================================================
const CategoryCard3 = ({ language }) => {
  const [pageData, setPageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ arabicText: '', hebrewText: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    const fetchPageData = async () => {
      try {
        const docRef = doc(db, 'HomePage', 'E7WInjFavmTYHs2mqm4M'); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPageData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchPageData();
  }, []);

  const handleEdit = () => {
    setTempData({ arabicText: pageData.text_A2, hebrewText: pageData.text_H2 });
    setIsEditing(true);
    console.log('Edit button clicked');
  };

  const handleSave = async () => {
    console.log('Attempting to save data:', tempData); // Debug log
    try {
      const docRef = doc(db, 'HomePage', 'E7WInjFavmTYHs2mqm4M'); // Adjust the path as needed
      await updateDoc(docRef, {
        text_A2: tempData.arabicText,
        text_H2: tempData.hebrewText
      });
      setPageData({ text_A2: tempData.arabicText, text_H2: tempData.hebrewText });
      setIsEditing(false);
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div>
          <label>
          عربي
            <textarea
              value={tempData.arabicText}
              onChange={(e) => setTempData({ ...tempData, arabicText: e.target.value })}
            />
          </label>
          <label>
          עברית
            <textarea
              value={tempData.hebrewText}
              onChange={(e) => setTempData({ ...tempData, hebrewText: e.target.value })}
            />
          </label>
          <button className='button-save' onClick={handleSave}>Save</button>
        </div>
      </Modal>
      <CategoryCard 
           title={language === 'AR' ? 'مجتمع التعلم: تبادل اللغات' : 'קהילה לומדת: חילופי שפות'}
          description={language === 'AR' ? pageData.text_A2 : pageData.text_H2}
          link="/hebrew-arabic-courses"
          icon={images.CoursesIcon}
          language={language}
          onEdit={handleEdit}
        />
    </div>
  );
};


// ==================================================================

const Categories = ({ language }) => {
  const [pageData, setPageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ arabicText: '', hebrewText: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    const fetchPageData = async () => {
      try {
        const docRef = doc(db, 'HomePage', 'sF2npE818vm5YiCg52Ck'); // Adjust the path as needed
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPageData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchPageData();
  }, []);

  const handleEdit = () => {
    setTempData({ arabicText: pageData.text_A1, hebrewText: pageData.text_H1 });
    setIsEditing(true);
    console.log('Edit button clicked');
  };

  const handleSave = async () => {
    console.log('Attempting to save data:', tempData); // Debug log
    try {
      const docRef = doc(db, 'HomePage', 'sF2npE818vm5YiCg52Ck'); // Adjust the path as needed
      await updateDoc(docRef, {
        text_A1: tempData.arabicText,
        text_H1: tempData.hebrewText
      });
      setPageData({ text_A1: tempData.arabicText, text_H1: tempData.hebrewText });
      setIsEditing(false);
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categories-container">
      <h1 className="main-title">{language === 'AR' ? 'انضموا إلينا' : 'הצטרפו אלינו'}</h1>
      <p className="explanation">
        {language === 'AR' ? pageData.text_A1 : pageData.text_H1}
      </p>
      {isAuthenticated && (
       <div className="button-container">
         <button onClick={handleEdit} className="edit-button">
           <img 
             src="/assets/images/edit.png" // Ensure this is the correct path to your image
             alt={language === 'AR' ? 'تعديل' : 'ערוך'}
             width={20} // Adjust the width and height as needed
             height={20}
           />
         </button>
       </div>
        )}
      
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div>
          <label>
          عربي
            <textarea
              value={tempData.arabicText}
              onChange={(e) => setTempData({ ...tempData, arabicText: e.target.value })}
            />
          </label>
          <label>
          עברית
            <textarea
              value={tempData.hebrewText}
              onChange={(e) => setTempData({ ...tempData, hebrewText: e.target.value })}
            />
          </label>
          <button className='button-save' onClick={handleSave}>Save</button>
        </div>
      </Modal>
      <div className="categories">
        <CategoryCard1 language={language} />
        <CategoryCard2 language={language} />
        <CategoryCard3 language={language} />
      </div>
    </div>
  );
};
// ==================================================================


const ImageGrid = ({ language }) => {
  const [years, setYears] = useState(0);
  const [women, setWomen] = useState(0);
  const [volunteers, setVolunteers] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ years: 0, women: 0, volunteers: 0 });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const docRef = doc(db, 'HomePage', 'jAaHVUltzrgQ2clDmm2N');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setYears(data.number_1);
          setWomen(data.number_2);
          setVolunteers(data.number_3);
          // Assuming startAnimation is defined elsewhere and correctly handles the animation
          startAnimation(data.number_1, data.number_2, data.number_3);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
  
    fetchNumbers();
  }, []); // Dependency array is empty, so this runs once on mount
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  
    return () => unsubscribe(); // Cleanup function to unsubscribe
  }, []); // Dependency array is empty, so this runs once on mount

  useEffect(() => {
    const handleScroll = () => {
      if (!hasAnimated && gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
          // Assuming startAnimation is defined elsewhere and correctly handles the animation
          startAnimation();
          setHasAnimated(true); // Ensure animation doesn't run again
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]); // Re-run this effect if hasAnimated changes

  const startAnimation = (yearsFinal, womenFinal, volunteersFinal) => {
    const duration = 900;
    const steps = 100;
    const intervalDuration = duration / steps;

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

  const handleEdit = () => {
    setTempData({ years, women, volunteers });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'HomePage', 'jAaHVUltzrgQ2clDmm2N');
      await updateDoc(docRef, {
        number_1: tempData.years,
        number_2: tempData.women,
        number_3: tempData.volunteers
      });
      setYears(tempData.years);
      setWomen(tempData.women);
      setVolunteers(tempData.volunteers);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div ref={gridRef} className="image-grid">
      {isAuthenticated && (
  <div className="button-container">
    <button onClick={handleEdit} className="edit-button">
      <img 
        src="/assets/images/edit.png" // Ensure this is the correct path to your image
        alt={language === 'AR' ? 'تعديل' : 'ערוך'}
        width={20} // Adjust the width and height as needed
        height={20}
      />
    </button>
  </div>
)}
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

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div>
          <label>
          שנות קהילה / سنوات من المجتمع
            <input
              type="number"
              value={tempData.years}
              onChange={(e) => setTempData({ ...tempData, years: parseInt(e.target.value) })}
            />
          </label>
          <label>
          נשים מכל המגוון הירושלמי / امرأة من جميع أنحاء القدس 
          <input
              type="number"
              value={tempData.women}
              onChange={(e) => setTempData({ ...tempData, women: parseInt(e.target.value) })}
            />
          </label>
          <label>
          متطوعات / מתנדבות
            <input
              type="number"
              value={tempData.volunteers}
              onChange={(e) => setTempData({ ...tempData, volunteers: parseInt(e.target.value) })}
            />
          </label>
          <button className='button-save' onClick={handleSave}>Save</button>
        </div>
      </Modal>
    </div>
  );
};
// ==================================================================
const MyPage = ({ language }) => {
  const [pageData, setPageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ arabicText_h1: '', hebrewText_h1: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const docRef = doc(db, 'HomePage', 'C8OZrL3ycBZXzEDQ7c3u');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPageData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchPageData();
  }, []);

  const handleEdit = () => {
    setTempData({ arabicText_h1: pageData.arabicText_h1, hebrewText_h1: pageData.hebrewText_h1 });
    setIsEditing(true);
    console.log('Edit button clicked');
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'HomePage', 'C8OZrL3ycBZXzEDQ7c3u');
      await updateDoc(docRef, {
        arabicText_h1: tempData.arabicText_h1,
        hebrewText_h1: tempData.hebrewText_h1
      });
      setPageData(tempData);
      setIsEditing(false);
      console.log('Document updated');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container_mypage">
      <div className="text_mypage">
        <p>
          {language === 'AR' ? pageData.arabicText_h1 : pageData.hebrewText_h1}
        </p>
        <a href={pageData.readMoreLink} className="yuuuo">
          {language === 'AR' ? 'اقرأ المزيد' : 'קראו עוד'}
        </a>
        {isAuthenticated && (
         <div className="button-container">
           <button onClick={handleEdit} className="edit-button">
             <img 
               src="/assets/images/edit.png" // Ensure this is the correct path to your image
               alt={language === 'AR' ? 'تعديل' : 'ערוך'}
               width={20} // Adjust the width and height as needed
               height={20}
             />
           </button>
         </div>
       )}
      </div>
      <div className="images_wrapper">
        <img className="responsive-image" src={images.logo} alt="Description" />
      </div>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div>
          <label>
            عربي
            <textarea
              value={tempData.arabicText_h1}
              onChange={(e) => setTempData({ ...tempData, arabicText_h1: e.target.value })}
            />
          </label>
          <label>
           עברית
            <textarea
              value={tempData.hebrewText_h1}
              onChange={(e) => setTempData({ ...tempData, hebrewText_h1: e.target.value })}
            />
          </label>
          <button className='button-save' onClick={handleSave}>Save</button>
        </div>
      </Modal>
    </div>
  );
};




const PhotoGallery = ({ language }) => {
  const [pageData, setPageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ arabicText: '', hebrewText: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    const fetchPageData = async () => {
      try {
        const docRef = doc(db, 'HomePage', 'PtTR4dN5ev44OhqtgPNK'); // Adjust the path as needed
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPageData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchPageData();
  }, []);

  const handleEdit = () => {
    setTempData({ arabicText: pageData.text_A, hebrewText: pageData.text_H });
    setIsEditing(true);
    console.log('Edit button clicked');
  };

  const handleSave = async () => {
    console.log('Attempting to save data:', tempData); // Debug log
    try {
      const docRef = doc(db, 'HomePage', 'PtTR4dN5ev44OhqtgPNK'); // Adjust the path as needed
      await updateDoc(docRef, {
        text_A: tempData.arabicText,
        text_H: tempData.hebrewText
      });
      setPageData({ text_A: tempData.arabicText, text_H: tempData.hebrewText });
      setIsEditing(false);
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div className="gallery-container">
      <hr className="separator" />
      <h1 className="main-title">{language === 'AR' ? 'كتبوا عنا' : 'כתבו עלינו'}</h1>
      <p className="explanation">
        {language === 'AR' ?
          pageData?.text_A :
          pageData?.text_H
        }
      </p>
      {isAuthenticated && (
        <div className="button-container">
          <button onClick={handleEdit} className="edit-button">
            <img 
              src="/assets/images/edit.png" // Ensure this is the correct path to your image
              alt={language === 'AR' ? 'تعديل' : 'ערוך'}
              width={20} // Adjust the width and height as needed
              height={20}
            />
          </button>
        </div>
      )}
      
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div>
          <label>
          عربي
            <textarea
              value={tempData.arabicText}
              onChange={(e) => setTempData({ ...tempData, arabicText: e.target.value })}
            />
          </label>
          <label>
          עברית
            <textarea
              value={tempData.hebrewText}
              onChange={(e) => setTempData({ ...tempData, hebrewText: e.target.value })}
            />
          </label>
          <button className='button-save' onClick={handleSave}>Save</button>
        </div>
      </Modal>
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
  const [pageData, setPageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ arabicText: '', hebrewText: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    const fetchPageData = async () => {
      try {
        const docRef = doc(db, 'HomePage', 'o1e9hDJQ9Gyv4d00m5Lm'); // Adjust the path as needed
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPageData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchPageData();
  }, []);

  const handleEdit = () => {
    setTempData({ arabicText: pageData.text_A, hebrewText: pageData.text_H });
    setIsEditing(true);
    console.log('Edit button clicked');
  };

  const handleSave = async () => {
    console.log('Attempting to save data:', tempData); // Debug log
    try {
      const docRef = doc(db, 'HomePage', 'o1e9hDJQ9Gyv4d00m5Lm'); // Adjust the path as needed
      await updateDoc(docRef, {
        text_A: tempData.arabicText,
        text_H: tempData.hebrewText
      });
      setPageData({ text_A: tempData.arabicText, text_H: tempData.hebrewText });
      setIsEditing(false);
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

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
            pageData?.text_A :
            pageData?.text_H
          }
        </p>
        {isAuthenticated && (
         <div className="button-container">
           <button onClick={handleEdit} className="edit-button">
             <img 
               src="/assets/images/edit.png" // Ensure this is the correct path to your image
               alt={language === 'AR' ? 'تعديل' : 'ערוך'}
               width={20} // Adjust the width and height as needed
               height={20}
             />
           </button>
         </div>
         )}
      </header>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div>
          <label>
          عربي
            <textarea
              value={tempData.arabicText}
              onChange={(e) => setTempData({ ...tempData, arabicText: e.target.value })}
            />
          </label>
          <label>
          עברית
            <textarea
              value={tempData.hebrewText}
              onChange={(e) => setTempData({ ...tempData, hebrewText: e.target.value })}
            />
          </label>
          <button className='button-save' onClick={handleSave}>Save</button>
        </div>
      </Modal>
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
  const containerRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;

    if (slider && container) {
      const animation = slider.animate(
        [{ transform: 'translateX(0)' }, { transform: `translateX(-${container.clientWidth}px)` }],
        {
          duration: image_shtafem.length * 2300, // Adjust duration for smoother animation
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
      <div className="image-slider" ref={containerRef}>
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
