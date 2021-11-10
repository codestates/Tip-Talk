import React, { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import Menu from './Menu';

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  color: ${(props) => props.theme.navColor};
  background-color: transparent;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
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
