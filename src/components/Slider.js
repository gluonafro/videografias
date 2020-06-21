import React, { useEffect, useRef, useCallback, useState } from "react";
import usePrevious from "../hooks/usePrevious";
import styled from "styled-components";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const Slider = ({ setSliderPos }) => {
  const sliderRef = useRef(null);

  let offset;
  let initialPos;

  useEffect(() => {
    Draggable.create(sliderRef.current, {
      type: "x",
      bounds: {
        minX: -sliderRef.current.offsetLeft,
        maxX: sliderRef.current.offsetLeft,
      },
    });
  });

  return (
    <Wrapper>
      <Bola ref={sliderRef} />
    </Wrapper>
  );
};

export default Slider;

const Wrapper = styled.div`
  width: 250px;
  height: 30px;
  background: #ddd;
  text-align: center;
  position: relative;
  margin-left: 100px;
`;

const Bola = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  border: 1px solid #000;
  margin: 0 auto;
`;
