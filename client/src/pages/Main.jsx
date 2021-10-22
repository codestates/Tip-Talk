import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import KakaoMap from '../components/KakaoMap';
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
`;

const ImageGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  padding: 10px;
`;

const Main = () => {
  const [posts, setPosts] = useState(data); // * 모든 posts
  const [filteredPosts, setFilteredPosts] = useState(data); // * 검색 결과에 따른 posts
  const scrollRef = useRef();
  const inputRef = useRef();

  const handleSearch = () => {
    const { value } = inputRef.current;
    // ToDo Axios getPosts로 필터된 posts 불러오기
  };

  return (
    <>
      {posts ? (
        <Body>
          <Scroll ref={scrollRef} />
          <Coin scrollRef={scrollRef} mode="up" right="40px" bottom="200px" />
          <SearchForm>
            <Input ref={inputRef} placeholder="검색어를 입력해주세요" />
            <Search onClick={handleSearch}>TipTalk!</Search>
          </SearchForm>

          <KakaoMap posts={filteredPosts} />

          <Title>가장 최근에 올라온 게시물</Title>
          <ImageGrid>
            {posts?.map((post) => (
              <Thumbnail thumbnail={post} draggable key={post.post.id} />
            ))}
          </ImageGrid>
        </Body>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default Main;
