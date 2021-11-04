import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  color: ${(props) => props.theme.navColor};
  background-color: ${(props) => props.theme.navBgColor};
`;

const Header = ({
  showLogin,
  setShowLogin,
  showSignup,
  setShowSignup,
  token,
  setToken,
}) => {
  return (
    <>
      {token === null ? (
        <HeaderContainer>
          {/* {로그인 전} */}
          <Menu
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            showSignup={showSignup}
            setShowSignup={setShowSignup}
            token={token}
            setToken={setToken}
          />
        </HeaderContainer>
      ) : (
        <HeaderContainer>
          {/* {로그인 후} */}
          <Menu
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            token={token}
            setToken={setToken}
          />
        </HeaderContainer>
      )}
    </>
  );
};

export default Header;
