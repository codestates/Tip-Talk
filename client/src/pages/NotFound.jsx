import React from 'react';
import styled from 'styled-components';
import { Body } from '../styles/common';

const Message = styled.h1`
  font-size: 32px;
  margin: 20px 0;
  text-align: center;
`;

const NotFound = () => {
  return (
    <Body>
      <Message>찾을 수 없는 페이지입니다!</Message>
      <Message>주소를 다시 확인해주세요!</Message>
    </Body>
  );
};

export default NotFound;
