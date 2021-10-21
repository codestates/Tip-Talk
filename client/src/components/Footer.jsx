import React from 'react';
import styled from 'styled-components';

const Continer = styled.header`
  width: 100%;
  height: 200px;
  color: ${(props) => props.theme.navColor};
  background-color: ${(props) => props.theme.navBgColor};
`;

const Navbar = styled.nav`
  display: flex;
  max-width: 1000px;
  height: inherit;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

const Footer = () => {
  return (
    <Continer>
      <Navbar>
        <h1>Footer</h1>
      </Navbar>
    </Continer>
  );
};

export default Footer;
