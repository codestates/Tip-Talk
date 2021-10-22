import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Body, Title } from '../styles/common';
import { useParams } from 'react-router';
import { data } from '../dummy/post';
import Carousel from '../components/Carousel';

const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  margin: 40px 100px;
  padding: 50px 80px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.navColor};
`;

const Meta = styled.div`
  padding: 0 60px;
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 15px;
  margin: 6px 0;
  font-weight: 500;
  text-align: end;
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: 500;
  text-align: end;
  margin-bottom: 10px;
`;

const Post = () => {
  const [post, setPost] = useState();
  const { postId } = useParams();

  useEffect(() => {
    // axios.get(`http://localhost:8000/post${postId}`)
    const getPost = data.find((d) => d.post.id === +postId);
    setPost({ ...getPost });
  }, []);
  return (
    <Body>
      <PostContainer>
        <Meta>
          <Label>제목</Label>
          <Text>{post?.post.title}</Text>
          <Label>카테고리</Label>
          <Text>여행지</Text> {/* // ToDo 동적 데이터로 변경 */}
          <Label>조회수</Label>
          <Text>{post?.post.views}</Text>
        </Meta>
        <Carousel images={post?.post.images} />
      </PostContainer>
    </Body>
  );
};

export default Post;
