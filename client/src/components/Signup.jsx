import React, { useState } from 'react';
import styled from 'styled-components';
import { Color_3, Samlib } from '../styles/common';
import axios from 'axios';

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

  .ModalView {
    border-radius: 10px;
    background-color: #ffffff;
    width: 600px;
    height: 700px;
  
    .close-btn {
      border-radius: 10px;
      margin-top: 5px;
      cursor: pointer;
      position: relative;
      left: 35rem;
      border: none;
      background-color: ${Color_3};
      font-size: 16px;
      :hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
      }
      transition-duration: 0.3s;
      font-family: ${Samlib};
      font-size: 2rem;
    }
`;

export const InputSection = styled.div`
  width: 600px;
  height: 300px;

  .id-line {
    text-align: center;
    margin-top: 10rem;
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
    text-align: center;
    margin-bottom: 2.5rem;
    #password {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
    #re-password {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }

  .nickname-line {
    text-align: center;
    margin-bottom: 2.5rem;
    #nickname {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;

  .signupSubmitButton {
    font-size: 2rem;
    width: 13rem;
    height: 3rem;
    border-radius: 10px;
    border: none;
    background-color: ${Color_3};
    margin-top: 1rem;
    font-family: ${Samlib};
  }
  .toLogin {
    font-size: 2rem;
    width: 13rem;
    height: 3rem;
    border-radius: 10px;
    border: none;
    background-color: ${Color_3};
    margin-top: 1rem;
    font-family: ${Samlib};
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
  top: -1rem;
  left: 9.5rem;
`;

export const InsufficientError = styled(ErrorMessage)`
  position: relative;
  top: -9.3rem;
  left: 9.5rem;
`;

const Signup = ({ setShowLogin, setShowSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [insufficient, setInsufficient] = useState(false);

  const closeSignupModal = () => {
    setShowSignup(false);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const rePasswordHandler = (e) => {
    setRePassword(e.target.value);
  };

  const nicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
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

  const passwordValidation = () => {
    if (password === rePassword) return true;
    return false;
  };

  const insufficientValidation = () => {
    if (
      email.length === 0 ||
      nickname.length === 0 ||
      password.length === 0 ||
      rePassword.length === 0
    ) {
      setInsufficient(true);
    } else {
      setInsufficient(false);
    }
  };

  const submitHandler = () => {
    if (passwordValidation() === true) {
      axios
        .post('http://localhost:8000/auth/signup', {
          email,
          password,
          nickname,
        })
        .then((res) => console.log(res));
    }
  };

  return (
    <>
      <ModalBackdrop onClick={closeSignupModal}>
        <div className="ModalView" onClick={(e) => e.stopPropagation()}>
          <button onClick={closeSignupModal} className="close-btn">
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
            <div className="nickname-line">
              <input
                type="text"
                id="nickname"
                name="nickname"
                placeholder="nickname"
                onChange={nicknameHandler}
              />
            </div>
            <div className="password-line">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                onChange={passwordHandler}
              />
            </div>
            <div className="password-line">
              <input
                type="password"
                id="re-password"
                name="re-password"
                placeholder="confirm password"
                onChange={rePasswordHandler}
              />
            </div>
            {passwordValidation() === true || rePassword.length === 0 ? null : (
              <PasswordError>비밀번호가 일치하지 않습니다</PasswordError>
            )}
          </InputSection>
          <BottomContainer>
            <button
              className="signupSubmitButton"
              onClick={() => [submitHandler(), insufficientValidation()]}
            >
              확인
            </button>
            <button
              className="toLogin"
              onClick={() => [showLoginHandler(), closeSignupModal()]}
            >
              로그인
            </button>
          </BottomContainer>
          {insufficient === true ? (
            <InsufficientError>모든 항목을 입력해야합니다</InsufficientError>
          ) : null}
        </div>
      </ModalBackdrop>
    </>
  );
};

export default Signup;