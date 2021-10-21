import React from 'react';
import styled from 'styled-components';

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

export const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 600px;
  height: 600px;

  .close-btn {
    margin-top: 5px;
    cursor: pointer;
    position: relative;
    left: 550px;
  }
`;

const Login = ({ setShowLogin }) => {
  const closeLoginModal = () => {
    setShowLogin(false);
  };
  return (
    <>
      <ModalBackdrop onClick={closeLoginModal}>
        <ModalView onClick={(e) => e.stopPropagation}>
          <button onClick={closeLoginModal} className="close-btn">
            닫기
          </button>
        </ModalView>
      </ModalBackdrop>
    </>
  );
};

export default Login;
