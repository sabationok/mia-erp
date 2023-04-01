import React from 'react';
import styled from 'styled-components';

const PageError = () => {
  return (
    <Page>
      <p>Error!</p>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  line-height: 1.2;
  letter-spacing: 0.07em;

  margin: 8px auto;

  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);

  width: 80%;
  height: 50%;
  
`;

export default PageError;
