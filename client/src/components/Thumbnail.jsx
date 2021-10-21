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
  font-weight: 600;
`;

const ImageMeta = styled.span`
  margin-left: 12px;
`;

const Thumbnail = () => {
  return (
    <Article>
      <Image src="https://picsum.photos/240/180" alt="thumbnail" />
      <ImageInfo>
        <ImageTitle>제목입니다</ImageTitle>
      </ImageInfo>
      <ImageInfo align="right">
        <ImageMeta>작성자</ImageMeta>
        <ImageMeta>132</ImageMeta>
        <ImageMeta>❤️</ImageMeta>
        <ImageMeta>1</ImageMeta>
      </ImageInfo>
    </Article>
  );
};

export default Thumbnail;
