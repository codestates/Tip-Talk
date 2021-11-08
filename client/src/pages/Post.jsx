import React, {
  useCallback,
  useContext,
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
import { useParams, useHistory } from 'react-router';
import Carousel from '../components/Carousel';
import { kakao } from '../App';
import Comments from '../components/Comments';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { EditorForm, Element, Leaf } from '../components/TextEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import UserContext from '../context/UserContext';

const PostContainer = styled.article`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1600px;
  min-height: 600px;
  padding: 50px;
  @media ${({ theme }) => theme.size.tablet} {
    flex-direction: column;
    padding: 50px 10px;
    justify-content: center;
    align-items: center;
  }
`;

export const Column = styled.div`
  display: flex;
  width: 50%;
  margin: 0 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.size.tablet} {
    width: 70%;
  }
  @media ${({ theme }) => theme.size.mobile} {
    width: 90%;
  }
  @media ${({ theme }) => theme.size.mobileS} {
    width: 100%;
  }
`;

export const CarouselContainer = styled.div`
  width: 100%;
  height: 600px;
  margin-bottom: 20px;
  @media ${({ theme }) => theme.size.tablet} {
    height: 620px;
  }
  @media ${({ theme }) => theme.size.mobile} {
    height: 540px;
  }
  @media ${({ theme }) => theme.size.mobileS} {
    height: 380px;
  }
`;

const CustomMeta = styled(Meta)`
  width: 100%;
`;

const EditButton = styled.button`
  position: absolute;
  right: 10px;
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: ${Color_4};
  border: none;
  background-color: transparent;
`;

const Map = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 8px;
  margin: 20px 0;
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
  .container:hover {
    cursor: pointer;
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

const TextEditor = styled(EditorForm)`
  margin-bottom: 20px;
`;

const Post = () => {
  const map = useRef();
  const scrollRef = useRef();
  const history = useHistory();

  const [current, setCurrent] = useState(0);
  const [pages, setPages] = useState([1]);
  const [post, setPost] = useState();
  const [value, setValue] = useState();
  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLikeOpen, setIsLikeOpen] = useState(false);
  const { postId } = useParams();
  const [user] = useContext(UserContext);

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    const MapContainer = document.getElementById('map');

    const center = new kakao.maps.LatLng(0, 0);

    const option = {
      center,
      level: 3,
    };

    map.current = new kakao.maps.Map(MapContainer, option);
  }, []);

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

          const lat = posts.lat;
          const lng = posts.lng;

          const center = new kakao.maps.LatLng(+lat, +lng);

          const marker = new kakao.maps.Marker({
            position: center,
          });

          marker.setMap(map.current);

          axios
            .get(`${process.env.REACT_APP_SERVER_URL}/post/around/${postId}`, {
              params: { lat, lng },
            })
            .then(({ data }) => {
              if (data.status && data.data.posts.length) {
                const { posts } = data.data;
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
        <span class="title">${post.title}</span>
      </div>
    </div>`;

      const overlay = new kakao.maps.CustomOverlay({
        content,
        map: map.current,
        position: newMarker.getPosition(),
        yAnchor: 0,
      });

      overlay.setVisible(null);

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(newMarker, 'click', function () {
        if (overlay.getVisible()) {
          overlay.setVisible(null);
        } else {
          overlay.setVisible(map.current);
        }
      });

      overlay.a.onclick = () => setIsOpen({ id: post.id, title: post.title });
    }
  }, [postId]);

  useEffect(() => {
    if (current !== null) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/comment/${postId}?page=${current}`,
        )
        .then(({ data }) => {
          if (data.data) {
            data.data.forEach((comment) => {
              parseDate(comment);
            });
            setComments(data.data);
            const page = [];
            for (let i = 0; i <= data.max; i++) {
              page.push(i + 1);
            }
            setPages(page);
          }
        });
    }
  }, [current, postId]);

  const parseDate = (comment) => {
    comment.updatedAt = new Date(comment.updatedAt)
      .toLocaleDateString()
      .replaceAll('.', '')
      .split(' ');
    comment.updatedAt = `${comment.updatedAt[1]}월 ${comment.updatedAt[2]}일`;
  };

  const handleLike = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/like/${postId}`)
      .then(({ data }) => {
        if (data.status) {
          setPost({ ...post, isLike: !post.isLike });
        }
      });
  };

  const handleSubmit = (text) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/comment/${postId}`, { text })
      .then(({ data }) => {
        if (data.status) {
          setCurrent(null);
          setCurrent(0);
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
        setCurrent(null);
        setCurrent(0);
        setComments([...filtered]);
      });
  };

  const goToPost = (id) => {
    scrollRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'start',
      inline: 'nearest',
    });
    history.push(`/loading`);
    setTimeout(() => {
      history.replace(`/post/${id}`);
    }, 2000);
  };

  const callback = () => {
    if (user) {
      handleLike();
    }
  };

  const ChangePage = (page) => {
    setCurrent(page);
  };

  const getPages = (pages) => {
    if (current < 4) {
      return pages.slice(0, 5);
    } else if (current + 5 > pages.length) {
      return pages.slice(pages.length - 5, pages.length);
    } else {
      return pages.slice(current - 3, current + 2);
    }
  };

  const goToEdit = () => {
    history.push(`/edit/${post.id}`);
  };

  return (
    <Body ref={scrollRef}>
      {isOpen && (
        <Modal
          message={`${isOpen.title} 보러 가시겠어요?`}
          setIsOpen={setIsOpen}
          callback={() => goToPost(isOpen.id)}
        />
      )}
      {isLikeOpen && (
        <Modal
          message={
            user
              ? `${post.title}${
                  post.isLike
                    ? ' 찜 목록에서 삭제하시겠어요?'
                    : ' 찜 목록에 추가하시겠어요?'
                }`
              : '로그인이 필요합니다!'
          }
          setIsOpen={setIsLikeOpen}
          callback={() => callback()}
        />
      )}
      <PostContainer>
        <Column>
          <CustomMeta>
            {user?.id === post?.userId && (
              <EditButton onClick={goToEdit}>
                <FontAwesomeIcon className="icon" icon={faEdit} />
              </EditButton>
            )}
            <div>
              <Label>상호명</Label>
              <Text size="24px">{post?.title}</Text>
            </div>
          </CustomMeta>
          <CustomMeta>
            <div>
              <Label>카테고리</Label>
              <Text>{post?.category?.value}</Text>
              <Label>주소</Label>
              <Text>{post?.region}</Text>
            </div>
            <div>
              <Label>조회수</Label>
              <Text>{post?.views}</Text>
              <Label>좋아요</Label>
              <Text>{post?.likes}</Text>
            </div>
          </CustomMeta>
          <CarouselContainer>
            <Carousel images={post?.images} />
          </CarouselContainer>
          <Info>{post?.title} 주변엔 어떤 것이 있나요?</Info>
          <Map id="map" />
          <LikeForm>
            <LikeButton
              isLike={post?.isLike}
              onClick={() => setIsLikeOpen(true)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </LikeButton>
          </LikeForm>
        </Column>
        <Column>
          <Info>{post?.title} 소개</Info>
          <TextEditor>
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
          </TextEditor>
          <Info>댓글</Info>
          <Comments
            comments={comments}
            handleSubmit={handleSubmit}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            ChangePage={ChangePage}
            pages={getPages(pages)}
            current={current}
          />
        </Column>
      </PostContainer>
    </Body>
  );
};

export default Post;
