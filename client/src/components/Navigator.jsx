import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: absolute;
  left: 40%;
  top: 16px;
  padding: 16px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 1.1px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 2;
`;

const Close = styled.button`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 20px;
  height: 20px;
  color: white;
  border: none;
  text-align: center;
  background-color: transparent;
`;

const Navigator = ({ role, setIsOpen }) => {
  return (
    <Background>
      <>
        <Close onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </Close>
        {role === 1 ? (
          <span>마우스를 클릭하여 사업지를 등록할 수 있습니다.</span>
        ) : (
          <span>검색창에 주소나 장소명을 입력해보세요</span>
        )}
      </>
    </Background>
  );
};

export default Navigator;
