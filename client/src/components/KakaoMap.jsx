import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { kakao } from '../App';
import MapModal from './MapModal';

const MapContainer = styled.div`
  position: relative;
  display: flex;
  height: 60vh;
  max-height: 800px;
`;

const Map = styled.div`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 50px;
`;

const KakaoMap = ({ posts, place }) => {
  const containerRef = useRef();
  const backgroundRef = useRef();
  const map = useRef(null);
  const [current, setCurrent] = useState();

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 4,
    };
    map.current = new kakao.maps.Map(containerRef.current, options);
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    if (posts) {
      let bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < posts.length; i++) {
        displayMarker(posts[i]);
        bounds.extend(
          new kakao.maps.LatLng(posts[i].post.lat, posts[i].post.lng),
        );
      }
      map.current.setBounds(bounds);
    }

    function displayMarker(Post) {
      const { post, user } = Post;
      const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      let marker = new kakao.maps.Marker({
        map: map.current,
        position: new kakao.maps.LatLng(post.lat, post.lng),
        image: markerImage,
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        setCenter(post.lat, post.lng);
        setCurrent({ post, user });
      });
    }
  }, [posts]);

  useEffect(() => {
    if (current) {
      backgroundRef.current.style.left = '0px';
    }
  }, [current]);

  const setCenter = (lat, lng) => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.current.panTo(moveLatLon);
  };

  const handleClose = () => {
    setCurrent(null);
  };

  return (
    <MapContainer>
      <Map ref={containerRef} id="map">
        {current && (
          <MapModal
            data={current}
            backgroundRef={backgroundRef}
            handleClose={handleClose}
          />
        )}
      </Map>
    </MapContainer>
  );
};

export default KakaoMap;
