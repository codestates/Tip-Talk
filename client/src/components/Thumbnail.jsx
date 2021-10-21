import React from 'react';
import styled from 'styled-components';

const Article = styled.li`
  display: flex;
  width: 280px;
  height: 280px;
  margin: 6px;
  flex-direction: column;
`;

const Image = styled.img`
  height: 260px;
  border-radius: 10px;
  overflow: hidden;
`;

const ImageInfo = styled.span`
  height: 24px;
  padding: 3px 7px 0;
  overflow: hidden;
  text-align: ${({ align }) => (align ? align : 'left')};
`;

const ImageTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;

const ImageMeta = styled.span`
  margin-left: 12px;
  font-weight: 500;
`;

const Thumbnail = ({ thumbnail }) => {
  const { post, user } = thumbnail;
  return (
    <Article>
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
