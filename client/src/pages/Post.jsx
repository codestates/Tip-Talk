import React, { useEffect, useMemo, useState } from 'react';
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
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
  ]);
  const [comments, setComments] = useState();
  const { postId } = useParams();

  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    // * 서버로부터 데이터 받아오기
    axios.get(`http://localhost:8000/post/${postId}`).then(({ data }) => {
      if (data.status) {
        const { posts } = data;
        console.log('1 : ', JSON.parse(posts.content));
        setValue(JSON.parse(posts.content));
        setPost({
          ...posts,
          images: posts.images.split(' '),
          content: JSON.parse(posts.content),
        });
        const MapContainer = document.getElementById('map');
        const lat = posts.lat;
        const lng = posts.lng;

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

    // ! 더미데이터는 나중에 삭제하기
    const getPost = data.find((d) => d.post.id === +postId);
    setPost({ ...getPost });

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

  const parseContent = (line) => {
    switch (line.type) {
      case 'block-quote':
        return <blockquote>{line.children[0].text}</blockquote>;
      case 'bulleted-list':
        return <ul>{line.children[0].text}</ul>;
      case 'heading-one':
        return <h1>{line.children[0].text}</h1>;
      case 'heading-two':
        return <h2>{line.children[0].text}</h2>;
      case 'list-item':
        return <li>{line.children[0].text}</li>;
      case 'numbered-list':
        return <ol>{line.children[0].text}</ol>;
      case 'center':
        return <center>{line.children[0].text}</center>;
      default:
        return <p>{line.children[0].text}</p>;
    }
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
            <Text>인천광역시</Text>
            {/* // ToDo 동적 데이터로 변경 */}
            <Label>카테고리</Label>
            <Text>여행지</Text> {/* // ToDo 동적 데이터로 변경 */}
          </div>
        </Meta>
        <Carousel images={post?.images} />
        <Info>{post?.title} 소개</Info>
        {/* <Content>{post?.content}</Content> */}
        <Content>
          {post?.content?.map((line) => {
            return parseContent(line);
          })}
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

const renderElement = (props) => {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
const DefaultElement = (props) => {
  console.log(props);

  return <p {...props.attributes}>{props.children}</p>;
};

export default Post;
