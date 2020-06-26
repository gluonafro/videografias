import React, { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import CustomSlider from "./Slider";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 0.98,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Carrusel = () => {
  const Car = useRef(null);
  return (
    <SCarousel
      responsive={responsive}
      infinite={true}
      swipeable={false}
      ssr={false}
      autoPlay={false}
      draggable={false}
      centerMode={true}
      customButtonGroup={<CustomSlider Carousel={Car} />}
      itemClass={'videoClass'}
      ref={Car}
    >
      {array.map((_, index) => (
        <Container>
          <Video />
          <p>Video {index}</p>
          <p>Artista {index}</p>
          <p>1977, Argentina</p>
        </Container>
      ))}
    </SCarousel>
  );
};

export default Carrusel;

const SCarousel = styled(Carousel)`
  /* padding-left: 100px; */
  height: 60vh;
  padding-bottom: 120px;
  .videoClass {
    padding: 0 50px;
  }
  /* overflow: visible !important; */
  li {
    /* margin-left: -12.5vw;
    margin-right: 12.5vw; */
  }
`;

const Container = styled.div`
  /* margin-left: -10vw; */
`;

const Video = styled.div`
  flex-shrink: 0;
  width: 45vw;
  height: 25vw;
  border: 1px solid #000;
  margin: 100px 0 5px 0;
`;

let array = [];
for (let i = 0; i < 70; i++) {
  array.push(i);
}
