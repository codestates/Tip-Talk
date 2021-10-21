import React, { useState } from 'react';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import Thumbnail from '../components/Thumbnail';
import { data } from '../dummy/post';
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
  display: flex;
  width: 100%;
  padding: 10px;
  overflow: hidden;
  overflow-x: auto;
`;

const Main = () => {
  const [posts, setPosts] = useState(data);
  return (
    <Body>
      <Coin mode="up" right="40px" bottom="200px" />
      <SearchForm>
        <Input />
        <Search>TipTalk!</Search>
      </SearchForm>

      <ImageUl>
        {
          // * 조회수가 높은
          posts.map((post) => (
            <Thumbnail thumbnail={post} key={post.post.id} />
          ))
        }
      </ImageUl>

      <ImageUl>
        {
          // * 좋아요가 높은
          posts.map((post) => (
            <Thumbnail thumbnail={post} key={post.post.id} />
          ))
        }
      </ImageUl>
    </Body>
  );
};

export default Main;
