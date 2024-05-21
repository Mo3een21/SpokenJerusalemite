import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 20px;
  background-color: #f5f5f5;
`;

const Heading = styled.h2`
  font-size: 2em;
  color: #333;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  margin: 10px 0;
  line-height: 1.5;
`;

const HighlightedText = styled.span`
  font-weight: bold;
  font-size: 1.2em;
  color: #237B;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin: 20px 0;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 1.2em;
  margin: 20px 0;
`;

const Stat = styled.div`
  text-align: center;
`;

const OurStory: React.FC = () => {
  return (
    <Section>
      <Heading>מי אנחנו</Heading>
      <Paragraph>
        <HighlightedText>סיפור הקהילה שלנו</HighlightedText> התחיל עם שתי חברות ירושלמיות, ממזרח ומערב העיר, וצמח כיום לקהילה המשותפת הגדולה והותיקה בירושלים.
        <br />
        ירושלמית מדוברת שמה את השפה במרכז, במטרה להפוך אותה מגורם המייצר פחד וניכור, לכלי המאפשר תקשורת, הבנה והיכרות אמיתית בין אוכלוסיות העיר. 
        <br />
        בעיר אולי המתוחה בארץ, אנחנו מצליחות ליצור יחד שפה משותפת ולהפגיש בין מאות נשים, שסביר להניח שלא היו נפגשות אחרת.
        <br />
        מעבר למפגש המשותף, אנחנו פועלות לקדם שוויון זכויות והזדמנויות, ולהבטיח שהשפה לא תהווה חסם בפני אף אישה לעצמאות והגשמה עצמית.
        <br />
        הקהילה נמצאת בצמיחה מתמדת משנת 2017, ומנוהלת באופן שוויוני ע" צוות של מתנדבות ממזרח וממערב העיר, כחלק מעמותת כולנא ירושלים."
        <br />
        מעבר לפעילות הפנים של הקהילה, אנו מציעות קורסי שפה, סדנאות ושירותי תרגום לא.נשים וארגונים מכל הארץ. 
        <br />
        <HighlightedText>פנו אלינו לפרטים נוספים!</HighlightedText>
      </Paragraph>
      <Image src="path-to-image.jpg" alt="Community Image" />
      <Stats>
        <Stat>
          <HighlightedText>2900</HighlightedText> נשים מכל המגוון הירושלמי
        </Stat>
        <Stat>
          <HighlightedText>40</HighlightedText> מתנדבות
        </Stat>
        <Stat>
          <HighlightedText>6</HighlightedText> שנות קהילה
        </Stat>
      </Stats>
    </Section>
  );
};

export default OurStory;
