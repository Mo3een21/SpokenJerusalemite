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

const SubHeading = styled.h3`
  font-size: 1.5em;
  color: #333;
  margin-top: 20px;
`;

const PartnerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PartnerItem = styled.div`
  font-size: 1.2em;
`;

const Partners: React.FC = () => {
  return (
    <Section>
      <Heading>שותפות לדרך</Heading>
      <PartnerList>
        <PartnerItem>אביגיל</PartnerItem>
        <PartnerItem>החצר הנשית</PartnerItem>
        <PartnerItem>הספרייה למדעי החברה באוניברסיטה העברית</PartnerItem>
        <PartnerItem>המרכז לנפגעות תקיפה מינית</PartnerItem>
        <PartnerItem>חלאס</PartnerItem>
        <PartnerItem>טופז</PartnerItem>
        <PartnerItem>מוזאיקה</PartnerItem>
        <PartnerItem>מרכז אלבשארה</PartnerItem>
        <PartnerItem>מרכז מאירהוף לחינוך והוראה</PartnerItem>
        <PartnerItem>נשים לגופן</PartnerItem>
        <PartnerItem>קפה יפו</PartnerItem>
        <PartnerItem>תרבות</PartnerItem>
      </PartnerList>
    </Section>
  );
};

export default Partners;
