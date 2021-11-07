import styled, { createGlobalStyle } from 'styled-components';

export const Color_1 = '#8cbeff';
export const Color_2 = '#fac125';
export const Color_3 = '#E5F0FF';
export const Color_4 = '#ff6e3a';
export const Color_5 = '#2a2a2a';
export const Color_6 = '#888';
export const Color_7 = '#1a1a1a';
export const Samlib = 'Pretendard-Regular';
export const Hangeul = 'Pretendard-Regular';
export const Logo = 'https://drawit.s3.ap-northeast-2.amazonaws.com/Logo.png';

const size = {
  mobileS: `(max-width: 500px)`,
  mobile: `(max-width: 770px)`,
  desktop: `(max-width: 1700px)`,
};

export const lightTheme = {
  color: Color_5,
  navColor: Color_3,
  bgColor: 'white',
  navBgColor: Color_1,
  line: 'rgba(0, 0, 0, 0.2)',
  active: '#555',
  toolBar: Color_2,
  size,
};

export const darkTheme = {
  color: Color_6,
  navColor: '#3a3a3a',
  bgColor: Color_5,
  navBgColor: Color_7,
  line: 'rgba(255, 255, 255, 0.4)',
  active: Color_6,
  toolBar: Color_5,
  size,
};

export const Body = styled.div`
  width: 100%;
  max-width: 1000px;
  flex: 1 1 0;
  margin: 0 auto;
  padding: 35px 0 60px;
`;

export const GlobalStyle = createGlobalStyle`
  body{
    color: ${(props) => props.theme.color};
    background-color: ${(props) => props.theme.bgColor};
  }
`;

export const Scroll = styled.div`
  position: absolute;
  top: 0;
`;

export const Title = styled.h1`
  margin: 15px;
  font-size: 38px;
  color: ${(props) => props.theme.color};
  @media ${({ theme }) => theme.size.mobile} {
    font-size: 28px;
  }
`;

export const Meta = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 35px;
  padding: 10px 45px;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 6px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  justify-content: space-between;

  @media ${({ theme }) => theme.size.mobile} {
    padding: 0 15px;
  }
`;

export const Label = styled.div`
  font-size: 13px;
  margin: 6px 0;
  margin-top: 20px;
  font-weight: 500;
`;

export const Text = styled.div`
  font-size: ${({ size }) => (size ? size : '18px')};
  font-weight: 500;
  margin-left: 5px;
  margin-bottom: 20px;
`;

export const Info = styled.h3`
  font-size: 24px;
  font-weight: 500;
  padding: 10px 3px;
  margin: 30px 15px;
  margin-right: auto;
  border-bottom: 1px solid ${({ theme }) => theme.line};
`;

export const Button = styled.button`
  width: ${({ width }) => (width ? width : '140px')};
  height: ${({ height }) => (height ? height : '40px')};
  border: none;
  border-radius: 4px;
  font-family: ${Hangeul};
  font-size: 18px;
  font-weight: 600;
  margin: ${({ margin }) => margin};
  color: ${Color_3};
  background-color: ${({ theme }) => theme.navBgColor};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  transition: 0.1s;
  &:hover {
    color: ${({ theme }) => theme.navBgColor};
    background-color: ${Color_3};
  }
`;
