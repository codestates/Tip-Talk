import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 300px;
  height: 160px;
`;

const Modal = () => {
  return (
    <Background>
      <ModalContainer></ModalContainer>
    </Background>
  );
};

export default Modal;
