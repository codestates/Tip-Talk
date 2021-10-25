import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const Article = styled.li`
  display: flex;
  margin: 10px;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const ImageInfo = styled.span`
  height: 28px;
  padding: 3px 7px 0;
  overflow: hidden;
  text-align: ${({ align }) => (align ? align : 'left')};
`;

const ImageTitle = styled.h1`
  margin-top: 5px;
  font-size: 18px;
  font-weight: 500;
`;

const ImageMeta = styled.span`
  margin-left: 12px;
  font-weight: 500;
`;

const Thumbnail = ({ thumbnail }) => {
  const { post, user } = thumbnail;
  const history = useHistory();

  const goToPost = () => {
    history.push(`/post/${post.id}`);
  };

  return (
    <Article onClick={goToPost}>
      <Image src={post.images[0]} alt="thumbnail" />
      <ImageInfo>
        <ImageTitle>{post.title}</ImageTitle>
      </ImageInfo>
      <ImageInfo align="right">
        <ImageMeta>{user.nickname}</ImageMeta>
        <ImageMeta>{post.views}</ImageMeta>
        <ImageMeta>❤️</ImageMeta>
        <ImageMeta>1</ImageMeta>
      </ImageInfo>
    </Article>
  );
};

export default Thumbnail;