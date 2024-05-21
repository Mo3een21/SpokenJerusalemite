import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 20px;
`;

const Heading = styled.h2`
  font-size: 2em;
  color: #333;
  margin-bottom: 10px;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const TeamMember = styled.div`
  position: relative;
  text-align: center;
`;

const MemberImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50%;
`;

const MemberInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  transition: opacity 0.3s;
  opacity: 0;
  ${TeamMember}:hover & {
    opacity: 1;
  }
`;

const Team: React.FC = () => {
  const teamMembers = [
    { name: 'ליאור אוריין', role: 'מנהלת משותפת' },
    { name: 'סוזן סייאד', role: 'מנהלת משותפת' },
    { name: 'נגה זר', role: 'מנהלת אירועים' },
    { name: 'הבה ברק', role: 'מנהלת אירועים' },
    { name: 'אודיה גורי', role: 'מנהלת תכניות ופיתוח עסקי' },
    { name: 'דרין עודה', role: 'מנחה' },
    { name: 'יאסמין רשק', role: 'מנהלת תכנית התעסוקה' },
    { name: 'איילה ארליך', role: 'מנהלת תוכן ופדגוגיה' },
    { name: 'תמארה ג\'אבר', role: 'מנהלת קהילות' },
    { name: 'הגר ברתנא', role: 'מנהלת מפגשים' },
    { name: 'נוגה גדיש', role: 'מנחה' },
    { name: 'יעל חזן', role: 'מנהלת קהילה' },
    { name: 'הדיל שקיראת', role: 'מנהלת קהילה' },
    { name: 'מור מייזל', role: 'מנחה' },
    { name: 'אנתסאר חאלס', role: 'מלווה תעסוקתית' },
    { name: 'רחמה עלי', role: 'מנחה' },
    { name: 'מיאר אלג׳אוי', role: 'מנחה' },
  ];

  return (
    <Section>
      <Heading>הצוות שלנו</Heading>
      <TeamGrid>
        {teamMembers.map((member, index) => (
          <TeamMember key={index}>
            <MemberImage src="path-to-image.jpg" alt={member.name} />
            <MemberInfo>
              <p>{member.name}</p>
              <p>{member.role}</p>
            </MemberInfo>
          </TeamMember>
        ))}
      </TeamGrid>
    </Section>
  );
};

export default Team;
