import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const Article = styled.li`
  display: flex;
  height: 320px;
  margin: 10px;
  flex-direction: column;
  transition: 0.2s;
  border-radius: 10px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  &:hover {
    cursor: pointer;
    transform: translateY(-10px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: calc(100% - 56px);
`;

const ImageInfo = styled.span`
  height: 28px;
  padding: 3px 7px 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.formColor};
  text-align: ${({ align }) => (align ? align : 'left')};
`;

const ImageTitle = styled.h1`
  margin-top: 3px;
  font-size: 18px;
  font-weight: 600;
`;

const ImageMeta = styled.span`
  font-size: 14px;
  margin-left: 8px;
`;

const Thumbnail = ({ thumbnail }) => {
  const history = useHistory();

  const goToPost = () => {
    history.push(`/post/${thumbnail.id}`);
  };

  return (
    <Article onClick={goToPost}>
      <Image src={thumbnail?.images[0]} alt="thumbnail" />
      <ImageInfo>
        <ImageTitle>{thumbnail?.title}</ImageTitle>
      </ImageInfo>
      <ImageInfo align="right">
        <ImageMeta>
          <FontAwesomeIcon icon={faEye} />
        </ImageMeta>
        <ImageMeta>{thumbnail?.views}</ImageMeta>
        <ImageMeta>
          <FontAwesomeIcon icon={faHeart} />
        </ImageMeta>
        <ImageMeta>{thumbnail?.likes}</ImageMeta>
      </ImageInfo>
    </Article>
  );
};

export default Thumbnail;
