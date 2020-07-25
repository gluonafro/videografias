import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import { data } from "../resources/data.json";
import { TweenMax, Sine } from "gsap";
import InputRange from "../components/InputRange";
import { Link } from "react-router-dom";
import getNext from "../utils/getNext";
import getSlides from "../utils/getSlides";
import useWindowWidth from "../hooks/useWindowWidth";
import { useTranslate } from "../contexts/languageContext";

const Carrusel = ({
  wheel,
  orderedData,
  active,
  setActive,
  muted,
  barIndicator,
}) => {
  const t = useTranslate();
  const [origin, setOrigin] = useState(0);
  const [done, setDone] = useState(true);
  const [zoom, setZoom] = useState(false);
  let windowWidth = useWindowWidth();
  const [itemWidth, setItemWidth] = useState(0);
  let totalItems = data.length;

  const Crsl = useRef(null);

  const next = () => {
    setDone(false);
    let offset = Crsl.current.children[0].getBoundingClientRect().x;
    TweenMax.to(Crsl.current.children, 0.5, {
      x: offset - itemWidth,
      ease: Sine.easeInOut,
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
      ease: Sine.easeInOut,
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

  useEffect(() => {
    if (done) {
      setDone(false);
      TweenMax.to(Crsl.current.children, 0.75, {
        width: zoom ? windowWidth.width * 0.25 : windowWidth.width * 0.5,
        x: zoom
          ? -windowWidth.width * 0.75 * 0.5
          : -windowWidth.width * 4.8 * 0.25,
        y: zoom ? Crsl.current.children[0].clientHeight * 0.125 : 0,
        fontSize: zoom ? 11 : 14,
        ease: Sine.easeInOut,
      }).then(() => setDone(true));
      setItemWidth(zoom ? windowWidth.width * 0.25 : windowWidth.width * 0.5);
    }
  }, [zoom, windowWidth.width]);

  return (
    <React.Fragment>
      <Zoom className="small" onClick={() => setZoom(!zoom)}>
        {zoom ? "Vista detalle" : "Vista general"}
      </Zoom>
      <Wrapper ref={Crsl}>
        {getSlides(orderedData, active).map((i) => {
          return (
            <Item width={windowWidth.width}>
              <div
                css={`
                  width: 80%;
                `}
              >
                <Link to={`/expo/${i}`}>
                  {i === orderedData[active] ? (
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
                  ) : (
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
                  )}
                </Link>
              </div>
              {i === orderedData[active] && (
                <VideoInfo>
                  <p>
                    <strong>{data[i].videoName}</strong>
                  </p>
                  <p>{data[i].artistFName + " " + data[i].artistLName}</p>
                  <p>
                    {data[i].year} · {t(data[i].country)}
                  </p>
                </VideoInfo>
              )}
            </Item>
          );
        })}
      </Wrapper>
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
        barIndicator={barIndicator}
      />
      <Position className="small">
        {active + 1} / {totalItems}
      </Position>
    </React.Fragment>
  );
};

export default Carrusel;

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 6rem);
  margin-top: 2vh;
  margin: 2% 0;
  overflow: hidden;
`;

const Item = styled.div`
  width: ${({ width }) => 0.25 * width + `px`};
  height: auto;
  flex-shrink: 0;
  overflow: hidden;
  transform: ${({ width }) => `translateX(-${(width * (0.5 + 0.25)) / 2}px)`};
`;

const Zoom = styled.button`
  width: 10rem;
  height: 2.2rem;
  border: 1px solid #fff;
  position: absolute;
  right: 18.5rem;
`;

const VideoInfo = styled.div`
  margin-top: 2vh;
  p {
    padding: 0.2rem 0;
  }
`;

const Position = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 1.5rem;
  color: #8f8f8f;
`;
