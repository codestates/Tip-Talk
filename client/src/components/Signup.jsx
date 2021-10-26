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
    width: 38rem;
    height: 45rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
  
    .close-btn {
      border-radius: 10px;
      cursor: pointer;
      border: none;
      position: relative;
      left: 17rem;
      top: -5rem;
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
    height: 4rem;
    position: relative;
    top: 6rem;
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
    top: 8rem;
    height: 2rem;
    #password {
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
    #re-password {
      position: relative;
      top: 2rem;
      font-size: 1.5rem;
      border-top: none;
      border-left: none;
      border-right: none;
      outline: none;
    }
  }

  .nickname-line {
    position: relative;
    top: 6rem;
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
  position: relative;
  top: 10rem;

  .signupSubmitButton {
    font-size: 2rem;
    width: 12rem;
    height: 3rem;
    border-radius: 10px;
    border: none;
    background-color: ${Color_3};
    font-family: ${Samlib};
  }
  .toLogin {
    position: relative;
    top: 1rem;
    font-size: 2rem;
    width: 12rem;
    height: 3rem;
    border-radius: 10px;
    border: none;
    background-color: ${Color_3};
    font-family: ${Samlib};
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-family: ${Samlib};
  border: black;
`;

export const IdError = styled(ErrorMessage)`
  position: fixed;
  top: 16.5rem;
  left: 9.5rem;
`;

export const PasswordError = styled(ErrorMessage)`
  position: fixed;
  top: 28.5rem;
  left: 9.5rem;
`;

export const InsufficientError = styled(ErrorMessage)`
  position: fixed;
  top: 34.5rem;
  left: 9.5rem;
`;

export const RadioSection = styled.div`
  position: relative;
  top: 6rem;
  text-align: center;
  display: flex;
  justify-content: center;
  font-family: ${Samlib};
  .radioContainer {
    width: 20rem;
    display: flex;
    justify-content: space-around;
  }
  .owner {
    display: inline;
    color: black;
  }
  .user {
    display: inline;
    color: black;
  }
`;

const Signup = ({ setShowLogin, setShowSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [insufficient, setInsufficient] = useState(false);
  const [role, setRole] = useState(null);

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

  const roleHandler = (e) => {
    setRole(e.target.value);
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
      rePassword.length === 0 ||
      role === null
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
          role,
        })
        .then((res) => console.log(res));
    }
  };

  return (
    <>
      <ModalBackdrop onClick={closeSignupModal}>
        <div className="ModalView" onClick={(e) => e.stopPropagation()}>
          <img
            className="icon"
            src="https://drawit.s3.ap-northeast-2.amazonaws.com/tip-talk/facebook_cover_photo_1.png"
          />
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
            </div>
            {emailValidation() === false ? (
              <IdError>이메일 형식을 입력해주세요</IdError>
            ) : null}
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
          <RadioSection>
            <div className="radioContainer">
              <div>
                <input
                  type="radio"
                  id="owner"
                  name="role"
                  value="1"
                  onClick={roleHandler}
                />
                <div className="owner">사업자</div>
              </div>
              <div>
                <input
                  type="radio"
                  id="user"
                  name="role"
                  value="2"
                  onClick={roleHandler}
                />
                <div className="user">일반인</div>
              </div>
            </div>
          </RadioSection>
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
