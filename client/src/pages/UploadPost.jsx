import React, { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import TextEditor, { deserialize } from '../components/TextEditor';

import { Body, Info, Label, Meta, Samlib, Text } from '../styles/common';

const UploadForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 600px;
  padding: 50px 80px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.navColor};
  justify-content: center;
  align-items: center;
`;

const CustomLabel = styled(Label)`
  width: 80px;
`;

const CustomInfo = styled(Info)`
  font-size: 38px;
  margin: 30px 15px;
`;

const Input = styled.input`
  width: 320px;
  height: 38px;
  padding: 8px 12px;
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 6px;
  background-color: transparent;
`;

const Select = styled.select`
  width: 120px;
  height: 38px;
  padding: 8px 12px;
  margin-bottom: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.color};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 6px;
  background-color: transparent;
`;

const Button = styled.button`
  width: 160px;
  height: 48px;
  font-size: 20px;
  font-family: ${Samlib};
`;

const UploadPost = () => {
  const [address, setAddress] = useState({ ...useLocation().state });

  if (!address.name) {
    console.log('비정상적인 접근입니다');
  }
  console.log(address);

  const handleSubmit = () => {
    const text = deserialize(localStorage.getItem('content') || '');
    console.log(text);
  };

  return (
    <Body>
      <UploadForm>
        <CustomInfo>사업지 등록하기</CustomInfo>
        <Meta>
          <div>
            <CustomLabel>상호명</CustomLabel>
            <Input placeholder="상호명을 입력해주세요" />
            <CustomLabel>카테고리 선택</CustomLabel>
            <Select name="categories">
              <option value="문화시설">문화시설</option>
              <option value="관광지">관광지</option>
              <option value="음식점">음식점</option>
              <option value="카페">카페</option>
              <option value="숙박">숙박</option>
            </Select>
          </div>
          <div>
            <CustomLabel>주소</CustomLabel>
            <Text>{address?.name}</Text>
          </div>
        </Meta>
        <CustomInfo>소개</CustomInfo>
        <TextEditor />
        <CustomInfo>사진 등록하기</CustomInfo>
        <Button>사진 업로드</Button>
        <Button onClick={handleSubmit}>저장하기</Button>
      </UploadForm>
    </Body>
  );
};

export default UploadPost;
