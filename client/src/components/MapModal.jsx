import React from 'react';
import styled from 'styled-components';
import { Color_3, Samlib } from '../styles/common';

const Background = styled.div`
  position: absolute;
  left: -300px;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: 0.25s;
  z-index: 11;
`;

const Thumbnail = styled.img`
  width: 100%;
`;

const Info = styled.div`
  padding: 20px;
  color: ${Color_3};
`;

const Close = styled.button`
  position: absolute;
  top: 0px;
  left: 275px;
  font-size: 20px;
  font-style: ${Samlib};
  font-weight: bold;
  border: none;
  background-color: transparent;
`;

const Label = styled.div`
  font-size: 15px;
  margin: 6px 0;
  font-weight: 500;
`;

const Text = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const MapModal = ({ data, backgroundRef, handleClose }) => {
  const { post, user } = data;
  return (
    <Background ref={backgroundRef}>
      <Close onClick={handleClose}>x</Close>
      <Thumbnail src={post.images[0]} alt={post.title} />
      <Info>
        <Label>제목</Label>
        <Text>{post.title}</Text>
        <Label>여행지</Label>
        <Text>dd</Text>
        <Label>카테고리</Label>
        {/* // ToDo 데이터 추가로 입력하기 */}
      </Info>
    </Background>
  );
};

export default MapModal;
