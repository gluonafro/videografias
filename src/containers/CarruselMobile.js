import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { data } from "../resources/data.json";
import { useTranslate } from "../contexts/languageContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useScrollPosition } from "../hooks/useScrollPosition";

const CarruselMobile = ({ orderedData, active, setActive, zoom }) => {
  const t = useTranslate();
  const [items, setItems] = useState(orderedData);

  const mediaHeight = 0.5625 * window.innerWidth;
  const itemHeight = mediaHeight + 90;
  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (zoom) {
        const pos = Math.abs(currPos.y - 200);
        let videoAct = currPos.y >= -50 ? 0 : Math.floor(pos / itemHeight);
        setActive(videoAct);
      }
    },
    [zoom]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [zoom, orderedData]);

  useEffect(() => {
    setItems(orderedData);
  }, [orderedData]);

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={items.length}
        next={() => setItems(items.concat(orderedData))}
        hasMore={true}
        className={!zoom && "scroll"}
      >
        {items.map((i, index) => (
          <div key={index}>
            <div
              css={
                zoom
                  ? `height: ${window.innerWidth * 0.5625}px`
                  : index % 2
                  ? `margin-left: 2px`
                  : `margin-right: 2px`
              }
            >
              <Link to={`/expo/${i}`}>
                {index === active && zoom ? (
                  <video
                    width="100%"
                    src={data[i].preview}
                    muted
                    autoPlay
                    poster={
                      process.env.PUBLIC_URL +
                      "/assets/img/1920x1080/" +
                      data[i].id +
                      ".jpg"
                    }
                    loop
                  />
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
                    alt={data[i].videoName}
                  ></img>
                )}
              </Link>
            </div>
            <VideoInfo zoom={zoom}>
              <div
                css={`
                  padding: ${zoom
                    ? "0.75rem 0 2.2rem 0.75rem;"
                    : "0.4rem 0 1.5rem 0.3rem;"};
                `}
              >
                <p>
                  <strong>{data[i].videoName}</strong>
                </p>
                <p>{data[i].artistFName + " " + data[i].artistLName}</p>
                <p>
                  {data[i].year} · {t(data[i].country)}
                </p>
              </div>
            </VideoInfo>
          </div>
        ))}
      </InfiniteScroll>
    </Wrapper>
  );
};

export default CarruselMobile;

const Wrapper = styled.section`
  margin-top: 5rem;
  width: 100%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  .scroll {
    display: block;
    > div {
      width: 50%;
      display: inline-block;
    }
  }
`;

const VideoInfo = styled.div`
  height: 90px;
  overflow: hidden;
  font-size: 1.4rem;
  ${({ zoom }) => !zoom && `font-size: 1.2rem; line-height: 1.2rem;`}
  p {
    padding: 0.2rem 0;
  }
`;
