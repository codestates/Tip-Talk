import React, { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { Body, Label, Meta, Text } from '../styles/common';

const UploadContainer = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  padding: 50px 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.navColor};
  align-items: center;
`;

const UploadPost = () => {
  const [address, setAddress] = useState({ ...useLocation().state });

  if (!address.name) {
    console.log('비정상적인 접근입니다');
    console.log(address);
  }

  const handleSubmit = () => {
    // searchRef.current.value = '';
  };
  return (
    <Body>
      <UploadContainer>
        <Meta>
          <div>
            <Label>상호명</Label>
            <input placeholder="상호명을 입력해주세요"></input>
            <Label>주소</Label>
            <Text>{address?.name}</Text>
          </div>
          <div>
            <Label>카테고리 선택</Label>
            <select name="categories">
              <option value="문화시설">문화시설</option>
              <option value="관광지">관광지</option>
              <option value="음식점">음식점</option>
              <option value="카페">카페</option>
              <option value="숙박">숙박</option>
            </select>
          </div>
        </Meta>
      </UploadContainer>
    </Body>
  );
};

export default UploadPost;
