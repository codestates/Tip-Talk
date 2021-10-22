import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Body, Title } from '../styles/common';
import { useParams } from 'react-router';
import { data } from '../dummy/post';

const PostContainer = styled.article`
  display: flex;
  width: 100%;
  min-height: 600px;
  margin: 40px 0;
`;

const Left = styled.div`
  width: 40%;
  padding: 5px;
  border: 1px solid black;
`;

const Right = styled.div`
  width: 60%;
  padding: 5px;
  border: 1px solid black;
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
        <Left>
          <Title>{post?.post.title}</Title>
        </Left>
        <Right></Right>
      </PostContainer>
    </Body>
  );
};

export default Post;
