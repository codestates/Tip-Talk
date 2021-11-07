import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import KakaoMap from '../components/KakaoMap';
import Thumbnail from '../components/Thumbnail';
import { Body, Color_1, Color_6, Meta, Scroll, Title } from '../styles/common';

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

const CategoryList = styled.div`
  position: absolute;
  display: flex;
  top: 36px;
  right: 100px;
  margin-bottom: 30px;
`;

const Category = styled.button`
  color: ${({ active }) => (active ? Color_1 : Color_6)};
  border: none;
  border-right: 1px solid ${({ theme }) => theme.line};
  background-color: transparent;
  &:last-child {
    border: none;
  }
`;

const Main = () => {
  const [page, setPage] = useState(0);
  const [max, setMax] = useState(1);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]); // * 모든 posts
  const [filteredPosts, setFilteredPosts] = useState(); // * 검색 결과에 따른 posts
  const [order, setOrder] = useState(0);
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

  const infiniteScroll = useCallback(() => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop,
    );
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight > scrollHeight - 200) {
      if (page < max - 1 && !loading) {
        setLoading(true);
        setPage(page + 1);
      }
    }
  }, [page, loading, max]);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, true);
    return () => window.removeEventListener('scroll', infiniteScroll, true);
  }, [infiniteScroll]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/post`, {
        params: {
          search: '',
          page,
          order: order ? order : 0,
        },
      })
      .then(({ data }) => {
        if (data.status) {
          const { post, max } = data.data;
          if (post) {
            parsePost(post);
            setMax(max);
            setPosts([...posts, ...post]);
            setLoading(false);
          }
        }
      });
  }, [page, order]);

  const parsePost = (post) => {
    post.forEach((p) => {
      p.lat = +p.lat;
      p.lng = +p.lng;
      if (p.images) {
        p.images = p.images.split(' ');
      }
    });
  };

  const ChangeOrder = (e) => {
    const { innerText } = e.target;
    switch (innerText) {
      case '최신순':
        setOrder(0);
        break;
      case '조회순':
        setOrder(1);
        break;
      case '인기순':
        setOrder(2);
        break;
      default:
        setOrder(0);
        break;
    }
  };

  return (
    <>
      <Body>
        <Scroll ref={scrollRef} />
        <Coin scrollRef={scrollRef} mode="up" right="40px" bottom="110px" />
        <KakaoMap posts={filteredPosts} handleSearch={handleSearch} />
        <Meta>
          <Title>가장 인기있는 장소</Title>
          <CategoryList>
            <Category onClick={ChangeOrder}>최신순</Category>
            <Category onClick={ChangeOrder}>조회순</Category>
            <Category onClick={ChangeOrder}>인기순</Category>
          </CategoryList>
        </Meta>
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
