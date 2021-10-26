import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Body, Color_6 } from '../styles/common';
import { useParams } from 'react-router';
import { data } from '../dummy/post';
import Carousel from '../components/Carousel';
import { kakao } from '../App';

const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  margin: 0 100px;
  padding: 50px 80px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.navColor};
`;

const Meta = styled.div`
  display: flex;
  margin: 20px 0;
  margin-bottom: 35px;
  padding: 10px 45px;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 6px;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 14px;
  margin: 6px 0;
  font-weight: 500;
  padding-bottom: 3px;
  border-bottom: 1px solid ${Color_6};
`;

const Text = styled.div`
  font-size: ${({ size }) => (size ? size : '18px')};
  font-weight: 500;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const Map = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 8px;
`;

const Info = styled.h3`
  font-size: 24px;
  font-weight: 500;
  padding: 10px 0;
  margin: 30px 15px;
  margin-right: auto;
  border-bottom: 1px solid ${Color_6};
`;

const Content = styled.div``;

const Post = () => {
  const [post, setPost] = useState();
  const { postId } = useParams();

  useEffect(() => {
    // * 서버로부터 데이터 받아오기
    axios.get(`http://localhost:8000/post/${postId}`).then(({ data }) => {
      const MapContainer = document.getElementById('map');
      const lat = data.data[0].post.lat;
      const lng = data.data[0].post.lng;

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
    });
    const getPost = data.find((d) => d.post.id === +postId);
    setPost({ ...getPost });
  }, []);

  return (
    <Body>
      <PostContainer>
        <Meta>
          <div>
            <Label>장소명</Label>
            <Text size="24px">{post?.post.title}</Text>
            <Label>조회수</Label>
            <Text>{post?.post.views}</Text>
          </div>
          <div>
            <Label>주소</Label>
            <Text>인천광역시</Text>
            {/* // ToDo 동적 데이터로 변경 */}
            <Label>카테고리</Label>
            <Text>여행지</Text> {/* // ToDo 동적 데이터로 변경 */}
          </div>
        </Meta>
        <Carousel images={post?.post.images} />
        <Info>{post?.post.title} 주변엔 어떤 것이 있나요?</Info>
        <Map id="map"></Map>
        <Info>{post?.post.title} 소개</Info>
        <Content>{post?.post.content}</Content>
      </PostContainer>
    </Body>
  );
};

export default Post;
