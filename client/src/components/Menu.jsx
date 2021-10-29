import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Samlib } from '../styles/common';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';

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

const Button = styled.button`
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
  user,
  setUser,
  showSignup,
  setShowSignup,
}) => {
  const showLoginHandler = () => {
    setShowLogin(true);
  };

  const showSignupHandler = () => {
    setShowSignup(true);
  };

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null);
  };

  const googleRevoke = () => {
    const params = JSON.parse(localStorage.getItem('tiptalk-oauth2'));
    if (params) {
      axios.post(
        `https://oauth2.googleapis.com/revoke?token=${params['access_token']}`,
      );
    }
  };

  const history = useHistory();
  const goToMyPage = () => {
    history.push('/mypage');
  };

  return (
    <Navbar>
      <Logo
        src="https://drawit.s3.ap-northeast-2.amazonaws.com/tip-talk/logo_transparent.png"
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
          <Button onClick={() => [logoutHandler(), googleRevoke()]}>
            로그아웃
          </Button>
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
    </Navbar>
  );
};

export default Menu;
