import React from 'react';
import styled from 'styled-components';
import { Color_3 } from '../styles/common';

const Background = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${Color_3};
  z-index: 11;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  font-size: 46px;
  font-weight: bold;
  margin: 0 2px;
  animation-duration: 4s;
  animation-name: loading;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  &:nth-child(1) {
    animation-delay: 0;
  }
  &:nth-child(2) {
    animation-delay: 0.5s;
  }
  &:nth-child(3) {
    animation-delay: 1s;
  }
  &:nth-child(4) {
    animation-delay: 1.5s;
  }
  &:nth-child(5) {
    animation-delay: 2s;
  }
  &:nth-child(6) {
    animation-delay: 2.5s;
  }
  &:nth-child(7) {
    animation-delay: 3s;
  }
`;

const Loading = () => {
  return (
    <Background>
      <Message>T</Message>
      <Message>I</Message>
      <Message>P</Message>
      <Message>T</Message>
      <Message>A</Message>
      <Message>L</Message>
      <Message>K</Message>
    </Background>
  );
};

export default Loading;
