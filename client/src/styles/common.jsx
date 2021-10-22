import styled, { createGlobalStyle } from 'styled-components';

export const Color_1 = '#2C73D2';
export const Color_2 = '#D5A419';
export const Color_3 = '#E5F0FF';
export const Color_4 = 'orangered';
export const Color_5 = '#2a2a2a';
export const Color_6 = '#888';
export const Color_7 = '#1a1a1a';
export const Samlib = 'SDSamliphopangche_Outline';

export const lightTheme = {
  color: Color_5,
  navColor: Color_3,
  bgColor: 'white',
  navBgColor: Color_1,
};

export const darkTheme = {
  color: Color_6,
  navColor: '#777',
  bgColor: Color_5,
  navBgColor: Color_7,
};

export const Body = styled.div`
  width: 100%;
  max-width: 1000px;
  flex: 1 1 0;
  margin: 0 auto;
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
