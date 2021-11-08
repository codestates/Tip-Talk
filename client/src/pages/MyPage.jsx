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
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../styles/common';

const Container = styled.div`
  width: 100%;
  height: ${(props) => (props.role === 1 ? 1600 + 'px' : 1100 + 'px')};
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
  .bottom-header {
    font-size: 3rem;
    position: relative;
    top: 43rem;
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
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        width: 180px;
        height: 180px;
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
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .email-div {
        line-height: 2.5rem;
        border: solid 1px blue;
        position: relative;
        top: 4rem;
        width: 14rem;
        height: 2.5rem;
      }
      .nickname-div {
        line-height: 2.5rem;
        border: solid 1px blue;
        position: relative;
        top: 5rem;
        width: 14rem;
        height: 2.5rem;
      }
      .password-div {
        line-height: 2.5rem;
        border: solid 1px blue;
        position: relative;
        top: 4rem;
        width: 14rem;
        height: 2.5rem;
      }
      #nickname-input {
        position: relative;
        top: 5rem;
        width: 14rem;
        height: 2.5rem;
        font-size: 1.5rem;
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
        text-align: center;
      }
      #password-input {
        position: relative;
        top: 5.5rem;
        width: 14rem;
        height: 2.5rem;
        font-size: 1.5rem;
        border-top: none;
        border-left: none;
        border-right: none;
        outline: none;
        text-align: center;
      }
      #old-password-input {
        position: relative;
        top: 4.5rem;
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
      height: 100%;
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
  top: 6.5rem;
  width: 14rem;
  .owner-div {
    display: inline-block;
    position: relative;
    right: 1.5rem;
  }
  #owner-radio {
    display: inline-block;
    position: relative;
    right: 2rem;
  }
  .user-div {
    display: inline-block;
    position: relative;
    left: 1.5rem;
  }
  #user-radio {
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
  align-items: center;
  height: 40%;
  .carousel-container {
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .carousel-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .carousel-content-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .carousel-content {
    display: flex;
    transition: all 250ms linear;
    transform: translateX(
      -${(props) => props.currentIndex * (430 / props.show)}%
    );
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
    width: calc(92% / ${(props) => props.show});
  }
`;

const MyPage = () => {
  const show = 4;
  const [editStart, setEditStart] = useState(false);
  const [editDone, setEditDone] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [posts, setPosts] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState(null);
  const [password, setPassword] = useState(null);
  const [oldpassword, setOldpassword] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLength, setImageLength] = useState(posts.length);
  const [passwordLength, setPasswordLength] = useState(true);
  const [stilEdit, setStilEdit] = useState(true);
  const fileInput = useRef(null);
  const scrollRef = useRef();
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useContext(UserContext);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setImageLength(posts.length);
  }, [posts]);

  useEffect(() => {
    if (user) {
      const { role } = user;
      if (role === 1) {
        document.getElementById('owner-radio').checked = true;
      } else if (role === 2) {
        document.getElementById('user-radio').checked = true;
      }
    }

    if (editStart === true) {
      const role = document.querySelector('input[name=role2]:checked').value;
      if (role === 1) {
        document.getElementById('owner-radio').checked = true;
      } else if (role === 2) {
        document.getElementById('user-radio').checked = true;
      }
    }
  }, [user, editStart]);

  useEffect(() => {
    setIsClose(false);
  }, [editDone]);

  useEffect(() => {
    if (user) {
      const { img } = user;
      setImage(img);
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((res) => {
        const { data } = res.data;
        setUser(data);
        setImage(data.img);
      })
      .catch((err) => console.log(err));
  }, []);

  const editStartHandler = () => {
    setEditStart(true);
  };

  const editDoneHandler = () => {
    setEditDone(true);
    setIsOpen(true);
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

      axios
        .patch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          const { img } = res.data;
          setImage(img);
        })
        .catch((err) => console.log(err));
    }
  };

  const modalOpenHandler = () => {
    setIsOpen(true);
    setIsClose(true);
  };

  const modalCloseHandler = () => {
    setIsOpen(false);
    setEditStart(false);
  };

  const passwordModalCloseHandler = () => {
    setPasswordLength(true);
  };

  const passwordMatchModalCloseHandler = () => {
    setPasswordMatch(true);
    setPasswordLength(true);
  };

  const deleteHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/auth/deleteUser`, {
        withCredentials: true,
      })
      .then((res) => {
        history.push('/');
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  const nicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const oldPasswordHandler = (e) => {
    setOldpassword(e.target.value);
  };

  const submitHandler = () => {
    const role = document.querySelector('input[name=role2]:checked').value;
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, {
        nickname,
        oldpassword,
        password,
        role,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.response.data.message === '비밀번호를 확인해주세요') {
          setPasswordMatch(false);
          setEditDone(false);
          setIsOpen(false);
        }
      });
  };

  const next = () => {
    if (currentIndex < imageLength - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const passwordLengthCheck = () => {
    if (password) {
      if (password.length >= 8) {
        setPasswordLength(true);
        editDoneHandler();
      } else {
        setPasswordLength(false);
      }
    }
  };

  return (
    <>
      <Scroll ref={scrollRef} />
      <Coin scrollRef={scrollRef} mode="up" right="40px" bottom="110px" />
      <Container>
        <Header>
          <div className="top-header">마이페이지</div>
        </Header>
        <ProfileSection>
          <div className="wrapper-1">
            <div className="wrapper-1-1">
              {image ? (
                <img src={image} />
              ) : imageBase64 ? (
                <img src={imageBase64} />
              ) : (
                <FontAwesomeIcon icon={faUser} size="10x" />
              )}
            </div>
            <div className="wrapper-1-2">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                ref={fileInput}
                onChange={fileHandler}
              />
              <Button onClick={() => fileInput.current.click()}>
                이미지 변경
              </Button>
            </div>
          </div>
          <div className="wrapper-2">
            <div className="wrapper-2-1">
              {editStart === true && stilEdit === true ? (
                user?.platform === 0 ? (
                  <>
                    <div className="email-div">{user?.email}</div>
                    <input
                      type="password"
                      id="old-password-input"
                      placeholder="old password"
                      onChange={oldPasswordHandler}
                    />
                    <input
                      type="text"
                      id="nickname-input"
                      placeholder="new nickname"
                      onChange={nicknameHandler}
                    />
                    <input
                      type="password"
                      id="password-input"
                      placeholder="new password"
                      onChange={passwordHandler}
                    />
                    <RadioSection>
                      <input
                        type="radio"
                        id="owner-radio"
                        name="role2"
                        value="1"
                      />
                      <div className="owner-div">사업자</div>
                      <input
                        type="radio"
                        id="user-radio"
                        name="role2"
                        value="2"
                      />
                      <div className="user-div">일반인</div>
                    </RadioSection>
                  </>
                ) : (
                  <>
                    <div className="email-div">{user?.email}</div>
                    <input
                      type="text"
                      id="nickname-input"
                      placeholder="new nickname"
                      onChange={nicknameHandler}
                    />
                    <RadioSection>
                      <input
                        type="radio"
                        id="owner-radio"
                        name="role2"
                        value="1"
                      />
                      <div className="owner-div">사업자</div>
                      <input
                        type="radio"
                        id="user-radio"
                        name="role2"
                        value="2"
                      />
                      <div className="user-div">일반인</div>
                    </RadioSection>
                  </>
                )
              ) : (
                <>
                  <div className="email-div">{user?.email}</div>
                  <div className="nickname-div">{user?.nickname}</div>
                  <RadioSection>
                    <div className="radio-container">
                      <input
                        type="radio"
                        id="owner-radio"
                        name="role1"
                        value="1"
                      />
                      <div className="owner-div">사업자</div>
                      <input
                        type="radio"
                        id="user-radio"
                        name="role1"
                        value="2"
                      />
                      <div className="user-div">일반인</div>
                    </div>
                  </RadioSection>
                </>
              )}
            </div>
            <div className="wrapper-2-2">
              {editStart === false ? (
                <Button className="edit" onClick={editStartHandler}>
                  수정하기
                </Button>
              ) : (
                <Button
                  className="edit"
                  onClick={() => [passwordLengthCheck(), submitHandler()]}
                >
                  수정 완료
                </Button>
              )}
              {console.log('isOpen = ' + isOpen)}
              {console.log('editDone = ' + editDone)}
              {isOpen === true && editDone === true ? (
                <Modal
                  message={'정상적으로 수정되었습니다'}
                  setIsOpen={setIsOpen}
                  withoutNo={true}
                />
              ) : null}
              {passwordLength === true ? null : (
                <Modal
                  message={'비밀번호는 8자리 이상이어야 합니다'}
                  setIsOpen={setIsOpen}
                  withoutNo={true}
                />
              )}
              {passwordMatch === true ? null : (
                <Modal
                  message={'예전 비밀번호가 일치하지 않습니다'}
                  setIsOpen={setIsOpen}
                  withoutNo={true}
                />
              )}
            </div>
          </div>
          <div className="wrapper-3">
            <div className="wrapper-3-1"></div>
            <div className="wrapper-3-2">
              <Button className="close-account" onClick={modalOpenHandler}>
                회원탈퇴
              </Button>
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
              {currentIndex > 0 && (
                <button className="left-arrow" onClick={prev}>
                  &lt;
                </button>
              )}
              <div className="carousel-content-wrapper">
                <div className={'carousel-content'}>
                  {posts.map((post) => (
                    <Thumbnail thumbnail={post} key={post.id} />
                  ))}
                </div>
              </div>
              {currentIndex < imageLength - show && (
                <button className="right-arrow" onClick={next}>
                  &gt;
                </button>
              )}
            </div>
          </div>
        </Carousel>
        {user?.role === 1 ? (
          <Header role={1}>
            <div className="bottom-header">내가 등록한 장소</div>
          </Header>
        ) : null}
      </Container>
    </>
  );
};

export default MyPage;
