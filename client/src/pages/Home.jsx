import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Coin } from '../components/Coin';
import Loading from '../components/Loading';
import { Button, Color_6 } from '../styles/common';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  section {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  section:nth-child(2) {
    background-color: rgba(0, 0, 0, 0.02);
    @media ${({ theme }) => theme.size.mobileL} {
      article {
        top: 10%;
      }
    }
  }
  section:nth-child(3) {
    @media ${({ theme }) => theme.size.mobileL} {
      article {
        top: 6%;
      }
    }
  }
  section:nth-child(4) {
    background-color: rgba(0, 0, 255, 0.02);
    @media ${({ theme }) => theme.size.mobileL} {
      article {
        top: 65%;
      }
    }
  }
  section:nth-child(5) {
    background-color: rgba(255, 0, 0, 0.03);
    @media ${({ theme }) => theme.size.mobileL} {
      article {
        top: 10%;
      }
    }
  }
`;

const Section = styled.section`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Fat = styled.h1`
  font-size: 5rem;
  line-height: 1.4;
  color: #00693d;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  margin-right: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 3rem;
  }
`;

const P = styled.p`
  font-size: ${({ size }) => (size ? size : '2.6rem')};
  color: #00693d;
  line-height: 1.4;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.8rem;
  }
  @media ${({ theme }) => theme.size.small} {
    font-size: 1.6rem;
  }
`;

const S = styled.p`
  font-size: 1.3rem;
  color: ${({ inherit, theme }) => (inherit ? theme.color : Color_6)};
  line-height: 1.4;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media ${({ theme }) => theme.size.small} {
    font-size: 1rem;
  }
`;

const Message = styled.article`
  position: absolute;
  left: 12%;
  top: ${({ top }) => top};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media ${({ theme }) => theme.size.tabletL} {
    left: 10%;
  }
  @media ${({ theme }) => theme.size.mobile} {
    left: 7%;
  }
`;

const Img = styled.img`
  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  width: ${({ size }) => (size ? size : '100vw')};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: -1;
  @media ${({ theme }) => theme.size.mobile} {
    width: ${({ size }) => (size ? size : '800px')};
  }
`;

const Home = () => {
  const history = useHistory();
  const scrollRef = useRef();
  const [loading, setLoading] = useState(true);

  const goToMain = () => {
    history.push('/main');
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const eventPrevent = (e) => {
    e.preventDefault();
  };

  return (
    <HomeContainer ref={scrollRef}>
      {loading && <Loading />}
      <Coin scrollRef={scrollRef} mode="up" right="40px" bottom="110px" />
      <Section onContextMenu={eventPrevent}>
        <Img src="https://drawit.s3.ap-northeast-2.amazonaws.com/tiptalk/section1.png" />
        <Message top="20%">
          <Fat>TIP TALK</Fat>
          <br />
          <S inherit="true" size="1.3rem">
            ?????? ?????? ????????? ?????????
          </S>
          <S inherit="true" size="1.3rem">
            ????????? ?????????
          </S>
          <S inherit="true" size="1.3rem">
            ????????? ????????? ??????????????????
          </S>
          <Button
            width="180px"
            height="52px"
            margin="30px 15px"
            onClick={goToMain}
          >
            ????????????
          </Button>
        </Message>
      </Section>
      <Section onContextMenu={eventPrevent}>
        <Img
          onContextMenu={eventPrevent}
          src="https://drawit.s3.ap-northeast-2.amazonaws.com/tiptalk/section3-2.png"
        />
        <Message top="15%">
          <P>????????? ???????????? ????????????</P>
          <P>?????? ????????? ?????? ?????????</P>
          <P>????????? ??? ?????????</P>
          <br />
          <S>?????????????????? ???????????? ?????? ?????????</S>
          <S>????????? ??? ?????????</S>
          <Img
            top="120%"
            left="-5%"
            size="420px"
            src="https://drawit.s3.ap-northeast-2.amazonaws.com/tiptalk/section3-1.png"
          />
        </Message>
      </Section>
      <Section onContextMenu={eventPrevent}>
        <Img src="https://drawit.s3.ap-northeast-2.amazonaws.com/tiptalk/section2.png" />
        <Message top="40%">
          <P>????????? ?????? ?????????</P>
          <P>???????????? ????????? ???????????????</P>
          <br />
          <S>????????? ???????????? ?????? ????????? ??????</S>
          <S>??? ????????? ???????????? ??? ?????????</S>
        </Message>
      </Section>
      <Section onContextMenu={eventPrevent}>
        <Img src="https://drawit.s3.ap-northeast-2.amazonaws.com/tiptalk/section4.png" />
        <Message top="20%">
          <P>???????????? ????????? ????????????</P>
          <P>????????? ??? ?????????</P>
          <br />
          <S>????????? ????????? ?????????</S>
          <S>???????????? ????????? ????????????</S>
          <S>???????????????</S>
        </Message>
      </Section>
    </HomeContainer>
  );
};

export default Home;
