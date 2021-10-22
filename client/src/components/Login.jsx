import React, { useState } from 'react';
import styled from 'styled-components';
import { Color_2, Color_3, Samlib } from '../styles/common';
import googleButton from '../google-button.png';
import axios from 'axios';
import Header from './Header';
import MenuAfterLogin from './MenuAfterLogin';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalView = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 600px;
  height: 600px;

  .close-btn {
    border-radius: 10px;
    margin-top: 5px;
    cursor: pointer;
    position: relative;
    left: 17.5em;
    border: none;
    background-color: ${Color_3};
    font-size: 16px;
    :hover {
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
    transition-duration: 0.3s;
    font-family: ${Samlib};
    font-size: 2em;
`;

export const InputSection = styled.div`
  width: 600px;
  height: 300px;

  .id-line {
    text-align: center;
    margin-top: 10em;
    height: 5em;
    #id {
      font-size: 1.5em;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }

  .password-line {
    text-align: center;
    #password {
      font-size: 1.5em;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }
`;

export const LoginButtonContainer = styled.div`
  margin-top: -10em;
  text-align: center;
  .loginButton {
    font-size: 2em;
    width: 8em;
    height: 1.5em;
    border-radius: 10px;
    border: none;
    background-color: ${Color_3};
    margin-top: 1em;
    font-family: ${Samlib};
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3em;

  .bottomSection {
    display: flex;
    justify-content: space-around;
    width: 30em;

    .signupButton {
      font-size: 2em;
      width: 6em;
      height: 1.5em;
      border-radius: 10px;
      border: none;
      background-color: ${Color_3};
      margin-top: 0.2em;
      font-family: ${Samlib};
    }
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-family: ${Samlib};
  border: black;
`;

export const IdError = styled(ErrorMessage)`
  position: relative;
  top: 0.5em;
  left: -4em;
`;

export const PasswordError = styled(ErrorMessage)`
  position: relative;
  top: 0.5em;
  left: -1.3em;
`;

export const GoogleButton = styled.img`
  width: 15em;
  cursor: pointer;
`;

const oauthSignIn = () => {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    client_id:
      '529912951931-8sp74vii7gf3nkuslvq4i47d85dcjvd3.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:3000',
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    include_granted_scopes: 'true',
    state: 'pass-through value',
  };

  // Add form parameters as hidden input values.
  for (let p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
};

const Login = ({ setShowLogin, setIsLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const closeLoginModal = () => {
    setShowLogin(false);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailValidation = () => {
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (email.length === 0) {
      return true;
    }
    if (regex.test(email) === false) {
      return false;
    }
    return true;
  };

  const loginHandler = () => {
    console.log('test = ', { email, password });
    // axios
    //   .post('http://localhost:8000/auth/login', userInfo)
    //   .then((res) => console.log('res = ' + res));
  };

  const isLoginHandler = () => {
    setIsLogin(true);
  };

  return (
    <>
      <ModalBackdrop onClick={closeLoginModal}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <button onClick={closeLoginModal} className="close-btn">
            &times;
          </button>
          <InputSection>
            <div className="id-line">
              <input
                type="text"
                id="id"
                name="id"
                placeholder="email"
                onChange={emailHandler}
              />
              {emailValidation() === false ? (
                <IdError>이메일 형식을 입력해주세요</IdError>
              ) : null}
            </div>
            <div className="password-line">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                onChange={passwordHandler}
              />
              <PasswordError>
                이메일이나 비밀번호가 올바르지 않습니다
              </PasswordError>
            </div>
          </InputSection>
          <LoginButtonContainer>
            <button
              className="loginButton"
              // onClick={loginHandler}
              onClick={isLoginHandler}
            >
              로그인
            </button>
          </LoginButtonContainer>
          <BottomContainer>
            <div className="bottomSection">
              <GoogleButton
                src={googleButton}
                alt="google-button"
                onClick={oauthSignIn}
              ></GoogleButton>
              <button className="signupButton">회원가입</button>
            </div>
          </BottomContainer>
        </ModalView>
      </ModalBackdrop>
    </>
  );
};

export default Login;
