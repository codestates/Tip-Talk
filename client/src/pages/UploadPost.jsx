import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../components/Modal';
import TextEditor, { deserialize } from '../components/TextEditor';

import {
  Body,
  Color_4,
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
  padding: 50px 80px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.navColor};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  ul,
  li {
    list-style: none;
  }
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

const CurrentImageWrapper = styled.div`
  display: flex;
  width: 80%;
  height: 600px;
  margin: 20px 0;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CurrentImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageList = styled.ul`
  display: flex;
  min-width: 160px;
  height: 120px;
  text-align: center;
  margin: 20px 0;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.li`
  position: relative;
  display: flex;
  width: 160px;
  height: 120px;
  margin: 6px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  background-color: transparent;
`;

const ImageCard = styled.img`
  width: 160px;
  height: 120px;
`;

const Button = styled.button`
  width: 160px;
  height: 48px;
  color: ${({ theme }) => theme.navColor};
  font-size: 20px;
  font-family: ${Samlib};
  font-weight: 600;
  letter-spacing: 3px;
  margin: 30px 0;
  border: none;
  border-radius: 6px;
  background-color: ${Color_4};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
`;

const Message = styled.strong`
  font-size: 19px;
  line-height: 28px;
`;

const UploadPost = () => {
  const [address, setAddress] = useState({ ...useLocation().state });
  const [categories, setCategories] = useState();
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const categoriesInputRef = useRef();

  if (!address.name) {
    console.log('비정상적인 접근입니다');
  }
  // console.log(address);

  useEffect(() => {
    axios.get('http://localhost:8000/category').then(({ data }) => {
      if (data.status) {
        setCategories(data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (!images.length) {
      setCurrent(undefined);
    }
  }, [images]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = categoriesInputRef.current.value;
    const title = titleInputRef.current.value;
    if (images.length === 0 || !category || !title) {
      setError(true);
      return;
    }
    setIsOpen(true);
  };

  const uploadPlace = () => {
    const text = deserialize(localStorage.getItem('content') || '');
    const category = categoriesInputRef.current.value;
    const title = titleInputRef.current.value;
    const formData = new FormData();

    // console.log(text[0].children[0].text);
    // console.log(category);
    // console.log(title);
    // console.log(images);

    formData.append('title', title);
    formData.append('content', text[0].children[0].text);
    formData.append('images', images);
    formData.append('categoryId', category);
    formData.append('lat', address.lat);
    formData.append('lng', address.lng);
    formData.append('region', address.name);

    // ToDo 업로드하기

    axios
      .post('http://localhost:8000/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    // ! url 사용 후에 메모리에서 제거하기
    // URL.revokeObjectURL(url);
  };

  const handleUploadImage = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  };

  const handleImage = (e) => {
    if (e.target.files.length && images.length < 4) {
      const ImageURL = URL.createObjectURL(e.target.files[0]);
      setImages([...images, ImageURL]);
      setCurrent(images.length);
    }
  };

  const handleDeleteImage = (index, e) => {
    e.preventDefault();
    const filtered = images.filter((_, i) => i !== index);
    URL.revokeObjectURL(images[index]);
    setCurrent(filtered.length - 1);
    setImages([...filtered]);
  };

  const handleCurrentImage = (index) => {
    setCurrent(index);
  };

  return (
    <Body>
      {error && (
        <Modal message="모든 항목을 입력해주세요" setIsOpen={setError} />
      )}
      {isOpen && (
        <Modal
          message="업로드할까요?"
          setIsOpen={setIsOpen}
          callback={uploadPlace}
        />
      )}
      <UploadForm onSubmit={handleSubmit}>
        <CustomInfo>사업지 등록하기</CustomInfo>
        <Meta>
          <div>
            <CustomLabel>상호명</CustomLabel>
            <Input
              ref={titleInputRef}
              type="text"
              name="title"
              placeholder="상호명을 입력해주세요"
            />
            <CustomLabel>카테고리 선택</CustomLabel>
            <Select ref={categoriesInputRef} name="categories">
              {categories?.map((category) => (
                <option value={category.id}>{category.value}</option>
              ))}
            </Select>
          </div>
          <div>
            <CustomLabel>주소</CustomLabel>
            <Text>{address?.name}</Text>
          </div>
        </Meta>
        <CustomInfo>사진 등록하기</CustomInfo>
        <CurrentImageWrapper>
          {current !== undefined ? (
            <CurrentImage src={images[current]} alt="대표이미지" />
          ) : (
            <Message>미리보기할 사진이 없어요</Message>
          )}
        </CurrentImageWrapper>
        <ImageList>
          {images.length ? (
            images?.map((image, i) => (
              <ImageWrapper key={i}>
                <DeleteButton
                  type="button"
                  onClick={(e) => handleDeleteImage(i, e)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </DeleteButton>
                <ImageCard
                  onClick={() => handleCurrentImage(i)}
                  src={image}
                  alt="이미지"
                />
              </ImageWrapper>
            ))
          ) : (
            <ImageWrapper>
              <Message>
                사진을 <br /> 업로드 해주세요
              </Message>
            </ImageWrapper>
          )}
        </ImageList>
        <ImageInput
          ref={imageInputRef}
          type="file"
          multiple="multiple"
          accept="image/*"
          name="image"
          onChange={handleImage}
        />
        <Button type="button" onClick={handleUploadImage}>
          사진 업로드
        </Button>
        <CustomInfo>소개란 입력하기</CustomInfo>
        <TextEditor />
        <Button type="submit">저장하기</Button>
      </UploadForm>
    </Body>
  );
};

export default UploadPost;
