import React, { useRef, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import ButtonGroup from "../containers/ButtonGroup";
import {carouselResponsive} from '../resources/constants.json'

const Carrusel = props => {
  const Car = useRef(null);
  return (
    <SCarousel
      responsive={carouselResponsive}
      infinite={true}
      arrows={false}
      swipeable={false}
      ssr={false}
      draggable={false}
      centerMode={true}
      customButtonGroup={<ButtonGroup Carousel={Car} {...props} />}
      itemClass={'videoClass'}
      ref={Car}
      customTransition="all 0.4s linear"
      transitionDuration={400}
      autoPlaySpeed={400}
    >
      {props.children}
    </SCarousel>
  );
};

export default Carrusel;

const SCarousel = styled(Carousel)`
  height: 60vh;
  padding-bottom: 120px;
  .videoClass {
  }
`;

