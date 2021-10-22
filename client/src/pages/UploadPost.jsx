import React, { useRef, useState } from 'react';
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
  const searchRef = useRef();
  const [place, setPlace] = useState();

  const handleSubmit = () => {
    const { value } = searchRef.current;
    setPlace(value);
    // searchRef.current.value = '';
  };
  return (
    <Body>
      <UploadContainer>
        <input ref={searchRef} placeholder="장소 검색하기" />
        <button onClick={handleSubmit}>검색</button>
        <KakaoMap place={place} />
      </UploadContainer>
    </Body>
  );
};

export default UploadPost;
