import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  white-space: nowrap;
  will-change: transform;
  user-select: none;
`;

const Slider = ({ children }) => {
  const sliderRef = useRef();
  let isDown = useRef(false);
  let startX = useRef(null);
  let scrollLeft = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    slider.addEventListener('mousedown', one);
    slider.addEventListener('mouseleave', three);
    slider.addEventListener('mouseup', four);
    slider.addEventListener('mousemove', five);

    return () => {
      slider.removeEventListener('mousedown', one);
      slider.removeEventListener('mouseleave', three);
      slider.removeEventListener('mouseup', four);
      slider.removeEventListener('mousemove', five);
    };
  }, []);

  function one(e) {
    isDown.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  }

  function three() {
    isDown.current = false;
  }

  function four() {
    isDown.current = false;
  }

  function five(e) {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX.current;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  }

  return <SliderContainer ref={sliderRef}>{children}</SliderContainer>;
};

export default Slider;
