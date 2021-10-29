import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import {
  Body,
  Hangeul,
  Info,
  Label,
  Meta,
  Samlib,
  Text,
} from '../styles/common';

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 600px;
  padding: 50px 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.navColor};
  align-items: center;

  > .Editor {
    width: 80%;
    height: 500px;
    /* font-family: ${Hangeul}; */
    font-size: 16px;
    padding: 18px;
    border: 1px solid ${({ theme }) => theme.line};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.bgColor};
  }
`;

const CustomLabel = styled(Label)`
  width: 80px;
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
  font-size: 18px;
  color: ${({ theme }) => theme.color};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 6px;
  background-color: transparent;
`;

const Content = styled.textarea`
  width: 80%;
  height: 500px;
  font-family: ${Hangeul};
  font-size: 16px;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  resize: none;
`;

const Button = styled.button`
  width: 160px;
  height: 48px;
  font-size: 20px;
  font-family: ${Samlib};
`;

const UploadPost = () => {
  const [address, setAddress] = useState({ ...useLocation().state });
  const [images, setImages] = useState();

  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  if (!address.name) {
    console.log('비정상적인 접근입니다');
  }
  console.log(address);

  const changeContent = (data) => {
    // console.log(data);
  };
  return (
    <Body>
      <UploadForm>
        <Info>사업지 등록하기</Info>
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
        <Info>소개</Info>
        {/* <Content maxLength="400" required /> */}
        <Slate editor={editor} value={value} onChange={changeContent}>
          <Editable className="Editor" />
        </Slate>
        <Info>사진 등록하기</Info>
        <Button>사진 업로드</Button>
      </UploadForm>
    </Body>
  );
};

export default UploadPost;
