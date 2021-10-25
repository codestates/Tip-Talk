import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import MenuAfterLogin from './MenuAfterLogin';

const HeaderContainer = styled.header`
  width: 100%;
  height: 120px;
  color: ${(props) => props.theme.navColor};
  background-color: ${(props) => props.theme.navBgColor};
`;

const Header = ({
  showLogin,
  setShowLogin,
  isLogin,
  setIsLogin,
  showSignup,
  setShowSignup,
}) => {
  return (
    <>
      {isLogin === false ? (
        <HeaderContainer>
          <Menu
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            showSignup={showSignup}
            setShowSignup={setShowSignup}
          />
        </HeaderContainer>
      ) : (
        <HeaderContainer>
          <MenuAfterLogin />
        </HeaderContainer>
      )}
    </>
  );
};

export default Header;
