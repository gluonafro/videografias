import React, { useState, useRef } from "react";
import styled from "styled-components";
import { TweenMax } from "gsap";

const Home = () => {
  const [zoomed, setZoomed] = useState(false);
  const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const Carru = useRef();

  const move = (carru, left) => {
    let offset = carru.children[0].getBoundingClientRect().x;
    console.log(Carru);
    TweenMax.fromTo(
      carru.children,
      1,
      { x: offset },
      { x: left ? offset + 300 : offset - 300 }
    );
  };

  const zoom = (carru, zoomed) => {
    TweenMax.fromTo(
      carru.children,
      2,
      { width: carru.children[0].width, height: carru.children[0].height },
      { width: zoomed ? 300 : 800, height: zoomed ? 150 : 400 }
    );
    setZoomed(!zoomed);
  };

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
      <button onClick={() => zoom(Carru.current, zoomed)}>Zoom</button>
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
  height: 800px;
`;

const Video = styled.div`
  flex-shrink: 0;
  width: 300px;
  height: 150px;
  background: #000;
  margin: 50px 30px 0 0;
  display: inline-block;
`;
