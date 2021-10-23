import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Color_3, Samlib } from '../styles/common';

const Background = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -300px;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: 0.25s;
  align-items: center;
  z-index: 11;
`;

const Thumbnail = styled.img`
  width: 100%;
`;

const Info = styled.div`
  width: 100%;
  padding: 20px 20px 0 20px;
  color: ${Color_3};
`;

const Close = styled.button`
  position: absolute;
  top: 0px;
  left: 275px;
  font-size: 20px;
  font-style: ${Samlib};
  font-weight: bold;
  color: ${Color_3};
  border: none;
  background-color: transparent;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Text = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 4px 0 10px 4px;
`;

const Button = styled.button`
  width: 140px;
  height: 40px;
  border: none;
  border-radius: 8px;
  font-family: ${Samlib};
  font-size: 24px;
  color: ${Color_3};
  background-color: ${({ theme }) => theme.navBgColor};
  transition: 0.1s;
  &:hover {
    transform: scale(1.1);
  }
`;

const MapModal = ({ data, backgroundRef, handleClose }) => {
  const { post, user } = data;
  const history = useHistory();

  const goToPost = () => {
    history.push(`/post/${post.id}`);
  };
  return (
    <Background ref={backgroundRef}>
      <Close onClick={handleClose}>x</Close>
      <Thumbnail src={post.images[0]} alt={post.title} />
      <Info>
        <Label>제목</Label>
        <Text>{post.title}</Text>
        <Label>지역</Label>
        <Text>dd</Text>
        <Label>카테고리</Label>
        <Text>dd</Text>
        <Label>작성자</Label>
        <Text>{user.nickname}</Text>
      </Info>
      <Button onClick={goToPost}>게시글 보기</Button>
    </Background>
  );
};

export default MapModal;
