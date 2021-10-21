import React from 'react';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import { Body } from '../styles/common';

const ImageUl = styled.ul`
  width: 100%;
  height: 300px;
  border: 1px solid black;
`;

const ImageLi = styled.li``;

const Main = () => {
  return (
    <Body>
      <Coin mode="up" right="40px" bottom="200px" />
      <ImageUl>
        <ImageLi></ImageLi>
      </ImageUl>
      <ImageUl>
        <ImageLi></ImageLi>
      </ImageUl>
      <ImageUl>
        <ImageLi></ImageLi>
      </ImageUl>
    </Body>
  );
};

export default Main;
