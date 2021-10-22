import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const Slide = styled.div`
  display: flex;
  white-space: nowrap;
  will-change: transform;
  user-select: none;
`;

const Image = styled.img`
  width: 400px;
  object-fit: contain;
`;

const Button = styled.button`
  position: absolute;
  top: 190px;
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
      <Button onClick={handlePrevScroll}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <Button onClick={handleNextScroll} right="0">
        <FontAwesomeIcon icon={faChevronRight} />
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
