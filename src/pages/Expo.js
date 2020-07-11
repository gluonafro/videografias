import React, { useState, useRef } from "react";
import styled from "styled-components";
import Carrusel from "../components/Carrusel";
import Header from "../components/Header";
import Poster from "../components/Poster";
import { Link } from "react-router-dom";
// import handleScroll from '../utils/handleScroll'
import { data } from "../resources/data.json";
import randomArray from "../utils/randomArray";

const Expo = ({match}) => {
  let randomDist = randomArray(data.length);
  const [orderedData, setOrderedData] = useState(randomDist);
  const [wheel, setWheel] = useState({ move: 0, on: false });
  const [muted, setMuted] = useState(true)

  return (
    <>
      <Header match={match} muted={muted} setMuted={setMuted} />
      <main onWheel={(e) => setWheel({ move: e.deltaY, on: !wheel.on })}>
        <div>Videografías</div>
        <Carrusel wheel={wheel} muted={muted} />
      </main>
    </>
  );
};

export default Expo;

const Video = styled.div`
  flex-shrink: 0;
  /* width: ${({ width }) => width}; */
  width: 30rem;
  height: 15rem;
  /* height: ${({ height }) => height}; */
  border: 1px solid #000;
  margin: 100px 0 5px 0;
`;

const SPoster = styled(Poster)`
  width: 83.2%;
  height: ${({height}) => height};
`;

const Black = styled.div`
  background: #000;
  width: 100%;
  height: 100%;
`;
const White = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
`;
const Red = styled.div`
  background: red;
  width: 100%;
  height: 100%;
`;

let array = [];
for (let i = 0; i < 15; i++) {
  array.push(i);
}
