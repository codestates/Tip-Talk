import React from 'react';
import styled from 'styled-components';
import { Samlib } from '../styles/common';
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

const MenuAfterLogin = ({ setIsLogin, setShowLogin }) => {
  const logoutHandler = () => {
    setIsLogin(false);
  };

  const showLoginHandler = () => {
    setShowLogin(false);
  };

  const googleRevoke = () => {
    const params = JSON.parse(localStorage.getItem('tiptalk-oauth2'));
    axios.post(
      `https://oauth2.googleapis.com/revoke?token=${params['access_token']}`,
    );
  };

  return (
    <Navbar>
      <Logo
        src="https://drawit.s3.ap-northeast-2.amazonaws.com/tip-talk/logo_transparent.png"
        alt="로고"
      />
      <div>
        <Button>마이페이지</Button>
        <Button
          onClick={() => [logoutHandler(), showLoginHandler(), googleRevoke()]}
        >
          로그아웃
        </Button>
      </div>
    </Navbar>
  );
};

export default MenuAfterLogin;
