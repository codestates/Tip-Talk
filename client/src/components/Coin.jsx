import {
  faArrowUp,
  faMoon,
  faReply,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Color_4 } from '../styles/common';

const CoinForm = styled.div`
  display: flex;
  position: absolute;
  color: white;
  top: ${({ position }) => (position.bottom ? 'none' : '150px')};
  bottom: ${({ position }) => (position.bottom ? position.bottom : 'none')};
  left: ${({ position }) => (position.right ? 'none' : '40px')};
  right: ${({ position }) => (position.right ? position.right : 'none')};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${Color_4};
  justify-content: center;
  align-items: center;
  z-index: 10;
  :hover {
    cursor: pointer;
  }
`;

export const Coin = ({ mode, darkMode, setDarkMode, ...position }) => {
  const getStyle = () => {
    switch (mode) {
      case 'reply':
        return faReply;
      case 'up':
        return faArrowUp;
      case 'light':
        return darkMode ? faSun : faMoon;
      default:
        return faArrowUp;
    }
  };

  const handleEvent = () => {
    switch (mode) {
      case 'reply':
        break;
      case 'up':
        break;
      case 'light':
        console.log('ddd');
        if (darkMode) {
          localStorage.removeItem('darkmode');
        } else {
          localStorage.setItem('darkmode', !darkMode);
        }
        setDarkMode(!darkMode);
        break;
      default:
        break;
    }
  };

  return (
    <CoinForm position={position} onClick={handleEvent}>
      <FontAwesomeIcon size="lg" icon={getStyle()} />
    </CoinForm>
  );
};
