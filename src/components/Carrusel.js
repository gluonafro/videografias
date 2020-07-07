import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { data } from "../resources/data.json";
import { TweenMax, Linear } from "gsap";

const Carrusel = ({ wheel }) => {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(true);
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const Crsl = useRef(null);

  console.log(array[active - 1] ? array[active - 1] : array[array.length - 1]);
  const getNext = (act, max) => {
    return act + 1 >= max ? 0 : act + 1;
  };
  const getPrev = (act, max) => {
    return act - 1 < 0 ? max - 1 : act - 1;
  };
  const next = () => {
    setDone(false);
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    let deltaX = 622;
    TweenMax.to(Crsl.current.children, 0.5, {
      x: offset - deltaX,
      //   ease: Linear.easeIn,
    }).then(() => {
      setActive(getNext(active, array.length));
      TweenMax.to(Crsl.current.children, 0, {
        x: offset + (582 - deltaX),
        // ease: Linear.easeIn,
      });
      setDone(true);
    });
  };

  const prev = () => {
    setDone(false);
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    let deltaX = 542;
    TweenMax.to(Crsl.current.children, 0.5, {
      x: offset + deltaX,
      //   ease: Linear.easeIn,
    }).then(() => {
      setActive(getPrev(active, array.length));
      TweenMax.to(Crsl.current.children, 0, {
        x: offset - (582 - deltaX),
        // ease: Linear.easeIn,
      });
      setDone(true);
    });
  };

  useEffect(() => {
    if (done) {
      if (wheel.move > 0) next();
      if (wheel.move < 0) prev();
    }
  }, [wheel.on]);
  return (
    <React.Fragment>
      <Wrapper ref={Crsl}>
        {realArray(array, active).map((i, index) => {
          return <Video>{data[i].artistLName}</Video>;
        })}
      </Wrapper>
      {active} / {array.length - 1}
    </React.Fragment>
  );
};

export default Carrusel;

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40rem;
  overflow: hidden;
`;

const Video = styled.div`
  flex-shrink: 0;
  /* width: ${({ width }) => width}; */
  width: 50rem;
  height: 25rem;
  margin: 0 4rem;
  /* height: ${({ height }) => height}; */
  border: 1px solid #000;
  overflow: hidden;
  transform: translateX(-80rem);
`;

const realArray = (array, active) => {
  let center = array[active];
  let right1 = array[active + 1] ? array[active + 1] : array[0];
  let right2 = array[active + 2]
    ? array[active + 2]
    : array[active + 1]
    ? array[0]
    : array[1];
  let left1 =
    array[active - 1] !== undefined
      ? array[active - 1]
      : array[array.length - 1];
  let left2 =
    array[active - 2] !== undefined
      ? array[active - 2]
      : array[active - 1] !== undefined
      ? array[array.length - 1]
      : array[array.length - 2];

  return [left2, left1, center, right1, right2];
};
