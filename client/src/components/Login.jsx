import React, { useState } from 'react';
import styled from 'styled-components';
import { Color_3, Samlib } from '../styles/common';
import googleButton from '../google-button.png';
import axios from 'axios';
import Signup from './Signup';

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

  .modalView {
    border-radius: 10px;
    background-color: #ffffff;
    width: 38rem;
    height: 38rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 40%;

    transform: translate(-50%, -40%);
  
    .close-btn {
      border-radius: 10px;
      top: -5rem;
      cursor: pointer;
      position: relative;
      left: 17rem;
      border: none;
      background-color: ${Color_3};
      :hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
      }
      transition-duration: 0.3s;
      font-family: ${Samlib};
      font-size: 2rem;
    }

    .icon {
      width: 15rem;
      position: relative;
      top: 5rem;
    }
`;

export const InputSection = styled.div`
  width: 38rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .id-line {
    position: relative;
    top: 7rem;
    height: 5rem;
    #id {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }

  .password-line {
    position: relative;
    top: 7rem;
    #password {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }
`;

export const LoginButtonContainer = styled.div`
  .loginButton {
    font-size: 2rem;
    width: 12rem;
    height: 3rem;
    border-radius: 10px;
    border: none;
    background-color: ${Color_3};
    font-family: ${Samlib};
  }
`;

export const BottomContainer = styled.div`
  .bottomSection {
    display: flex;
    justify-content: space-around;
    width: 30rem;
    position: relative;
    top: 4rem;
    .signupButton {
      font-size: 2rem;
      position: relative;
      top: 0.5rem;
      width: 12rem;
      height: 3rem;
      border-radius: 10px;
      border: none;
      background-color: ${Color_3};
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
  top: 0.5rem;
  left: -4rem;
`;

export const PasswordError = styled(ErrorMessage)`
  position: relative;
  top: 0.5rem;
  left: -1.3rem;
`;

export const GoogleButton = styled.img`
  width: 15rem;
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
    redirect_uri: 'http://localhost:3000/main',
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

const Login = ({ setShowLogin, setIsLogin, setShowSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkUser, setCheckUser] = useState(null);

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
    axios
      .post('http://localhost:8000/auth/login', {
        email,
        password,
      })
      .then((res) => setCheckUser(true))
      .then(() => setIsLogin(true))
      .catch((err) => setCheckUser(err.response.data.status));
  };

  return (
    <>
      <ModalBackdrop onClick={closeLoginModal}>
        <div className="modalView" onClick={(e) => e.stopPropagation()}>
          <img
            className="icon"
            src="https://drawit.s3.ap-northeast-2.amazonaws.com/tip-talk/facebook_cover_photo_1.png"
          />
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
              {checkUser === true || checkUser === null ? null : (
                <PasswordError>
                  이메일이나 비밀번호가 올바르지 않습니다
                </PasswordError>
              )}
            </div>
          </InputSection>
          <LoginButtonContainer>
            <button className="loginButton" onClick={loginHandler}>
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
              <button
                className="signupButton"
                onClick={() => [signupHandler(), closeLoginModal()]}
              >
                회원가입
              </button>
            </div>
          </BottomContainer>
        </div>
      </ModalBackdrop>
    </>
  );
};

export default Login;
