import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import KakaoMap from '../components/KakaoMap';
import { Body } from '../styles/common';

const UploadContainer = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  margin: 40px 0;
  padding: 50px 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.navColor};
  align-items: center;
`;

const UploadPost = () => {
  const [address, setAddress] = useState({ ...useLocation().state });

  console.log(address);
  const handleSubmit = () => {
    // searchRef.current.value = '';
  };
  return (
    <Body>
      <UploadContainer></UploadContainer>
    </Body>
  );
};

export default UploadPost;
