import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import { Scroll } from '../styles/common';

const Container = styled.div`
  width: 100%;
  height: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: solid yellow;
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
    width: 280px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .picture {
      width: 180px;
      height: 180px;
      position: relative;
      top: 2.5rem;
      border: solid red;
    }
    .changeImage {
      position: relative;
      top: 3rem;
    }
  }

  .wrapper-2 {
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .nickname {
      line-height: 2.5rem;
      vertical-align: center;
      border: solid 1px blue;
      position: relative;
      top: 5rem;
      width: 14rem;
      height: 2.5rem;
    }
    #nickname {
      position: relative;
      top: 5rem;
      width: 14rem;
      height: 2.5rem;
      font-size: 1.5rem;
    }
    .password {
      line-height: 2.5rem;
      vertical-align: center;
      border: solid 1px blue;
      position: relative;
      top: 7rem;
      width: 14rem;
      height: 2.5rem;
    }
    #password {
      position: relative;
      top: 7rem;
      width: 14rem;
      height: 2.5rem;
      font-size: 1.5rem;
    }
    .edit {
      position: relative;
      top: 9.2rem;
    }
  }

  .wrapper-3 {
    width: 220px;
    height: 400px;
    .closeAccount {
      position: relative;
      top: 14.2rem;
      left: 2rem;
    }
  }
`;

const ContentSection = styled.div`
  position: relative;
  top: 18rem;
  width: 1000px;
  height: 320px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .single-content {
    width: 240px;
    height: 240px;
    border: solid 1px pink;
    padding: 0.2rem;
    .button-wrapper {
      display: flex;
      justify-content: right;
    }
    .description {
      position: relative;
      width: 240px;
      top: 14rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .views {
      position: relative;
      top: 15rem;
      left: 5rem;
    }
    .likes {
      position: relative;
      top: 15.5rem;
      left: 5rem;
    }
  }
`;

const MyPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const scrollRef = useRef();
  const arr = [1, 2, 3, 4];

  const editHandler = () => {
    setIsEdit(true);
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
            <div className="picture">사진</div>
            <button className="changeImage">이미지 변경</button>
          </div>
          <div className="wrapper-2">
            {isEdit === true ? (
              <>
                {/* {placeholder에 표시되고 있던 값 넣기} */}
                <input type="text" id="nickname" placeholder="nickname" />
                <input type="password" id="password" placeholder="password" />
              </>
            ) : (
              <>
                <div className="nickname">닉네임</div>
                <div className="password">비밀번호</div>
              </>
            )}
            <button className="edit" onClick={editHandler}>
              수정하기
            </button>
          </div>
          <div className="wrapper-3">
            <button className="closeAccount">회원탈퇴</button>
          </div>
        </ProfileSection>
        <Header>
          <div className="middle-header">내가 찜한 장소 목록</div>
        </Header>
        <ContentSection>
          {arr.map((item, index) => (
            <div className="single-content" key={index}>
              <div className="button-wrapper">
                <button>삭제</button>
              </div>
              <div className="description">
                fdsafdsafdsafdsafdsafdssafdsafdsa
              </div>
              <div className="views">view: 1</div>
              <div className="likes">❤️123</div>
            </div>
          ))}
        </ContentSection>
      </Container>
    </>
  );
};

export default MyPage;
