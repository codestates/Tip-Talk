import React from 'react';
import styled from 'styled-components';
import { Samlib } from '../styles/common';
import Login from './Login';
import Signup from './Signup';

const Navbar = styled.nav`
  display: flex;
  max-width: 1000px;
  height: 70px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 60px;
`;

export const Button = styled.button`
  width: 120px;
  font-size: 26px;
  color: ${(props) => props.theme.navColor};
  font-family: ${Samlib};
  background-color: transparent;
  border: none;
  transition: 0.25s;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Menu = ({
  showLogin,
  setShowLogin,
  isLogin,
  setIsLogin,
  showSignup,
  setShowSignup,
}) => {
  const showLoginHandler = () => {
    setShowLogin(true);
  };

  const showSignupHandler = () => {
    setShowSignup(true);
  };

  return (
    <Navbar>
      <Logo
        src="https://drawit.s3.ap-northeast-2.amazonaws.com/tip-talk/logo_transparent.png"
        alt="로고"
      />
      <div>
        <Button onClick={showLoginHandler}>로그인</Button>
        <Button onClick={showSignupHandler}>회원가입</Button>
      </div>
      {showLogin ? (
        <Login
          setShowLogin={setShowLogin}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          showSignup={showSignup}
          setShowSignup={setShowSignup}
        />
      ) : null}
      {showSignup ? (
        <Signup setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
      ) : null}
    </Navbar>
  );
};

export default Menu;
