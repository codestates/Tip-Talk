import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Body, Info, Label, Meta, Text } from '../styles/common';
import { useParams } from 'react-router';
import { data } from '../dummy/post';
import Carousel from '../components/Carousel';
import { kakao } from '../App';
import Comments from '../components/Comments';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

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
`;

const Content = styled.div`
  padding: 10px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
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
    axios.get(`http://localhost:8000/post/${postId}`).then(({ data }) => {
      if (data.status) {
        const { posts } = data;
        setValue(JSON.parse(posts.content));
        setPost({
          ...posts,
          images: posts.images.split(' '),
          content: JSON.parse(posts.content),
        });
        const MapContainer = document.getElementById('map');
        const lat = posts.lat;
        const lng = posts.lng;
        console.log(posts);

        const center = new kakao.maps.LatLng(lat, lng);

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
    });

    // * Comment 데이터 받아오기

    axios.get(`http://localhost:8000/comment/${postId}`).then(({ data }) => {
      setComments(data.data);
    });
  }, []);

  const handleSubmit = (text) => {
    axios
      .post(`http://localhost:8000/comment/${postId}`, { text })
      .then(({ data }) => {
        if (data.status) {
          setComments([...comments, data.data]);
        }
      });
  };

  const handleEdit = (text, commentId) => {
    axios
      .patch(`http://localhost:8000/comment/${commentId}`, { text })
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
    axios.delete(`http://localhost:8000/comment/${commentId}`).then(() => {
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
        <Content>
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
        </Content>
        <Info>{post?.title} 주변엔 어떤 것이 있나요?</Info>
        <Map id="map"></Map>
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

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'center':
      return <center {...attributes}>{children}</center>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default Post;
