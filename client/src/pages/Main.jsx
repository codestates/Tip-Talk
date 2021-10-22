import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Category from '../components/Category';
import { Coin } from '../components/Coin';
import Slider from '../components/Slider';
import Thumbnail from '../components/Thumbnail';
import { data } from '../dummy/post';
import { Body, Samlib, Scroll, Title } from '../styles/common';

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

const ImageGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  padding: 10px;
  border: 1px solid black;
`;

const Main = () => {
  const [posts, setPosts] = useState(data);
  const scrollRef = useRef();

  return (
    <Body>
      <Scroll ref={scrollRef} />
      <Coin scrollRef={scrollRef} mode="up" right="40px" bottom="200px" />
      <Category />
      <SearchForm>
        <Input />
        <Search>TipTalk!</Search>
      </SearchForm>

      <Title>인기 게시물</Title>
      <ImageUl>
        <Slider>
          {posts?.map((post) => (
            <Thumbnail thumbnail={post} draggable key={post.post.id} />
          ))}
        </Slider>
      </ImageUl>

      <Title>좋아요를 많이 받은 게시물</Title>
      <ImageUl>
        <Slider>
          {posts?.map((post) => (
            <Thumbnail thumbnail={post} draggable key={post.post.id} />
          ))}
        </Slider>
      </ImageUl>

      <Title>가장 최근에 올라온 게시물</Title>
      <ImageGrid>
        {posts?.map((post) => (
          <Thumbnail thumbnail={post} draggable key={post.post.id} />
        ))}
      </ImageGrid>
    </Body>
  );
};

export default Main;
