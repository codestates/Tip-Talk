import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Body } from '../styles/common';
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

const ImageCardForm = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const ImageCard = styled.img``;

const Meta = styled.div`
  margin-top: 20px;
  padding: 0 60px;
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 15px;
  margin: 6px 0;
  font-weight: 500;
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: 500;
  padding-left: 20px;
  margin-bottom: 20px;
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
        <Carousel images={post?.post.images} />
        <ImageCardForm>
          {post?.post.images.map((image, i) => (
            <li key={i}>
              <ImageCard src={image} alt="이미지 카드" />
            </li>
          ))}
        </ImageCardForm>
        <Meta>
          <Label>장소명</Label>
          <Text>{post?.post.title}</Text>
          <Label>카테고리</Label>
          <Text>여행지</Text> {/* // ToDo 동적 데이터로 변경 */}
          <Label>조회수</Label>
          <Text>{post?.post.views}</Text>
        </Meta>
      </PostContainer>
    </Body>
  );
};

export default Post;
