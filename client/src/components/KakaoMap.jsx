import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { kakao } from '../App';
import { Color_1, Color_3 } from '../styles/common';
import MapModal, { ModalBackground } from './MapModal';
import Modal from './Modal';

const MapContainer = styled.div`
  position: relative;
  display: flex;
  height: 70vh;
  min-height: 600px;
`;

const Map = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  border-radius: 12px;
  margin-bottom: 50px;
  justify-content: center;
`;

const SearchForm = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 300px;
  height: 70px;
  background-color: ${Color_1};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

const Input = styled.input`
  width: calc(90% - 38px);
  height: 38px;
  border: none;
  padding: 0 8px;
`;

const Search = styled.button`
  width: 38px;
  height: 38px;
  font-size: 16px;
  border: none;
  background-color: white;
`;

const UploadModal = styled(ModalBackground)`
  left: 0;
  height: 150px;
  padding: 30px;
  color: ${Color_3};
  z-index: 11;
`;

const Address = styled.h2`
  font-size: 24px;
`;

const Label = styled.span`
  display: block;
  margin: 10px 0;
`;

const UploadButton = styled.button`
  width: 120px;
  height: 32px;
  font-size: 20px;
`;

const KakaoMap = ({ posts, handleSearch }) => {
  const containerRef = useRef();
  const backgroundRef = useRef();
  const inputRef = useRef();
  const map = useRef(null);
  const history = useHistory();

  const [post, setPost] = useState();
  const [address, setAddress] = useState();
  const [isMarked, setMarked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 4,
    };
    map.current = new kakao.maps.Map(containerRef.current, options);
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

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
        setMarked(false);
        setPost({ post, user });
      });
    }

    // Todo 사업자만 가능하도록 설정 user.role - 여기부터
    const marker = new kakao.maps.Marker();
    // 지도에 마커를 표시합니다
    marker.setMap(map.current);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map.current, 'click', function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      searchAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setAddress({
            name: result[0].address_name,
            lat: result[0].y,
            lng: result[0].x,
          });
        }
      });

      // 마커 위치를 클릭한 위치로 옮깁니다
      setCenter(latlng.Ma, latlng.La);
      marker.setPosition(latlng);
      setMarked(true);
    });
    // todo - 여기까지

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }
  }, [posts]);

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.left = '0px';
    }
  }, [post]);

  const setCenter = (lat, lng) => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.current.panTo(moveLatLon);
  };

  const handleClose = () => {
    setPost(null);
  };

  const onSearch = () => {
    const { value } = inputRef.current;
    handleSearch(value);
  };

  const goToUpload = () => {
    history.push({ pathname: '/upload', state: { ...address } });
  };

  return (
    <MapContainer>
      {isOpen && (
        <Modal
          message={`${address?.name}이 맞으신가요?`}
          setIsOpen={setIsOpen}
          callback={goToUpload}
        />
      )}
      <Map ref={containerRef} id="map">
        <SearchForm>
          <Input ref={inputRef} placeholder="검색어를 입력해주세요" />
          <Search onClick={onSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </Search>
        </SearchForm>
        {!isMarked && post && (
          <MapModal
            data={post}
            backgroundRef={backgroundRef}
            handleClose={handleClose}
          />
        )}
        {isMarked && address && (
          <UploadModal>
            <Address>{address.name}</Address>
            <Label>이 주소로 사업지</Label>
            <UploadButton onClick={() => setIsOpen(true)}>
              등록하기
            </UploadButton>
          </UploadModal>
        )}
      </Map>
    </MapContainer>
  );
};

export default KakaoMap;
