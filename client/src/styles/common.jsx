import styled, { createGlobalStyle } from 'styled-components';

export const Color_1 = '#2C73D2';
export const Color_2 = '#fac125';
export const Color_3 = '#E5F0FF';
export const Color_4 = '#ff6e3a';
export const Color_5 = '#2a2a2a';
export const Color_6 = '#888';
export const Color_7 = '#1a1a1a';
export const Samlib = 'SDSamliphopangche_Outline';

export const lightTheme = {
  color: Color_5,
  navColor: Color_3,
  bgColor: 'white',
  navBgColor: Color_1,
  line: 'rgba(0, 0, 0, 0.2)',
};

export const darkTheme = {
  color: Color_6,
  navColor: '#3a3a3a',
  bgColor: Color_5,
  navBgColor: Color_7,
  line: 'rgba(255, 255, 255, 0.4)',
};

export const Body = styled.div`
  width: 100%;
  max-width: 1000px;
  flex: 1 1 0;
  margin: 0 auto;
  padding: 80px 0;
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
  font-size: 26px;
  color: ${(props) => props.theme.color};
`;

export const Meta = styled.div`
  display: flex;
  margin: 20px 0;
  margin-bottom: 35px;
  padding: 10px 45px;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 6px;
  justify-content: space-between;
`;

export const Label = styled.div`
  font-size: 14px;
  margin: 6px 0;
  margin-top: 20px;
  font-weight: 500;
  padding-bottom: 3px;
  border-bottom: 1px solid ${({ theme }) => theme.line};
`;

export const Text = styled.div`
  font-size: ${({ size }) => (size ? size : '18px')};
  font-weight: 500;
  margin-left: 20px;
  margin-bottom: 20px;
`;
