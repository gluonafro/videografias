import React, { useState } from "react";
import styled from "styled-components";
import { data } from "../resources/data.json";
import { useTranslate } from "../contexts/languageContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const CarruselMobile = ({ orderedData }) => {
  const t = useTranslate();
  const [items, setItems] = useState(orderedData);

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={items.length}
        next={() => setItems(items.concat(orderedData))}
        hasMore={true}
        height="calc(100vh - 5rem)"
      >
        {items.map((i) => (
          <Item>
            <Link to={`/expo/${i}`}>
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
            </Link>
            <VideoInfo>
              <p>
                <strong>{data[i].videoName}</strong>
              </p>
              <p>{data[i].artistFName + " " + data[i].artistLName}</p>
              <p>
                {data[i].year} · {t(data[i].country)}
              </p>
            </VideoInfo>
          </Item>
        ))}
      </InfiniteScroll>
    </Wrapper>
  );
};

export default CarruselMobile;

const Wrapper = styled.section`
  margin-top: 5rem;
  div div {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Item = styled.div``;

const VideoInfo = styled.div`
  margin: 0.75rem 0 2.2rem 0.75rem;
  p {
    line-height: 2rem;
  }
`;
