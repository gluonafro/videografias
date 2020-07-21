import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import { data } from "../resources/data.json";
import { TweenMax, Sine } from "gsap";
import InputRange from "./InputRange";
import { Link } from "react-router-dom";
import getNext from '../utils/getNext'
import getSlides from '../utils/getSlides'

const Carrusel = ({ wheel, orderedData, active, setActive, muted }) => {
  const [origin, setOrigin] = useState(0);
  const [done, setDone] = useState(true);
  const [zoom, setZoom] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [itemWidth, setItemWidth] = useState(window.innerWidth * 0.5);
  let totalItems = data.length;

  const Crsl = useRef(null);

  const next = () => {
    setDone(false);
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    TweenMax.to(Crsl.current.children, 0.5, {
      x: offset - itemWidth,
      ease: Sine.easeInOut
    }).then(() => {
      setActive(getNext(active, totalItems, true));
      setOrigin(getNext(active, totalItems, true));
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
      ease: Sine.easeInOut
    }).then(() => {
      setActive(getNext(active, totalItems, false));
      setOrigin(getNext(active, totalItems, false));
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
    if (done) {
      setDone(false);
      TweenMax.to(Crsl.current.children, 0.5, {
        width: zoom
          ? Crsl.current.children[0].clientWidth * 0.5
          : Crsl.current.children[0].clientWidth * 2,
        x: zoom
          ? -Crsl.current.children[0].clientWidth * 0.7
          : -Crsl.current.children[0].clientWidth * 4.8,
        y: zoom ? Crsl.current.children[0].clientHeight * 0.25 : 0,
        fontSize: zoom ? 8 : 14,
        ease: Sine.easeInOut,
      }).then(() => setDone(true));
      setItemWidth(zoom ? itemWidth * 0.5 : itemWidth * 2);
      setZoom(!zoom);
    }
  };

  // const reSize = () => {
  //   console.log("************++");
  //   setWindowWidth(window.innerWidth);
  // };

  // window.addEventListener("resize", reSize);

  return (
    <React.Fragment>
      <Zoom onClick={() => doZoom()}>{zoom ? 'Vista detalle' : 'Vista general'}</Zoom>
      <Wrapper ref={Crsl}>
        {getSlides(orderedData, active).map((i, index) => {
          return (
            <Item width={windowWidth}>
                  <div
                    css={`
                      width: 80%;
                    `}
                  >
                    <Link
                      to={`/expo/${i}`}
                    >
                      {i === orderedData[active] ?
                      <video
                        width="100%"
                        height="100%"
                        autoPlay={true}
                        // src={data[i].preview}
                        poster={
                          process.env.PUBLIC_URL +
                          "/assets/img/1920x1080/" +
                          data[i].id +
                          ".jpg"
                        }
                        muted={muted}
                        loop={true}
                      ></video>
                      : <img
                        width="100%"
                        height="100%"
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/img/1920x1080/" +
                          data[i].id +
                          ".jpg"
                        }
                    ></img>}
                    </Link>
                  </div>
                  {i === orderedData[active] && <>
                    <p>{data[i].videoName}</p>
                    <p>{data[i].artistFName + ' ' + data[i].artistLName}</p>
                    <p>1977, Argentina</p>
                  </>}
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
  /* height: ${({ width }) => width * 0.5 + `px`}; */
  height: auto;
  /* width: 50vw; */
  /* height: 25vw; */
  flex-shrink: 0;
  overflow: hidden;
  /* transform: translateX(-72vw); */
  transform: ${({ width }) => `translateX(-${0.72 * width}px)`};
`;

const Zoom = styled.button`
  width: 10rem;
  height: 2rem;
  border: 1px solid #fff;
  position: absolute;
  right: 10%;
`;
