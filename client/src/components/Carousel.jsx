import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Color_6 } from '../styles/common';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const Slide = styled.div`
  display: flex;
  width: 100%;
  height: 600px;
  white-space: nowrap;
  will-change: transform;
  user-select: none;
`;

const Image = styled.img`
  width: 100%;
  height: 600px;
`;

const StepForm = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  bottom: 20px;
  justify-content: center;
  z-index: 11;
`;

const Step = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 5px;
  background-color: ${({ current }) => (current ? 'white' : Color_6)};
  border-radius: 50%;
`;

const Button = styled.button`
  position: absolute;
  top: 300px;
  right: ${({ right }) => right};
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 50%;
  color: white;
  background-color: transparent;
  z-index: 10;
`;

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.style.transition = 'all 0.5s ease-in-out';
    scrollRef.current.style.transform = `translate(-${current}00%)`;
  }, [current]);

  const handlePrevScroll = () => {
    if (current <= 0) {
      setCurrent(images?.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  const handleNextScroll = () => {
    if (current >= images?.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <CarouselContainer>
      <StepForm>
        {images?.map((_, i) => (
          <Step current={current === i} key={i} />
        ))}
      </StepForm>
      <Button onClick={handlePrevScroll}>
        <FontAwesomeIcon size="2x" icon={faChevronLeft} />
      </Button>
      <Button onClick={handleNextScroll} right="0">
        <FontAwesomeIcon size="2x" icon={faChevronRight} />
      </Button>
      <Slide ref={scrollRef}>
        {images?.map((image, i) => (
          <Image src={image} key={i} alt="Carousel" />
        ))}
      </Slide>
    </CarouselContainer>
  );
};

export default Carousel;
