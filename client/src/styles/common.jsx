import styled, { createGlobalStyle } from 'styled-components';

export const Color_1 = '#2C73D2';
export const Color_2 = '#95A7DD';
export const Color_3 = '#E5F0FF';
export const Color_4 = 'orangered';
export const Color_5 = '#2a2a2a';
export const Color_6 = '#888';
export const Samlib = 'SDSamliphopangche_Outline';

export const lightTheme = {
  color: Color_3,
  bgColor: 'white',
  navBgColor: Color_1,
};

export const darkTheme = {
  color: Color_6,
  bgColor: Color_5,
  navBgColor: '#1a1a1a',
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
