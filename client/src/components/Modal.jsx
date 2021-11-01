import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 380px;
  height: 160px;
  padding: 20px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.55);
  align-items: center;
  animation: 0.15s scale;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 0;
  color: ${({ theme }) => theme.color};
  font-size: 20px;
  border: none;
  background-color: transparent;
`;

const Message = styled.span`
  margin: 20px 0;
  font-size: 20px;
`;

const Button = styled.button`
  width: 64px;
  height: 36px;
  margin: 10px 5px 0 5px;
  border: none;
  border-radius: 6px;
  color: ${({ theme }) => theme.navColor};
  font-size: 18px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.navBgColor};
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
`;

const Modal = ({ message, setIsOpen, callback }) => {
  const eventHandler = () => {
    if (callback) {
      callback();
    }
    closeModal();
  };

  const closeModal = () => {
    setIsOpen();
  };
  return (
    <Background>
      <ModalContainer>
        <CloseButton onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <Message>{message}</Message>
        <div>
          <Button onClick={eventHandler}>확인</Button>
          <Button onClick={closeModal}>아니요</Button>
        </div>
      </ModalContainer>
    </Background>
  );
};

export default Modal;
