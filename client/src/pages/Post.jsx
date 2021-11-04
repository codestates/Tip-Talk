import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

  .container {
    padding: 8px 16px;
    border-radius: 6px;
    color: ${Color_3};
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.55);
  }
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
  const map = useRef();

  const [post, setPost] = useState();
  const [around, setAround] = useState();
  const [value, setValue] = useState();
  const [comments, setComments] = useState();
  const [isOpen, setIsOpen] = useState(false);
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
          map.current = new kakao.maps.Map(MapContainer, option);

          const marker = new kakao.maps.Marker({
            position: center,
          });

          marker.setMap(map.current);

          // ToDo 주변위치 정보 받아오기
          axios
            .get(`${process.env.REACT_APP_SERVER_URL}/post/around/${postId}`, {
              params: { lat, lng },
            })
            .then(({ data }) => {
              if (data.status && data.data.posts.length) {
                const { posts } = data.data;
                setAround(posts);
                let bounds = new kakao.maps.LatLngBounds();
                posts.forEach((post) => {
                  post.lat = +post.lat;
                  post.lng = +post.lng;
                  displayMarker(post);
                  bounds.extend(new kakao.maps.LatLng(post.lat, post.lng));
                });
                bounds.extend(new kakao.maps.LatLng(lat, lng));
                map.current.setBounds(bounds);
              }
            });
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

    function displayMarker(post) {
      const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const newMarker = new kakao.maps.Marker({
        map: map.current,
        position: new kakao.maps.LatLng(post.lat, post.lng),
        image: markerImage,
      });

      const content = `<div class="container">
        <div class="overlay">
          <h2 class="title">${post.title}</h2>
        </div>
      </div>`;

      const overlay = new kakao.maps.CustomOverlay({
        content,
        map: map.current,
        position: newMarker.getPosition(),
        yAnchor: 0,
      });

      overlay.setVisible(false);

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(newMarker, 'click', function () {
        if (overlay.getVisible()) {
          overlay.setVisible(false);
        } else {
          overlay.setVisible(true);
        }
      });
    }
  }, [postId]);

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
            <Label>카테고리</Label>
            <Text>{post?.categories[0]?.value}</Text>
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
