import React, { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, auth } from '../app/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Modal from './Modal';
import './women.css';

const WomenComponent = ({ language }) => {
  const [stories, setStories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStoryId, setCurrentStoryId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

  const [newStory, setNewStory] = useState({
    headerArabic: '',
    headerHebrew: '',
    textArabic: '',
    textHebrew: '',
    imageFile: null,
    imgURL: ''
  });

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'womenPage'));
        const storiesData = [];
        querySnapshot.forEach((doc) => {
          storiesData.push({ id: doc.id, ...doc.data() });
        });
        setStories(storiesData);
      } catch (error) {
        console.error("Error fetching stories: ", error);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleAddStory = async () => {
    if (!newStory.imageFile) {
      alert('Please upload an image');
      return;
    }

    try {
      const storageRef = ref(storage, `images/${newStory.imageFile.name}`);
      await uploadBytes(storageRef, newStory.imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      const newStoryData = {
        headerArabic: newStory.headerArabic,
        headerHebrew: newStory.headerHebrew,
        textArabic: newStory.textArabic,
        textHebrew: newStory.textHebrew,
        imgURL: imageUrl,
      };

      const docRef = doc(collection(db, 'womenPage'));
      await setDoc(docRef, newStoryData);

      setIsAdding(false);
      alert(language === 'AR' ? 'تم إضافة القصة بنجاح' : 'הסיפור נוסף בהצלחה');
      
      // Fetch stories again to include the new one
      const querySnapshot = await getDocs(collection(db, 'womenPage'));
      const storiesData = [];
      querySnapshot.forEach((doc) => {
        storiesData.push({ id: doc.id, ...doc.data() });
      });
      setStories(storiesData);

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleEditStory = async () => {
    try {
      let imageUrl = newStory.imgURL;
      if (newStory.imageFile) {
        const storageRef = ref(storage, `images/${newStory.imageFile.name}`);
        await uploadBytes(storageRef, newStory.imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const updatedStoryData = {
        headerArabic: newStory.headerArabic,
        headerHebrew: newStory.headerHebrew,
        textArabic: newStory.textArabic,
        textHebrew: newStory.textHebrew,
        imgURL: imageUrl,
      };

      const docRef = doc(db, 'womenPage', currentStoryId);
      await setDoc(docRef, updatedStoryData, { merge: true });

      setIsEditing(false);
      alert(language === 'AR' ? 'تم تحديث القصة بنجاح' : 'הסיפור עודכן בהצלחה');

      // Fetch stories again to update the list
      const querySnapshot = await getDocs(collection(db, 'womenPage'));
      const storiesData = [];
      querySnapshot.forEach((doc) => {
        storiesData.push({ id: doc.id, ...doc.data() });
      });
      setStories(storiesData);

    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDeleteStory = async () => {
    if (!storyToDelete) return;
  
    const { id, imgURL } = storyToDelete;
    try {
      await deleteDoc(doc(db, 'womenPage', id));
      const imageRef = ref(storage, imgURL);
      await deleteObject(imageRef);
  
      alert(language === 'AR' ? 'تم حذف القصة بنجاح' : 'הסיפור נמחק בהצלחה');
  
      // Fetch stories again to remove the deleted one
      const querySnapshot = await getDocs(collection(db, 'womenPage'));
      const storiesData = [];
      querySnapshot.forEach((doc) => {
        storiesData.push({ id: doc.id, ...doc.data() });
      });
      setStories(storiesData);
      setIsDeleteModalOpen(false); // Close the delete modal
      setStoryToDelete(null); // Clear the story to delete
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  
  const openDeleteModal = (story) => {
    setStoryToDelete(story);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (story) => {
    setCurrentStoryId(story.id);
    setNewStory({
      headerArabic: story.headerArabic,
      headerHebrew: story.headerHebrew,
      textArabic: story.textArabic,
      textHebrew: story.textHebrew,
      imgURL: story.imgURL,
      imageFile: null
    });
    setIsEditing(true);
  };

  return (
    <div className="page-container">
      <div className="story-page">
        {isAuthenticated && (
          <img 
          src="/assets/images/addStory.png" 
          alt={language === 'AR' ? 'أضف قصة جديدة' : 'הוסף סיפור חדש'} 
          onClick={() => setIsAdding(true)} 
          className="add-story-button"
        />
        )}
        {stories.map((story, index) => (
          <div key={story.id}>
            {index !== 0 && <div className="separator"></div>}
            <div className="story-container">
              <div className="story-image">
                {story.imgURL && <img src={story.imgURL} alt="Story" />}
              </div>
              <div className="story-text">
                <h2>{language === 'AR' ? story.headerArabic : story.headerHebrew}</h2>
                <p>{language === 'AR' ? story.textArabic : story.textHebrew}</p>
                {isAuthenticated && (
                  <div className="button-container">
                      <img
                      src="/assets/images/editStory.png"
                      alt={language === 'AR' ? 'تعديل' : 'ערוך'}
                      onClick={() => openEditModal(story)}
                      className="edit-button"
                      />
                      <img
                      src="/assets/images/deleteStory.png"
                      alt={language === 'AR' ? 'حذف' : 'מחק'}
                      onClick={() => openDeleteModal(story)}
                      className="delete-button"
                      />
                      </div>
                  )}
              </div>
            </div>
          </div>
        ))}
        <Modal isOpen={isAdding} onClose={() => setIsAdding(false)}>
          <div className="add-story-modal">
            <h2>{language === 'AR' ? 'إضافة قصة جديدة' : 'הוסף סיפור חדש'}</h2>
            <input 
              type="text" 
              placeholder={language === 'AR' ? 'العنوان بالعربية' : 'כותרת בערבית'} 
              value={newStory.headerArabic}
              onChange={(e) => setNewStory({ ...newStory, headerArabic: e.target.value })}
              className="modal-input"
            />
            <input 
              type="text" 
              placeholder={language === 'AR' ? 'العنوان بالعبرية' : 'כותרת בעברית'} 
              value={newStory.headerHebrew}
              onChange={(e) => setNewStory({ ...newStory, headerHebrew: e.target.value })}
              className="modal-input"
            />
            <textarea
              placeholder={language === 'AR' ? 'النص بالعربية' : 'תוכן בערבית'}
              value={newStory.textArabic}
              onChange={(e) => setNewStory({ ...newStory, textArabic: e.target.value })}
              className="modal-input"
            />
            <textarea
              placeholder={language === 'AR' ? 'النص بالعبرية' : 'תוכן בעברית'}
              value={newStory.textHebrew}
              onChange={(e) => setNewStory({ ...newStory, textHebrew: e.target.value })}
              className="modal-input"
            />
            <input 
              type="file" 
              onChange={(e) => setNewStory({ ...newStory, imageFile: e.target.files[0] })}
              className="modal-input"
            />
            <div className="button-container">
              <button onClick={handleAddStory} className="save-button">
                {language === 'AR' ? 'حفظ' : 'שמור'}
              </button>
              <button onClick={() => setIsAdding(false)} className="cancel-button">
                {language === 'AR' ? 'إلغاء' : 'בטל'}
              </button>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <div className="add-story-modal">
            <h2>{language === 'AR' ? 'تعديل القصة' : 'ערוך סיפור'}</h2>
            <input 
              type="text" 
              placeholder={language === 'AR' ? 'العنوان بالعربية' : 'כותרת בערבית'} 
              value={newStory.headerArabic}
              onChange={(e) => setNewStory({ ...newStory, headerArabic: e.target.value })}
              className="modal-input"
            />
            <input 
              type="text" 
              placeholder={language === 'AR' ? 'العنوان بالعبرية' : 'כותרת בעברית'} 
              value={newStory.headerHebrew}
              onChange={(e) => setNewStory({ ...newStory, headerHebrew: e.target.value })}
              className="modal-input"
            />
            <textarea
              placeholder={language === 'AR' ? 'النص بالعربية' : 'תוכן בערבית'}
              value={newStory.textArabic}
              onChange={(e) => setNewStory({ ...newStory, textArabic: e.target.value })}
              className="modal-input"
            />
            <textarea
              placeholder={language === 'AR' ? 'النص بالعبرית' : 'תוכן בעברית'}
              value={newStory.textHebrew}
              onChange={(e) => setNewStory({ ...newStory, textHebrew: e.target.value })}
              className="modal-input"
            />
            <input 
              type="file" 
              onChange={(e) => setNewStory({ ...newStory, imageFile: e.target.files[0] })}
              className="modal-input"
            />
            <div className="button-container">
              <button onClick={handleEditStory} className="save-button">
                {language === 'AR' ? 'حفظ' : 'שמור'}
              </button>
              <button onClick={() => setIsEditing(false)} className="cancel-button">
                {language === 'AR' ? 'إلغاء' : 'בטל'}
              </button>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
              <div className="delete-story-modal">
                  <h2>{language === 'AR' ? 'تأكيد الحذف' : 'אישור מחיקה'}</h2>
                  <p>{language === 'AR' ? 'هل أنت متأكد أنك تريد حذف هذه القصة؟' : 'האם אתה בטוח שברצונך למחוק את הסיפור הזה?'}</p>
                  <div className="button-container">
                  <button onClick={handleDeleteStory} className="save-button">
                      {language === 'AR' ? 'نعم' : 'כן'}
                  </button>
                  <button onClick={() => setIsDeleteModalOpen(false)} className="cancel-button">
                      {language === 'AR' ? 'لا' : 'לא'}
                  </button>
                  </div>
              </div>
          </Modal>

      </div>
    </div>
  );
};

export default WomenComponent;
