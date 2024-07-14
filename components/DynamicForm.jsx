'use client'

import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

emailjs.init({
  publicKey: 'tWA5BESHzduW8do5B',
  blockHeadless: true,
  limitRate: {
    id: 'app',
    throttle: 10000,
  },
});

const DynamicForm = ({language}) => {
  const [subject, setSubject] = useState(null);
  
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const courseRef = useRef();
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    emailjs.sendForm('service_onlznch', 'template_nm3z6tt', form.current, {
      publicKey: 'tWA5BESHzduW8do5B',
    }).then(
      () => {
        setSuccessMessage("Email sent successfully");
      },
      (error) => {
        setErrorMessage("Problem with sending email");
        console.log(error);
      },
    );

    nameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
    setSubject('');
    courseRef.current.value = '';
  };

  const renderForm = (formId) => {
    return (
      <div className='contact-form'>
        <form ref={form} onSubmit={handleSubmit}>
          <input type="hidden" name="subject" value={subject || ''} />
          <div>
            <label htmlFor='name'>שם:</label>
            <input type="text" id='name' name="name" ref={nameRef} required />
          </div>
          <div>
            <label htmlFor='phone'>טלפון:</label>
            <input type="tel" id='phone' name="phone" ref={phoneRef} required />
          </div>
          <div>
            <label htmlFor='email'> מייל:</label>
            <input type="email" id={`email-${formId}`} name="email" ref={emailRef} required />
          </div>
          {formId === "enroll" && (
            <div>
              <div>
                <label htmlFor="course">קורסים</label>
                <select id="course" name="course" ref={courseRef} required>
                  <option value="בחרי קורס">בחרי קורס...</option>
                  <option value="קורס שיחה לרמת מתחילות">קורס שיחה לרמת מתחילות</option>
                  <option value="עברית לתעסוקה">עברית לתעסוקה</option>
                  <option value="עברית לאקדמיה">עברית לאקדמיה</option>
                  <option value="עברית לפיתוח אישי ומקצועי">עברית לפיתוח אישי ומקצועי</option>
                </select>
              </div>
            </div>
          )}
          <button type="submit">שלח</button>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    );
  };

  return (
    <div className='container'>
      <h2>איך את מעוניינת לעזור הקהילה?</h2>
      <div className='choices'>
        <button onClick={() => setSubject("volunteer")}>התנדבות</button>
        <button onClick={() => setSubject("add")}>הצטרפות לקהילה</button>
        <button onClick={() => setSubject("enroll")}>רישום לקורסים</button>
      </div>
      <div>
        {subject === "volunteer" && renderForm("volunteer")}
        {subject === "add" && renderForm("add")}
        {subject === "enroll" && renderForm("enroll")}
      </div>
    </div>
  );
};

export default DynamicForm;
