import React, { useRef, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import ButtonGroup from "../containers/ButtonGroup";
import {TweenMax} from 'gsap';
import img1 from '../assets/img/01.jpg';
import img2 from '../assets/img/02.jpg';
import img3 from '../assets/img/03.jpg';

const Carrusel = () => {
  const [zoom, setZoom] = useState(true)
  const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
      },
    }
  const Car = useRef(null);

  return (
    <>
    <SCarousel
      responsive={responsive}
      infinite={true}
      swipeable={false}
      ssr={false}
      autoPlay={false}
      draggable={false}
      centerMode={true}
      customButtonGroup={<ButtonGroup Carousel={Car} zoom={zoom} setZoom={setZoom} />}
      itemClass={'videoClass'}
      ref={Car}
    >
      {array.map((_, index) => (
        <div>
          <Video height={zoom ? '25vw' : '8vw'}>
            <img src={index % 3 === 0 ? img1 : index % 2 === 0 ? img2 : img3} width='100%' height='100%'/>
            </Video>
          {/* width={zoom ? '45vw' : '15vw'}/> */}
          <p>Video {index}</p>
          <p>Artista {index}</p>
          <p>1977, Argentina</p>
        </div>
      ))}
    </SCarousel>
   </>
  );
};

export default Carrusel;

const SCarousel = styled(Carousel)`
  height: 60vh;
  padding-bottom: 120px;
  .videoClass {
    /* width: 45vw; */
    /* padding: 0 100px; */
  }
`;

const Video = styled.div`
  flex-shrink: 0;
  /* width: ${({width}) => width}; */
  width: 80%;
  /* height: 25vw; */
  height: ${({height}) => height};
  border: 1px solid #000;
  margin: 100px 0 5px 0;
`;

let array = [];
for (let i = 0; i < 70; i++) {
  array.push(i);
}
