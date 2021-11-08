import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Color_2, Hangeul, Logo } from '../styles/common';

const HomeContainer = styled.div`
  flex-grow: 1;
  height: 100%;

  section {
    height: 100vh;
  }

  section:nth-child(1) {
    height: calc(100vh - 70px);
    background-color: ${(props) => props.theme.navBgColor};
  }
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  will-change: transform;
`;

const Section = styled.section`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const SvgDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);

  svg {
    position: relative;
    display: block;
    width: calc(300% + 1.3px);
    height: 160px;
  }

  @media ${({ theme }) => theme.size.mobile} {
    svg {
      height: 80px;
    }
  }
`;

const Path = styled.path`
  fill: #ffffff;
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 80%;
  margin: 0 auto 100px;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.size.mobile} {
    flex-direction: column;
  }
`;

const P = styled.p`
  font-size: 2rem;
  line-height: 1.4;
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.6rem;
  }
`;

const PreView = styled.article`
  width: 50%;
  margin-right: 50px;
  @media ${({ theme }) => theme.size.mobile} {
    width: 80%;
    margin: 0;
    margin-bottom: 30px;
  }
`;

const Button = styled.button`
  display: flex;
  width: 100px;
  height: 40px;
  margin-top: 20px;
  font-family: ${Hangeul};
  font-size: 18px;
  background-color: ${Color_2};
  box-shadow: 0px 0px 3px 0px rgba(255, 255, 255, 0.45);
  -webkit-box-shadow: 0px 0px 3px 0px rgba(255, 255, 255, 0.45);
  border: none;
  border-radius: 6px;
  transition: 0.25s;
  align-items: center;
  justify-content: center;
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.75);
    -webkit-box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.75);
  }
`;

const MainImage = styled.img`
  width: 50%;
  @media ${({ theme }) => theme.size.mobile} {
    width: 80%;
  }
`;

const Home = () => {
  const history = useHistory();
  const scrollRef = useRef();

  const goToMain = () => {
    history.push('/main');
  };

  const Scroll = useCallback(() => {
    console.log(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', Scroll, true);
    return () => window.removeEventListener('scroll', Scroll, true);
  }, [Scroll]);

  return (
    <HomeContainer>
      <Slide ref={scrollRef}>
        <Section>
          <Body>
            <SvgDiv>
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1600 130"
                preserveAspectRatio="none"
              >
                <Path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                />
                <Path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  opacity=".5"
                />
                <Path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
              </svg>
            </SvgDiv>
            <PreView>
              <P>여행지는 많지만,</P>
              <P>마땅한 여행지를 찾기 어려우셨죠?</P>
              <P>TipTalk이 해결해 드리겠습니다!</P>
              <Button onClick={goToMain}>시작하기</Button>
            </PreView>
            <MainImage src={Logo} />
          </Body>
        </Section>
        <Section>
          <h1>2</h1>
        </Section>
        <Section>
          <h1>3</h1>
        </Section>
        <Section>
          <h1>4</h1>
        </Section>
        <Section>
          <h1>5</h1>
        </Section>
      </Slide>
    </HomeContainer>
  );
};

export default Home;
