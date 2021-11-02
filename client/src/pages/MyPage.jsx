import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import { Scroll } from '../styles/common';
import Thumbnail from '../components/Thumbnail';
import { data } from '../dummy/post';
import Modal from '../components/Modal';

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

const ImageGrid = styled.ul`
  position: relative;
  top: 16rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 50%;
  padding: 10px;
`;

const MyPage = ({ user, setUser, setToken }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const [posts, setPosts] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const fileInput = useRef(null);
  const scrollRef = useRef();
  const history = useHistory();
  const { id } = useParams();

  const editHandler = () => {
    setIsEdit(!isEdit);
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
      fd.append('nickname', 'test');
      fd.append('password', '12345678');
      fd.append('img', e.target.files[0]);
      for (let [key, value] of fd.entries()) {
        console.log(key, value);
      }
      axios
        .patch(`http://localhost:8000/user/${id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const modalHandler = () => {
    setIsOpen(true);
  };

  const deleteHandler = () => {
    axios
      .delete('http://localhost:8000/auth/deleteUser', {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.removeItem('token');
        setToken(null);
        history.push('/');
      })
      .catch((err) => console.log(err));
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
              {isEdit === true ? (
                <>
                  {/* {placeholder에 표시되고 있던 값 넣기} */}
                  <div className="email">email</div>
                  <input type="text" id="nickname" placeholder="nickname" />
                  <input type="password" id="password" placeholder="password" />
                  <RadioSection>
                    <input type="radio" id="owner" name="role" value="1" />
                    <div className="owner">사업자</div>
                    <input
                      type="radio"
                      id="user"
                      name="role"
                      value="2"
                      defaultChecked
                    />
                    <div className="user">일반인</div>
                  </RadioSection>
                </>
              ) : (
                <>
                  <div className="email">email</div>
                  <div className="nickname">닉네임</div>
                  <div className="password">비밀번호</div>
                  <RadioSection>
                    <div className="radio-container">
                      <input type="radio" id="owner" name="role" value="1" />
                      <div className="owner">사업자</div>
                      <input
                        type="radio"
                        id="user"
                        name="role"
                        value="2"
                        defaultChecked
                      />
                      <div className="user">일반인</div>
                    </div>
                  </RadioSection>
                </>
              )}
            </div>
            <div className="wrapper-2-2">
              {isEdit === false ? (
                <button className="edit" onClick={editHandler}>
                  수정하기
                </button>
              ) : (
                <button className="edit" onClick={editHandler}>
                  수정 완료
                </button>
              )}
            </div>
          </div>
          <div className="wrapper-3">
            <div className="wrapper-3-1"></div>
            <div className="wrapper-3-2">
              <button className="close-account" onClick={modalHandler}>
                회원탈퇴
              </button>
            </div>
            {isOpen === true ? (
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
        <ImageGrid>
          {posts.map((post) => (
            <Thumbnail thumbnail={post} key={post.post.id} />
          ))}
        </ImageGrid>
      </Container>
    </>
  );
};

export default MyPage;
