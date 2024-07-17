const CommunityForm = ({ form, handleSubmit, nameRef, emailRef, phoneRef, groupRef, levelRef, language, successMessage, errorMessage }) => {
    return (
      <div className='flexer'>
        <div className="contact-form" id="contact-form">
          <form ref={form} onSubmit={handleSubmit}>
            <label htmlFor="name">{language === 'AR' ? 'اسم:' : 'שם:'}</label>
            <input type="text" id="name" name="name" required ref={nameRef} />
  
            <label htmlFor="email">{language === 'AR' ? 'البريد الإلكتروني:' : 'מייל:'}</label>
            <input type="email" id="email" name="email" required ref={emailRef} />
  
            <label htmlFor="phone">{language === 'AR' ? 'هاتف:' : 'טלפון:'}</label>
            <input type="tel" id="phone" name="phone" required ref={phoneRef} />
  
            <label htmlFor="course">{language === 'AR' ? 'لأي مجموعة حابة تنضمي؟' : 'לאיזו קבוצה את מעוניינת להצטרף?'}</label>
            <select id="course" name="course" required ref={groupRef}>
              <option value="">{language === 'AR' ? '...اختاري مجموعة' : 'בחרי קבוצה...'}</option>
              <option value="חילופי שפות שבועיים">{language === 'AR' ? 'تبادل لغات اسبوعي' : 'חילופי שפות שבועיים'}</option>
              <option value="אירועים קהילתיים">{language === 'AR' ? 'مناسبات مجتمعية' : 'אירועים קהילתיים'}</option>
              <option value="זמינה לשיחה">{language === 'AR' ? 'فاضية نحكي؟' : 'זמינה לשיחה'}</option>
              <option value="סטודנטיות">{language === 'AR' ? 'طالبات' : 'סטודנטיות'}</option>
              <option value="זזות">{language === 'AR' ? ' كزدورة' : 'זזות'}</option>
              <option value="הפיל שבחדר">{language === 'AR' ? 'الفيل بالغرفة' : 'הפיל שבחדר'}</option>
              <option value="בית המדרש">{language === 'AR' ? 'محادثة دينية' : 'בית המדרש'}</option>
              <option value="נבחרת המתקדמות">{language === 'AR' ? 'نخبة المتقدمات' : 'נבחרת המתקדמות'}</option>
              <option value="מתחילות לדבר">{language === 'AR' ? 'مبتدئات' : 'מתחילות לדבר'}</option>
            </select>
  
            <label htmlFor="level">{language === 'AR' ? 'شو مستواكي في العبري؟' : 'מה רמת הערבית שלך? '}</label>
            <select id="level" name="level" required ref={levelRef}>
              <option value="">{language === 'AR' ? 'المستوى' : 'רמה'}</option>
              <option value="אין לי בסיס בכלל">{language === 'AR' ? 'ما عندي أساس' : 'אין לי בסיס בכלל'}</option>
              <option value="מתחילה">{language === 'AR' ? 'بلشت' : 'מתחילה'}</option>
              <option value="וואלה משתפרת">{language === 'AR' ? ' عم بتقدم' : 'וואלה משתפרת'}</option>
              <option value="מתקדמת - אלופה בערבית">{language === 'AR' ? ' بطلة بالعبري' : 'מתקדמת - אלופה בערבית'}</option>
            </select>
  
            <button type="submit">{language === 'AR' ? 'إرسال' : 'שלח'}</button>
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
      </div>
    );
  };
  
  export default CommunityForm;
  