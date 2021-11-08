import React, { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import Menu from './Menu';

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  color: ${(props) => props.theme.navColor};
  background-color: ${(props) => props.theme.navBgColor};
`;

const Header = ({ showLogin, setShowLogin, showSignup, setShowSignup }) => {
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <HeaderContainer>
        <Menu
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          showSignup={showSignup}
          setShowSignup={setShowSignup}
        />
      </HeaderContainer>
    </>
  );
};

export default Header;
