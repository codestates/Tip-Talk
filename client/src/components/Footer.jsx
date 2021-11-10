import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  width: 100%;
  height: 160px;
  background-color: rgba(0, 0, 0, 0.2);
  @media ${({ theme }) => theme.size.mobile} {
    padding: 0px 16px;
  }
`;

const Column = styled.div`
  display: flex;
  max-width: 1600px;
  height: inherit;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

const Footer = () => {
  return (
    <Container>
      <Column>
        <h1>Footer</h1>
      </Column>
    </Container>
  );
};

export default Footer;
