import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import images from "../app/images.js";
import { db, storage } from '../app/firebase/firebase'; // Import your Firestore and Storage
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import Modal from './Modal';
import { auth } from '../app/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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
    const [aboutText, setAboutText] = useState('');
    const [newArabicText, setNewArabicText] = useState('');
    const [newHebrewText, setNewHebrewText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]); // State to hold team members data
    const [isAdding, setIsAdding] = useState(false); // State to handle add member modal
    const [isEditingMember, setIsEditingMember] = useState(false); // State to handle edit member modal
    const [editingMemberId, setEditingMemberId] = useState(null); // State to hold the ID of the member being edited
    const [newMember, setNewMember] = useState({
        nameArabic: '',
        nameHebrew: '',
        roleArabic: '',
        roleHebrew: '',
        imageFile: null,
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);


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

    // Define fetchTeamMembers outside of useEffect
    const fetchTeamMembers = useCallback(async () => {
        const querySnapshot = await getDocs(collection(db, 'teamMembers'));
        const members = [];
        querySnapshot.forEach((doc) => {
            members.push({ ...doc.data(), id: doc.id });
        });
        setTeamMembers(members);
    }, []);

    useEffect(() => {
        const fetchAboutText = async () => {
            const docRef = doc(db, 'AboutUs', 'E66ySCkovcI1AQpf7J2r');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setAboutText(language === 'AR' ? data.arabicText : data.hebrewText);
                setNewArabicText(data.arabicText);
                setNewHebrewText(data.hebrewText);
            } else {
                console.log("No such document!");
            }
        };

        fetchAboutText();
        fetchTeamMembers();
    }, [language, fetchTeamMembers]);

    const showSuccessAlert = (message) => {
        const alertContainer = document.createElement('div');
        alertContainer.className = 'success-alert';
        alertContainer.innerHTML = `
            ${message}
            <button class="close-btn" onclick="this.parentElement.style.display='none';">&times;</button>
        `;
    
        document.body.appendChild(alertContainer);
    
        setTimeout(() => {
            if (alertContainer) {
                alertContainer.style.display = 'none';
            }
        }, 5000); // Adjust the timeout duration as needed
    };

    const handleAddMember = async () => {
        if (!newMember.imageFile) {
            alert('Please upload an image');
            return;
        }

        const storageRef = ref(storage, `images/${newMember.imageFile.name}`);
        await uploadBytes(storageRef, newMember.imageFile);
        const imageUrl = await getDownloadURL(storageRef);

        const newMemberData = {
            imageUrl,
            nameArabic: newMember.nameArabic,
            nameHebrew: newMember.nameHebrew,
            roleArabic: newMember.roleArabic,
            roleHebrew: newMember.roleHebrew,
        };

        const docRef = doc(collection(db, 'teamMembers'));
        await setDoc(docRef, newMemberData);

        setIsAdding(false);
        showSuccessAlert(language === 'AR' ? 'تم إضافة العضو بنجاح' : 'החבר הוסף בהצלחה');
        fetchTeamMembers(); // Refresh the team members list
    };

    const handleUpdateText = async () => {
        try {
            const docRef = doc(db, 'AboutUs', 'E66ySCkovcI1AQpf7J2r');
            await setDoc(docRef, {
                arabicText: newArabicText,
                hebrewText: newHebrewText
            }, { merge: true });
            setAboutText(language === 'AR' ? newArabicText : newHebrewText);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const handleEditMember = async () => {
        if (!newMember.imageFile && !newMember.imageUrl) {
            alert('Please upload an image');
            return;
        }
    
        let imageUrl = newMember.imageUrl;
        if (newMember.imageFile) {
            const storageRef = ref(storage, `images/${newMember.imageFile.name}`);
            await uploadBytes(storageRef, newMember.imageFile);
            imageUrl = await getDownloadURL(storageRef);
        }
    
        const updatedMemberData = {
            imageUrl,
            nameArabic: newMember.nameArabic,
            nameHebrew: newMember.nameHebrew,
            roleArabic: newMember.roleArabic,
            roleHebrew: newMember.roleHebrew,
        };
    
        const docRef = doc(db, 'teamMembers', editingMemberId);
        await setDoc(docRef, updatedMemberData, { merge: true });
    
        setIsEditingMember(false);
        showSuccessAlert(language === 'AR' ? 'تم تحديث العضو بنجاح' : 'החבר עודכן בהצלחה');
        fetchTeamMembers(); // Refresh the team members list
    };

    const handleDeleteMember = async () => {
        try {
            const docRef = doc(db, 'teamMembers', memberToDelete.id);
            await deleteDoc(docRef);

            const storageRef = ref(storage, memberToDelete.imageUrl);
            await deleteObject(storageRef);

            setDeleteSuccessMessage(language === 'AR' ? 'تم حذف العضو بنجاح' : 'החבר נמחק בהצלחה');
            fetchTeamMembers(); // Refresh the team members list
            setIsDeleteModalOpen(false);

            setTimeout(() => {
                setDeleteSuccessMessage('');
            }, 5000); // Adjust the timeout duration as needed
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const openDeleteModal = (member) => {
        setMemberToDelete(member);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setMemberToDelete(null);
    };

    return (
        <div className="container">
            <button className="scroll-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                 {language === 'AR' ? 'للأنضمام' : 'להצטרף'}
            </button>
            <div className="text-container">
                <p className="highlight">
                    {aboutText}
                </p>
                <div className="image-founder">
                    <Image 
                        src="/assets/images/3.jpeg"
                        alt="Description of the image"
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="100vw"
                        priority
                    />
                </div>
            </div>
            {isAuthenticated && (
                <div className="button-container">
                    <button onClick={() => setIsEditing(true)} className="edit-button">
                        <Image 
                            src="/assets/images/edit.png" // Replace with the correct path to your image
                            alt={language === 'AR' ? 'تعديل النص' : 'ערוך טקסט'}
                            width={20} // Adjust the width and height as needed
                            height={20}
                        />
                    </button>
                </div>
            )}
            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
                <textarea
                    value={newArabicText}
                    onChange={(e) => setNewArabicText(e.target.value)}
                    placeholder="Edit Arabic Text"
                    style={{ display: language === 'AR' ? 'block' : 'none', width: '100%', height: '150px', marginBottom: '10px' }}
                />
                <textarea
                    value={newHebrewText}
                    onChange={(e) => setNewHebrewText(e.target.value)}
                    placeholder="Edit Hebrew Text"
                    style={{ display: language === 'HE' ? 'block' : 'none', width: '100%', height: '150px', marginBottom: '10px' }}
                />
                <div className="button-container">
                    <button onClick={handleUpdateText} className="save-button">
                        {language === 'AR' ? 'حفظ' : 'שמור'}
                    </button>
                    <button onClick={() => setIsEditing(false)} className="cancel-button">
                        {language === 'AR' ? 'إلغاء' : 'בטל'}
                    </button>
                </div>
            </Modal>
            <ImageGrid></ImageGrid>

            <h2 className="title">{language === 'AR' ? 'فريقنا' : 'הצוות שלנו'}</h2>
            <div className="team">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                        <Image 
                            src={member.imageUrl}
                            alt={member.name}
                            width={150}
                            height={150}
                            style={{ objectFit: "cover" }}
                        />
                        <div className="details">
                            <p>{language === 'AR' ? member.nameArabic : member.nameHebrew}</p>
                            <p>{language === 'AR' ? member.roleArabic : member.roleHebrew}</p>
                            {isAuthenticated && (
                                <>
                                    <button onClick={() => {
                                        setIsEditingMember(true);
                                        setEditingMemberId(member.id);
                                        setNewMember({
                                            nameArabic: member.nameArabic,
                                            nameHebrew: member.nameHebrew,
                                            roleArabic: member.roleArabic,
                                            roleHebrew: member.roleHebrew,
                                            imageUrl: member.imageUrl
                                        });
                                        }}>
                                        <Image 
                                            src="/assets/images/editMember.png" // Replace with the correct path to your edit image
                                            alt={language === 'AR' ? 'تعديل' : 'ערוך'}
                                            width={20} // Adjust the width and height as needed
                                            height={20}
                                        />
                                    </button>

                                    <button onClick={() => openDeleteModal(member)}>
                                        <Image 
                                            src="/assets/images/deleteMember.png" // Replace with the correct path to your delete image
                                            alt={language === 'AR' ? 'حذف' : 'מחק'}
                                            width={20} // Adjust the width and height as needed
                                            height={20}
                                        />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                {isAuthenticated && (
                    <div className="team-member add-member-button" onClick={() => setIsAdding(true)}>
                        <Image 
                            src="/assets/images/addMember.png" 
                            alt="Add Member"
                            width={150}
                            height={150}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                )}
            </div>
            <div className="separator"></div>

            <Modal isOpen={isAdding} onClose={() => setIsAdding(false)}>
                <div className="add-member-modal">
                    <h2>{language === 'AR' ? 'إضافة عضو جديد' : 'הוסף חבר צוות חדש'}</h2>
                    <input 
                        type="text" 
                        placeholder={language === 'AR' ? 'الاسم بالعربية' : 'שם בערבית'} 
                        value={newMember.nameArabic}
                        onChange={(e) => setNewMember({ ...newMember, nameArabic: e.target.value })}
                        className="modal-input"
                    />
                    <input 
                        type="text" 
                        placeholder={language === 'AR' ? 'الاسم بالعبرية' : 'שם בעברית'} 
                        value={newMember.nameHebrew}
                        onChange={(e) => setNewMember({ ...newMember, nameHebrew: e.target.value })}
                        className="modal-input"
                    />
                    <input 
                        type="text" 
                        placeholder={language === 'AR' ? 'الدور بالعربية' : 'תפקיד בערבית'} 
                        value={newMember.roleArabic}
                        onChange={(e) => setNewMember({ ...newMember, roleArabic: e.target.value })}
                        className="modal-input"
                    />
                    <input 
                        type="text" 
                        placeholder={language === 'AR' ? 'الدور بالعبرية' : 'תפקיד בעברית'} 
                        value={newMember.roleHebrew}
                        onChange={(e) => setNewMember({ ...newMember, roleHebrew: e.target.value })}
                        className="modal-input"
                    />
                    <input 
                        type="file" 
                        onChange={(e) => setNewMember({ ...newMember, imageFile: e.target.files[0] })}
                        className="modal-input"
                    />
                    <div className="button-container">
                        <button onClick={handleAddMember} className="save-button">
                            {language === 'AR' ? 'حفظ' : 'שמור'}
                        </button>
                        <button onClick={() => setIsAdding(false)} className="cancel-button">
                            {language === 'AR' ? 'إلغاء' : 'בטל'}
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isEditingMember} onClose={() => setIsEditingMember(false)}>
                <div className="add-member-modal">
                    <h2>{language === 'AR' ? 'تحرير العضو' : 'ערוך חבר צוות'}</h2>
                    <input 
                        type="text" 
                        placeholder={language === 'AR' ? 'الاسم بالعربية' : 'שם בערבית'} 
                        value={newMember.nameArabic}
                        onChange={(e) => setNewMember({ ...newMember, nameArabic: e.target.value })}
                        className="modal-input"
                    />
                    <input 
                        type="text" 
                        placeholder={language === 'AR' ? 'الاسم بالعبرية' : 'שם בעברית'} 
                        value={newMember.nameHebrew}
                        onChange={(e) => setNewMember({ ...newMember, nameHebrew: e.target.value })}
                        className="modal-input"
                    />
                    <input 
                        type="text" 
                        placeholder={language === 'AR' ? 'الدور بالعربية' : 'תפקיד בערבית'} 
                        value={newMember.roleArabic}
                        onChange={(e) => setNewMember({ ...newMember, roleArabic: e.target.value })}
                        className="modal-input"
                    />
                    <input 
                        type="text" 
                        placeholder={language === 'AR' ? 'الدور بالعبرية' : 'תפקיד בעברית'} 
                        value={newMember.roleHebrew}
                        onChange={(e) => setNewMember({ ...newMember, roleHebrew: e.target.value })}
                        className="modal-input"
                    />
                    <input 
                        type="file" 
                        onChange={(e) => setNewMember({ ...newMember, imageFile: e.target.files[0] })}
                        className="modal-input"
                    />
                    <div className="button-container">
                        <button onClick={handleEditMember} className="save-button">
                            {language === 'AR' ? 'تحديث' : 'עדכן'}
                        </button>
                        <button onClick={() => setIsEditingMember(false)} className="cancel-button">
                            {language === 'AR' ? 'إلغاء' : 'בטל'}
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
                <div className="delete-modal">
                    <p>{language === 'AR' ? `هل أنت متأكد أنك تريد حذف ${memberToDelete?.nameArabic}؟` : `האם אתה בטוח שברצונך למחוק את ${memberToDelete?.nameHebrew}?`}</p>
                    <div className="button-container">
                        <button onClick={handleDeleteMember} className="save-button">
                            {language === 'AR' ? 'نعم' : 'כן'}
                        </button>
                        <button onClick={closeDeleteModal} className="cancel-button">
                            {language === 'AR' ? 'لا' : 'לא'}
                        </button>
                    </div>
                </div>
            </Modal>

            {deleteSuccessMessage && (
                <div className="success-message">
                    {deleteSuccessMessage}
                    <button className="close-btn" onClick={() => setDeleteSuccessMessage('')}>&times;</button>
                </div>
            )}

            <h2 className="title" id="contact">{language === 'AR' ? 'تحدثوا إلينا!' : 'דברו איתנו!'}</h2>
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
