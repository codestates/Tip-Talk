import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import KakaoMap from '../components/KakaoMap';
import Thumbnail from '../components/Thumbnail';
import { Body, Scroll, Title } from '../styles/common';

const ImageGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  padding: 10px;
  @media ${({ theme }) => theme.size.mobile} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${({ theme }) => theme.size.mobileS} {
    grid-template-columns: 1fr;
    padding: 20px 50px;
  }
`;

const Main = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]); // * 모든 posts
  const [filteredPosts, setFilteredPosts] = useState(); // * 검색 결과에 따른 posts
  const scrollRef = useRef();

  const handleSearch = (value, categoryId) => {
    // ToDo Axios getPosts로 필터된 posts 불러오기
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/post`, {
        params: { search: value, categoryId },
      })
      .then(({ data }) => {
        if (data.status) {
          const { post } = data.data;
          if (post) {
            parsePost(post);
            setFilteredPosts([...post]);
          }
        }
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/post`, {
        params: {
          search: '',
          page,
        },
      })
      .then(({ data }) => {
        if (data.status) {
          const { post } = data.data;
          if (post) {
            parsePost(post);
            setPosts([...posts, ...post]);
          }
        }
      });
  }, [page]);

  const parsePost = (post) => {
    post.forEach((p) => {
      p.lat = +p.lat;
      p.lng = +p.lng;
      if (p.images) {
        p.images = p.images.split(' ');
      }
    });
  };

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
              <Thumbnail thumbnail={post} draggable key={post.id} />
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
