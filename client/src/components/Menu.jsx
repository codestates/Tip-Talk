import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Color_3, Hangeul } from '../styles/common';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';

const Navbar = styled.nav`
  display: flex;
  max-width: 1000px;
  height: 70px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 70%;
`;

const Button = styled.button`
  width: 80px;
  font-size: 16px;
  color: ${Color_3};
  font-family: ${Hangeul};
  background-color: transparent;
  padding: 0;
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
  user,
  setUser,
  showSignup,
  setShowSignup,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const showLoginHandler = () => {
    setShowLogin(true);
  };

  const showSignupHandler = () => {
    setShowSignup(true);
  };

  const logoutHandler = () => {
    setIsLogout(true);
    setIsOpen(true);
  };

  const history = useHistory();
  const goToMyPage = () => {
    history.push('/mypage');
  };

  return (
    <Navbar>
      <Logo
        src="https://drawit.s3.ap-northeast-2.amazonaws.com/tip-talk/mainimage.png"
        alt="로고"
      />
      {user === null || user === undefined ? (
        <div>
          <Button onClick={showLoginHandler}>로그인</Button>
          <Button onClick={showSignupHandler}>회원가입</Button>
        </div>
      ) : (
        <div>
          <Button onClick={goToMyPage}>마이페이지</Button>
          <Button onClick={logoutHandler}>로그아웃</Button>
        </div>
      )}
      {showLogin === true ? (
        <Login
          setShowLogin={setShowLogin}
          user={user}
          setUser={setUser}
          setShowSignup={setShowSignup}
        />
      ) : null}
      {showSignup === true ? (
        <Signup setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
      ) : null}
      {isLogout === true ? (
        <Logout setUser={setUser} isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : null}
    </Navbar>
  );
};

export default Menu;
