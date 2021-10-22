import React from 'react';
import styled from 'styled-components';
import { Body } from '../styles/common';

const UploadContainer = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  margin: 40px 100px;
  padding: 50px 80px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.navColor};
`;

const UploadPost = () => {
  return (
    <Body>
      <UploadContainer>ㅇㅇ</UploadContainer>
    </Body>
  );
};

export default UploadPost;
