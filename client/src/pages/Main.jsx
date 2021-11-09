import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import KakaoMap from '../components/KakaoMap';
import Modal from '../components/Modal';
import Thumbnail from '../components/Thumbnail';
import { Color_1, Color_6, Meta, Scroll } from '../styles/common';

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 80px 0;
  flex-direction: column;
  align-items: center;
`;

const ImageGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  max-width: 1400px;
  min-height: 700px;
  @media ${({ theme }) => theme.size.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media ${({ theme }) => theme.size.mobile} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${({ theme }) => theme.size.mobileS} {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

const CustomMeta = styled(Meta)`
  width: 90%;
  max-width: 1400px;
`;

const Title = styled.h1`
  margin: 15px;
  font-size: 38px;
  color: ${(props) => props.theme.color};
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 28px;
  }
`;

const CategoryList = styled.div`
  position: absolute;
  display: flex;
  top: 36px;
  right: 100px;
  margin-bottom: 30px;
  @media ${({ theme }) => theme.size.mobile} {
    top: 20px;
    right: 20px;
  }
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

const orders = ['최신순', '조회순', '인기순'];

const Main = () => {
  const [page, setPage] = useState(0);
  const [max, setMax] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
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
          if (post.length) {
            parsePost(post);
            setFilteredPosts([...post]);
          } else {
            setMessage('검색 결과가 없습니다!');
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
          order,
          offset: 8,
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
    e.preventDefault();
    const { innerText } = e.target;
    setPage(0);
    switch (innerText) {
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
    setPosts([]);
  };

  return (
    <>
      <MainContainer>
        {message && <Modal message={message} setIsOpen={setMessage} />}
        <Scroll ref={scrollRef} />
        <Coin scrollRef={scrollRef} mode="up" right="40px" bottom="110px" />
        <KakaoMap posts={filteredPosts} handleSearch={handleSearch} />
        <CustomMeta>
          <Title>{orders[order]}으로 보기</Title>
          <CategoryList>
            {orders.map((o, i) => (
              <Category active={order === i} onClick={ChangeOrder} key={i}>
                {o}
              </Category>
            ))}
          </CategoryList>
        </CustomMeta>
        <ImageGrid>
          {posts ? (
            posts.map((post) => (
              <Thumbnail thumbnail={post} draggable key={post.id} />
            ))
          ) : (
            <div>로딩 페이지</div>
          )}
        </ImageGrid>
      </MainContainer>
    </>
  );
};

export default Main;
