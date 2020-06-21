import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
// import Draggable from "../components/Draggable";
import { gsap } from "gsap";
import Slider from "../components/Slider";

const Home = () => {
  const [zoomed, setZoomed] = useState(true);
  const [sliderPos, setSliderPos] = useState(0);
  const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const Carru = useRef(null);

  return (
    <Wrapper>
      <div>Videografías</div>
      <Carrusel ref={Carru}>
        {array.map((_, index) => (
          <Video key={index} />
        ))}
      </Carrusel>
      <button onClick={() => move(Carru.current, true)}>Move left</button>
      <button onClick={() => move(Carru.current, false)}>Move right</button>
      <button onClick={() => zoom(Carru.current, zoomed, setZoomed)}>
        Zoom
      </button>
      <div>
        <Slider setSliderPos={setSliderPos} />
      </div>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section`
  overflow: hidden;
  button {
    margin-right: 20px;
  }
`;

const Carrusel = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  overflow: hidden;
  height: 80vh;
`;

const Video = styled.div`
  flex-shrink: 0;
  width: 800px;
  height: 400px;
  background: #000;
  margin: 50px 30px 0 0;
  display: inline-block;
`;
const move = (carru, left) => {
  let offset = carru.children[0].getBoundingClientRect().x;
  gsap.fromTo(
    carru.children,
    1,
    { x: offset },
    { x: left ? offset + 300 : offset - 300 }
  );
};

const zoom = (carru, zoomed, setZoomed) => {
  let offset = carru.children[0].getBoundingClientRect().x;
  gsap.to(carru.children, 2, {
    css: {
      width: zoomed ? 200 : 800,
      height: zoomed ? 100 : 400,
      transformOrigin: "50% 50%",
    },
  });
  setZoomed(!zoomed);
};
