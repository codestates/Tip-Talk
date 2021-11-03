import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  Body,
  Color_3,
  Color_4,
  Info,
  Label,
  Meta,
  Text,
} from '../styles/common';
import { useParams } from 'react-router';
import Carousel from '../components/Carousel';
import { kakao } from '../App';
import Comments from '../components/Comments';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { EditorForm, Element, Leaf } from '../components/TextEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  margin: 0 100px;
  padding: 50px 80px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.navColor};
`;

const Map = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
`;

const LikeForm = styled.div`
  display: flex;
  position: fixed;
  bottom: 110px;
  right: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.navBgColor};
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  z-index: 10;
  :hover {
    cursor: pointer;
  }
`;

const LikeButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 22px;
  border: none;
  color: ${({ isLike }) => (isLike ? Color_4 : Color_3)};
  background-color: transparent;
`;

const Post = () => {
  const [post, setPost] = useState();
  const [value, setValue] = useState();
  const [comments, setComments] = useState();
  const { postId } = useParams();

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    // * 서버로부터 데이터 받아오기
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/post/${postId}`)
      .then(({ data }) => {
        if (data.status) {
          const { posts } = data.data;
          setValue(JSON.parse(posts.content));
          setPost({
            ...posts,
            images: posts.images.split(' '),
            content: JSON.parse(posts.content),
          });
          const MapContainer = document.getElementById('map');
          const lat = posts.lat;
          const lng = posts.lng;

          const center = new kakao.maps.LatLng(+lat, +lng);

          const option = {
            center,
            level: 3,
          };
          const map = new kakao.maps.Map(MapContainer, option);

          const marker = new kakao.maps.Marker({
            position: center,
          });

          marker.setMap(map);

          // ToDo 주변위치 정보 받아오기
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // * Comment 데이터 받아오기

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/comment/${postId}`)
      .then(({ data }) => {
        data.data.forEach((comment) => {
          parseDate(comment);
        });
        setComments(data.data);
      });
  }, []);

  const parseDate = (comment) => {
    comment.updatedAt = new Date(comment.updatedAt)
      .toLocaleDateString()
      .replaceAll('.', '')
      .split(' ');
    comment.updatedAt = `${comment.updatedAt[1]}월 ${comment.updatedAt[2]}일`;
  };

  const handleLike = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/post/like/${postId}`)
      .then(({ data }) => {
        if (data.status) {
          // 좋아요 성공
        }
      });
  };

  const handleSubmit = (text) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/comment/${postId}`, { text })
      .then(({ data }) => {
        if (data.status) {
          parseDate(data.data);
          setComments([...comments, data.data]);
        }
      });
  };

  const handleEdit = (text, commentId) => {
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/comment/${commentId}`, {
        text,
      })
      .then(({ data }) => {
        if (data.status) {
          comments.forEach((comment) => {
            if (comment.id === commentId) {
              comment.text = data.data.text;
            }
          });
          setComments([...comments]);
        }
      });
  };

  const handleDelete = (commentId) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/comment/${commentId}`)
      .then(() => {
        const filtered = comments.filter((comment) => comment.id !== commentId);
        setComments([...filtered]);
      });
  };

  return (
    <Body>
      <PostContainer>
        <Meta>
          <div>
            <Label>상호명</Label>
            <Text size="24px">{post?.title}</Text>
            <Label>조회수</Label>
            <Text>{post?.views}</Text>
          </div>
          <div>
            <Label>주소</Label>
            <Text>{post?.region}</Text>
            {/* // ToDo 동적 데이터로 변경 */}
            <Label>카테고리</Label>
            <Text>여행지</Text> {/* // ToDo 동적 데이터로 변경 */}
          </div>
        </Meta>
        <Carousel images={post?.images} />
        <Info>{post?.title} 소개</Info>
        <EditorForm>
          {value && (
            <Slate
              editor={editor}
              value={value}
              onChange={(data) => setValue(data)}
            >
              <Editable
                readOnly
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                className="Editor"
              />
            </Slate>
          )}
        </EditorForm>
        <Info>{post?.title} 주변엔 어떤 것이 있나요?</Info>
        <Map id="map"></Map>
        <LikeForm>
          <LikeButton>
            <FontAwesomeIcon icon={faHeart} />
          </LikeButton>
        </LikeForm>
        <Info>댓글</Info>
        <Comments
          comments={comments}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </PostContainer>
    </Body>
  );
};

export default Post;
