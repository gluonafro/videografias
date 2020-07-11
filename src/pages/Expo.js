import React, { useState, useRef } from "react";
import styled from "styled-components";
import Carrusel from "../components/Carrusel";
import Header from "../components/Header";
import Poster from "../components/Poster";
import { Link } from "react-router-dom";
// import handleScroll from '../utils/handleScroll'
import { data } from "../resources/data.json";
import randomArray from "../utils/randomArray";

const Expo = () => {
  let randomDist = randomArray(data.length);
  console.log(data);
  const [orderedData, setOrderedData] = useState(randomDist);
  const [active, setActive] = useState(orderedData[0]);
  // const [zoom, setZoom] = useState(true);
  // const [active, setActive] = useState(0);
  const [wheel, setWheel] = useState({ move: 0, on: false });
  return (
    <>
      <Header />
      <main onWheel={(e) => setWheel({ move: e.deltaY, on: !wheel.on })}>
        <div>Videografías</div>
        <Carrusel
          wheel={wheel}
          orderedData={orderedData}
          active={active}
          setActive={setActive}
        />
      </main>
    </>
  );
};

export default Expo;

const SPoster = styled(Poster)`
  width: 100px;
  height: 100px;
`;

let array = [];
for (let i = 0; i < 70; i++) {
  array.push(i);
}
