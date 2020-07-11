import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import { data } from "../resources/data.json";
import { TweenMax } from "gsap";
import InputRange from "./InputRange";
import { Link } from "react-router-dom";

const Carrusel = ({ wheel, orderedData, active, setActive, muted }) => {
  const [origin, setOrigin] = useState(0);
  const [done, setDone] = useState(true);
  const [zoom, setZoom] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [itemWidth, setItemWidth] = useState(window.innerWidth * 0.5);
  let totalItems = data.length;

  const Crsl = useRef(null);

  const getNext = (act, max) => {
    return act + 1 >= max ? 0 : act + 1;
  };
  const getPrev = (act, max) => {
    return act - 1 < 0 ? max - 1 : act - 1;
  };
  const next = () => {
    setDone(false);
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    TweenMax.to(Crsl.current.children, 0.5, {
      x: offset - itemWidth,
    }).then(() => {
      setActive(getNext(active, totalItems));
      setOrigin(getNext(active, totalItems));
      TweenMax.set(Crsl.current.children, {
        x: offset,
      });
      setDone(true);
    });
  };

  const prev = () => {
    setDone(false);
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    TweenMax.to(Crsl.current.children, 0.5, {
      x: offset + itemWidth,
    }).then(() => {
      setActive(getPrev(active, totalItems));
      setOrigin(getPrev(active, totalItems));
      TweenMax.to(Crsl.current.children, 0, {
        x: offset,
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

  const doZoom = () => {
    TweenMax.to(Crsl.current.children, 0.5, {
      width: zoom
        ? Crsl.current.children[0].clientWidth * 0.5
        : Crsl.current.children[0].clientWidth * 2,
      height: zoom
        ? Crsl.current.children[0].clientHeight * 0.5
        : Crsl.current.children[0].clientHeight * 2,
      x: zoom
        ? -Crsl.current.children[0].clientWidth * 0.25
        : -Crsl.current.children[0].clientWidth * 2.88,
      y: zoom ? Crsl.current.children[0].clientHeight * 0.25 : 0,
    });
    setItemWidth(zoom ? itemWidth * 0.5 : itemWidth * 2);
    setZoom(!zoom);
  };

  // const reSize = () => {
  //   console.log("************++");
  //   setWindowWidth(window.innerWidth);
  // };

  // window.addEventListener("resize", reSize);

  console.log("*** ARRAY ***");
  console.log(realArray(orderedData, active));
  console.log(active);
  return (
    <React.Fragment>
      <Wrapper ref={Crsl}>
        {realArray(orderedData, active).map((i, index) => {
          return (
            <Item width={windowWidth}>
              <Link
                to={`/expo/${i}`}
                css={`
                  width: 80%;
                `}
              >
                {i === orderedData[active] ? (
                  <div
                    css={`
                      width: 80%;
                    `}
                  >
                    <video
                      width="100%"
                      height="100%"
                      autoPlay={true}
                      src={data[i].preview}
                      poster={
                        process.env.PUBLIC_URL +
                        "/assets/img/1920x1080/" +
                        data[i].id +
                        ".jpg"
                      }
                      muted={muted}
                      loop={true}
                    ></video>
                  </div>
                ) : (
                  <div
                    css={`
                      width: 80%;
                    `}
                  >
                    <img
                      width="100%"
                      height="100%"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/1920x1080/" +
                        data[i].id +
                        ".jpg"
                      }
                    ></img>
                  </div>
                )}
              </Link>
            </Item>
          );
        })}
      </Wrapper>
      {active} / {totalItems - 1}
      <InputRange
        Crsl={Crsl}
        active={active}
        setActive={setActive}
        itemWidth={itemWidth}
        totalItems={totalItems}
        origin={origin}
        setOrigin={setOrigin}
        done={done}
        setDone={setDone}
      />
      <button onClick={() => doZoom()}>Zoom</button>
    </React.Fragment>
  );
};

export default Carrusel;

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  margin: 5vh 0;
`;

const Item = styled.div`
  width: ${({ width }) => width * 0.5 + `px`};
  height: ${({ width }) => width * 0.25 + `px`};
  /* width: 50vw; */
  /* height: 25vw; */
  flex-shrink: 0;
  overflow: hidden;
  /* transform: translateX(-72vw); */
  transform: ${({ width }) => `translateX(-${0.72 * width}px)`};
`;

const realArray = (array, active) => {
  let center = array[active];
  let right1 = array[active + 1] !== undefined ? array[active + 1] : array[0];
  let right2 =
    array[active + 2] !== undefined
      ? array[active + 2]
      : array[active + 1] !== undefined
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
