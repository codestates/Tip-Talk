import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import KakaoMap from '../components/KakaoMap';
import Thumbnail from '../components/Thumbnail';
import { data } from '../dummy/post';
import { Body, Scroll, Title } from '../styles/common';

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

  const handleSearch = (value) => {
    // ToDo Axios getPosts로 필터된 posts 불러오기
    // setFilteredPosts();
  };

  // ToDo getPost 완성되면 데이터 받아오기
  // useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_SERVER_URL}/post`)
  // })

  return (
    <>
      <Body>
        <Scroll ref={scrollRef} />
        <Coin scrollRef={scrollRef} mode="up" right="40px" bottom="110px" />

        <KakaoMap posts={filteredPosts} handleSearch={handleSearch} />

        <Title>가장 최근에 올라온 게시물</Title>
        <ImageGrid>
          {posts ? (
            posts.map((post) => (
              <Thumbnail thumbnail={post} draggable key={post.post.id} />
            ))
          ) : (
            <div>로딩 페이지</div>
          )}
        </ImageGrid>
      </Body>
    </>
  );
};

export default Main;
