import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { kakao } from '../App';

const Map = styled.div`
  width: 100%;
  height: 60vh;
  max-height: 800px;
  border-radius: 12px;
  margin-bottom: 50px;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 11;
`;

const InfoModal = styled.div``;

const KakaoMap = ({ posts }) => {
  const containerRef = useRef();
  const [current, setCurrent] = useState();

  console.log(current);

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 4,
    };
    const map = new kakao.maps.Map(containerRef.current, options);

    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    if (posts) {
      let bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < posts.length; i++) {
        displayMarker(posts[i].post);
        bounds.extend(
          new kakao.maps.LatLng(posts[i].post.lng, posts[i].post.lat),
        );
      }
      map.setBounds(bounds);
    }

    function displayMarker(post) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(post.lng, post.lat),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        setCurrent(post);
      });
    }
  }, [posts]);

  const handleClose = () => {
    setCurrent(null);
  };

  return (
    <>
      {current && (
        <Background onClick={handleClose}>
          <InfoModal />
        </Background>
      )}
      <Map ref={containerRef} id="map" />
    </>
  );
};

export default KakaoMap;
