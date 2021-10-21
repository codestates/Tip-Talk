import React, { useState } from 'react';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import Slider from '../components/Slider';
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
  width: 100%;
  padding: 10px;
  overflow: hidden;
  border: 1px solid black;
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
        <h1>인기 게시물</h1>
        <Slider>
          {posts?.map((post) => (
            <Thumbnail thumbnail={post} draggable key={post.post.id} />
          ))}
        </Slider>
      </ImageUl>

      <ImageUl>
        <h1>좋아요를 많이 받은 게시물</h1>
        <Slider>
          {posts?.map((post) => (
            <Thumbnail thumbnail={post} draggable key={post.post.id} />
          ))}
        </Slider>
      </ImageUl>

      <ImageUl>
        <h1>가장 최근에 올라온 게시물</h1>
        {posts?.map((post) => (
          <Thumbnail thumbnail={post} draggable key={post.post.id} />
        ))}
      </ImageUl>
    </Body>
  );
};

export default Main;
