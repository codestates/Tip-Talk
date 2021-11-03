import axios from 'axios';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import { Scroll } from '../styles/common';
import Thumbnail from '../components/Thumbnail';
import { data } from '../dummy/post';
import Modal from '../components/Modal';
import UserContext from '../context/UserContext';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../styles/common';

const Container = styled.div`
  width: 100%;
  height: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .top-header {
    font-size: 3rem;
    position: relative;
    top: 5rem;
  }
  .middle-header {
    font-size: 3rem;
    position: relative;
    top: 15rem;
  }
`;

const ProfileSection = styled.div`
  width: 800px;
  height: 300px;
  position: relative;
  top: 8rem;
  display: flex;
  flex-direction: row;
  .wrapper-1 {
    .wrapper-1-1 {
      width: 280px;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      .picture {
        width: 180px;
        height: 180px;
        > img {
          width: 180px;
          height: 180px;
        }
      }
    }
    .wrapper-1-2 {
      width: 280px;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      > input {
        display: none;
      }
    }
  }

  .wrapper-2 {
    .wrapper-2-1 {
      width: 280px;
      height: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .email {
        line-height: 2.5rem;
        border: solid 1px blue;
        position: relative;
        top: 1.8rem;
        width: 14rem;
        height: 2.5rem;
      }
      .nickname {
        line-height: 2.5rem;
        border: solid 1px blue;
        position: relative;
        top: 2.4rem;
        width: 14rem;
        height: 2.5rem;
      }
      .password {
        line-height: 2.5rem;
        border: solid 1px blue;
        position: relative;
        top: 3rem;
        width: 14rem;
        height: 2.5rem;
      }
      #nickname {
        position: relative;
        top: 3rem;
        width: 14rem;
        height: 2.5rem;
        font-size: 1.5rem;
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
        text-align: center;
      }
      #password {
        position: relative;
        top: 4rem;
        width: 14rem;
        height: 2.5rem;
        font-size: 1.5rem;
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
        text-align: center;
      }
    }
    .wrapper-2-2 {
      width: 280px;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .wrapper-3 {
    .wrapper-3-1 {
      width: 240px;
      height: 80%;
    }
    .wrapper-3-2 {
      width: 240px;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const RadioSection = styled.div`
  position: relative;
  top: 5rem;
  width: 14rem;
  .owner {
    display: inline-block;
    position: relative;
    right: 1.5rem;
  }
  #owner {
    display: inline-block;
    position: relative;
    right: 2rem;
  }
  .user {
    display: inline-block;
    position: relative;
    left: 1.5rem;
  }
  #user {
    display: inline-block;
    position: relative;
    left: 1rem;
  }
`;

const Carousel = styled.div`
  position: absolute;
  top: 46rem;
  display: flex;
  justify-content: center;
  .carousel-container {
    width: 80%;
    display: flex;
    flex-direction: column;
  }
  .carousel-wrapper {
    width: 100%;
    display: flex;
    position: relative;
  }
  .carousel-content-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .carousel-content {
    display: flex;
    transition: all 250ms linear;
      transform: translateX(-${(props) =>
        props.currentIndex * (400 / props.show)}%);
      transition: !transitionEnabled ? 'none' : undefined;
  }
  .carousel-content::-webkit-scrollbar {
    display: none;
  }
  .carousel-content > * {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
  }
  .left-arrow {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: white;
    border: 1px solid #ddd;
    left: 24px;
  }
  .right-arrow {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: white;
    border: 1px solid #ddd;
    right: 24px;
  }
  .carousel-content {
    width: 50%;
    &.show-2 > * {
      width: 50%;
    }
  }
  .carousel-content {
    width: clac(100% / 3);
    &.show-3 > * {
      width: clac(100% / 3);
    }
  }
  .carousel-content {
    width: calc(93% / 4);
    &.show-4 > * {
      width: calc(93% / 4);
    }
  }
`;

const Background = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 380px;
  height: 160px;
  padding: 20px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.55);
  align-items: center;
  animation: 0.15s scale;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 0;
  color: ${({ theme }) => theme.color};
  font-size: 20px;
  border: none;
  background-color: transparent;
`;

const Message = styled.span`
  margin: 20px 0;
  font-size: 20px;
`;

const MyPage = ({ setToken }) => {
  const show = 3;
  const infiniteLoop = true;
  const [editStart, setEditStart] = useState(false);
  const [editDone, setEditDone] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const [posts, setPosts] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState(null);
  const [password, setPassword] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(posts.length);
  const [isRepeating, setIsRepeating] = useState(
    infiniteLoop && posts.length > show,
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const fileInput = useRef(null);
  const scrollRef = useRef();
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    setLength(posts.length);
    setIsRepeating(infiniteLoop && posts.length > show);
  }, [posts, infiniteLoop, show]);

  useEffect(() => {
    if (isRepeating === true) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true);
      }
    }
  }, [currentIndex, isRepeating, show, length]);

  useEffect(() => {
    if (user) {
      if (user.role === 1) {
        document.getElementById('owner').checked = true;
      } else if (user.role === 2) {
        document.getElementById('user').checked = true;
      }
    }

    if (editStart === true) {
      const role = document.querySelector('input[name=role]:checked').value;
      if (role === 1) {
        document.getElementById('owner').checked = true;
      } else if (role === 2) {
        document.getElementById('user').checked = true;
      }
    }
  }, [user, editStart]);

  console.log('user = ', user);

  const editStartHandler = () => {
    setEditStart(true);
  };

  const editDoneHandler = () => {
    setEditDone(true);
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setEditStart(false);
    setIsOpen(false);
  };

  const fileHandler = (e) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImageBase64(base64.toString());
      }
    };

    if (e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);

      const fd = new FormData();
      fd.append('img', e.target.files[0]);
      for (let [key, value] of fd.entries()) {
        console.log(key, value);
      }
      axios
        .patch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const modalHandler = () => {
    setIsOpen(true);
    setIsClose(true);
  };

  const deleteHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/auth/deleteUser`, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.removeItem('token');
        setToken(null);
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  const nicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = () => {
    const role = document.querySelector('input[name=role]:checked').value;
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, {
        nickname,
        password,
        role,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const next = () => {
    if (isRepeating || currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(length);
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false);
        setCurrentIndex(show);
      }
    }
  };

  const renderExtraPrev = () => {
    let output = [];
    for (let index = 0; index < show; index++) {
      output.push(posts[length - 1 - index]);
    }
    output.reverse();
    return output.post;
  };

  const renderExtraNext = () => {
    let output = [];
    for (let index = 0; index < show; index++) {
      output.push(posts[index]);
    }
    return output.post;
  };

  return (
    <>
      <Scroll ref={scrollRef} />
      <Coin scrollRef={scrollRef} mode="up" right="40px" bottom="200px" />
      <Container>
        <Header>
          <div className="top-header">마이페이지</div>
        </Header>
        <ProfileSection>
          <div className="wrapper-1">
            <div className="wrapper-1-1">
              <div className="picture">
                <img src={imageBase64} />
              </div>
            </div>
            <div className="wrapper-1-2">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                ref={fileInput}
                onChange={fileHandler}
              />
              <button
                className="change-image"
                onClick={() => fileInput.current.click()}
              >
                이미지 변경
              </button>
            </div>
          </div>
          <div className="wrapper-2">
            <div className="wrapper-2-1">
              {editStart === true ? (
                <>
                  <div className="email">{user?.email}</div>
                  <input
                    type="text"
                    id="nickname"
                    placeholder="nickname"
                    onChange={nicknameHandler}
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder="password"
                    onChange={passwordHandler}
                  />
                  <RadioSection>
                    <input type="radio" id="owner" name="role" value="1" />
                    <div className="owner">사업자</div>
                    <input type="radio" id="user" name="role" value="2" />
                    <div className="user">일반인</div>
                  </RadioSection>
                </>
              ) : (
                <>
                  <div className="email">{user?.email}</div>
                  <div className="nickname">{user?.nickname}</div>
                  {/* <div className="password">비밀번호</div> */}
                  <RadioSection>
                    <div className="radio-container">
                      <input type="radio" id="owner" name="role" value="1" />
                      <div className="owner">사업자</div>
                      <input type="radio" id="user" name="role" value="2" />
                      <div className="user">일반인</div>
                    </div>
                  </RadioSection>
                </>
              )}
            </div>
            <div className="wrapper-2-2">
              {editStart === false ? (
                <button className="edit" onClick={editStartHandler}>
                  수정하기
                </button>
              ) : (
                <button
                  className="edit"
                  onClick={() => [editDoneHandler(), submitHandler()]}
                >
                  수정 완료
                </button>
              )}
              {editDone === true && isOpen === true ? (
                <Background>
                  <ModalContainer>
                    <CloseButton>
                      <FontAwesomeIcon icon={faTimes} />
                    </CloseButton>
                    <Message>정상적으로 수정되었습니다</Message>
                    <div>
                      <Button
                        width="80px"
                        margin="3px"
                        onClick={closeModalHandler}
                      >
                        확인
                      </Button>
                    </div>
                  </ModalContainer>
                </Background>
              ) : null}
            </div>
          </div>
          <div className="wrapper-3">
            <div className="wrapper-3-1"></div>
            <div className="wrapper-3-2">
              <button className="close-account" onClick={modalHandler}>
                회원탈퇴
              </button>
            </div>
            {isOpen === true && isClose === true ? (
              <Modal
                message={'탈퇴하시겠습니까?'}
                setIsOpen={setIsOpen}
                callback={deleteHandler}
              />
            ) : null}
          </div>
        </ProfileSection>
        <Header>
          <div className="middle-header">내가 찜한 장소 목록</div>
        </Header>
        <Carousel currentIndex={currentIndex} show={show}>
          <div className="carousel-container">
            <div className="carousel-wrapper">
              {(isRepeating || currentIndex > 0) && (
                <button className="left-arrow" onClick={prev}>
                  &lt;
                </button>
              )}
              <div className="carousel-content-wrapper">
                <div
                  className={`carousel-content show-${show}`}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {length > show && isRepeating && renderExtraPrev()}
                  {posts.map((post) => (
                    <Thumbnail thumbnail={post} key={post.id} />
                  ))}
                  {length > show && isRepeating && renderExtraNext()}
                </div>
              </div>
              {(isRepeating || currentIndex < length - show) && (
                <button className="right-arrow" onClick={next}>
                  &gt;
                </button>
              )}
            </div>
          </div>
        </Carousel>
      </Container>
    </>
  );
};

export default MyPage;
