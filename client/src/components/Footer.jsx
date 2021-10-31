import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  width: 100%;
  height: 200px;
  color: ${(props) => props.theme.navColor};
  background-color: ${(props) => props.theme.navBgColor};
`;

const Column = styled.div`
  display: flex;
  max-width: 1000px;
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
