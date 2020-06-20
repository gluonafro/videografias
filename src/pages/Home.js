import React, { useState, useRef } from "react";
import styled from "styled-components";
import Draggable from "../components/Draggable";
import { TweenMax } from "gsap";

const Home = () => {
  const [zoomed, setZoomed] = useState(true);
  const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const Carru = useRef();
  const Bola = useRef();

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
    let offset = carru.children[0].getBoundingClientRect().x;
    TweenMax.to(
      carru.children,
      2,
      {
        // css: { scale: zoomed ? 0.25 : 1, transformOrigin: "50% 50%" },
        css: {
          width: zoomed ? 200 : 800,
          height: zoomed ? 100 : 400,
          transformOrigin: "50% 50%",
        },
        // width: zoomed ? "200px" : "800px",
        // height: carru.children[0].height,
        // x: offset,
      }
      // {
      //   scale: zoomed ? 1 : 10,
      //   transformOrigin: "50% 50%",
      //   // height: zoomed ? 150 : 400,
      //   // x: zoomed ? offset + 500 : offset - 500,
      // }
    );
    setZoomed(!zoomed);
  };

  // const desplaza = () => {
  //   TweenMax.to(
  //     ".bola",
  //     2,
  //     {
  //       x:
  //     }
  //   )
  // }

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
      <div>
        <Barra>
          {/* <div ref={Bola} className='bola'></div> */}
          <Draggable initialPos={100} />
        </Barra>
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

const Barra = styled.div`
  width: 250px;
  height: 30px;
  background: #ddd;
  text-align: center;
  position: relative;
  div {
    width: 25px;
    height: 25px;
    border-radius: 25px;
    border: 1px solid #000;
    margin: 0 auto;
  }
`;
