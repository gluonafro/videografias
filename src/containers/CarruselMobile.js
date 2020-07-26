import React, { useState } from "react";
import styled from "styled-components";
import { data } from "../resources/data.json";
import { useTranslate } from "../contexts/languageContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useScrollPosition } from "../hooks/useScrollPosition";

const CarruselMobile = ({ orderedData }) => {
  const t = useTranslate();
  const [items, setItems] = useState(orderedData);
  const [active, setActive] = useState(0);

  const mediaHeight = 0.5625 * window.innerWidth;
  const itemHeight = mediaHeight + 89.5;
  useScrollPosition(({ prevPos, currPos }) => {
    const pos = Math.abs(currPos.y - 200);
    let videoAct = currPos.y >= -50 ? 0 : Math.floor(pos / itemHeight);
    setActive(videoAct);
  }, []);

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={items.length}
        next={() => setItems(items.concat(orderedData))}
        hasMore={true}
      >
        {items.map((i, index) => (
          <div key={index}>
            <MediaContainer height={window.innerWidth * 0.5625}>
              <Link to={`/expo/${i}`}>
                {index === active ? (
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
            </MediaContainer>
            <VideoInfo>
              <p>
                <strong>{data[i].videoName}</strong>
              </p>
              <p>{data[i].artistFName + " " + data[i].artistLName}</p>
              <p>
                {data[i].year} · {t(data[i].country)}
              </p>
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MediaContainer = styled.div`
  height: ${({ height }) => height + "px"};
`;

const VideoInfo = styled.div`
  margin: 0.75rem 0 2.2rem 0.75rem;
  p {
    line-height: 2rem;
  }
`;
