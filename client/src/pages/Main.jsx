import React from 'react';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import { Body, Samlib } from '../styles/common';

const SearchForm = styled.div`
  display: flex;
  width: 100%;
  height: 46px;
  margin: 60px 0;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 40vw;
  height: 100%;
`;

const Search = styled.button`
  width: 120px;
  height: 100%;
  font-family: ${Samlib};
  font-size: 28px;
`;

const ImageUl = styled.ul`
  width: 100%;
  height: 300px;
  padding: 10px;
  border: 1px solid black;
`;

const ImageLi = styled.li`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 240px;
  height: 180px;
`;

const Main = () => {
  return (
    <Body>
      <Coin mode="up" right="40px" bottom="200px" />
      <SearchForm>
        <Input />
        <Search>TipTalk!</Search>
      </SearchForm>

      <ImageUl>
        <ImageLi>
          <Image src="https://picsum.photos/240/180" alt="thumbnail" />
          <span>제목입니다</span>
        </ImageLi>
      </ImageUl>
    </Body>
  );
};

export default Main;
