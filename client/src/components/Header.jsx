import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';

const HeaderContiner = styled.header`
  width: 100%;
  height: 70px;
  color: ${(props) => props.theme.navColor};
  background-color: ${(props) => props.theme.navBgColor};
`;

const Header = () => {
  return (
    <HeaderContiner>
      <Menu />
    </HeaderContiner>
  );
};

export default Header;
