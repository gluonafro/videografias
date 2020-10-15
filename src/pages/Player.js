import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { data } from "../resources/data.json";
import getNext from "../utils/getNext";
import { useTranslate } from "../contexts/languageContext";
import InfoVideo from "../components/InfoVideo";
import { TweenMax } from "gsap";
import ArrowCircle from "../assets/svg/ArrowCircle";
import NextVideo from "../assets/svg/NextVideo";
import Tabs from "../components/PlayerTabs";

const Player = ({ match, active, setActive, orderedData }) => {
  const [videoInfo, setVideoInfo] = useState({ isOpen: false, isBio: false });

  const Video = useRef(null);
  const VideosPlayer = useRef(null);
  const InfosVideo = useRef(null);
  const t = useTranslate();

  useEffect(() => {
    Video.current.addEventListener("error", (err) => console.log(err));
  }, [Video]);

  const currentVideo = data[match.params.id];
  const nextVideo = getNext(active, data.length, true);
  const prevVideo = getNext(active, data.length, false);

  useEffect(() => {
    TweenMax.fromTo(
      InfosVideo.current,
      0.1,
      { width: videoInfo.isOpen ? 50 : "30vw" },
      { width: videoInfo.isOpen ? "30vw" : 50 }
    );
    TweenMax.fromTo(
      VideosPlayer.current,
      0.1,
      { width: videoInfo.isOpen ? "calc(100% - 51px)" : "70%" },
      { width: videoInfo.isOpen ? "70%" : "calc(100% - 51px)" }
    );
  }, [videoInfo.isOpen]);

  return (
    <main style={{height: '100%'}}>
      <Container className="large">
        <InfoTabs ref={InfosVideo}>
          {videoInfo.isOpen && (
            <InfoVideo video={currentVideo} isBio={videoInfo.isBio} t={t} />
          )}
          <Tabs videoInfo={videoInfo} setVideoInfo={setVideoInfo} t={t} />
        </InfoTabs>
        <VideoPlayer ref={VideosPlayer}>
          <Link
            to={`/expo/${orderedData[prevVideo]}`}
            onClick={() => setActive(prevVideo)}
          >
            <ChangeVideo
              css={`
                left: 1%;
                :hover svg {
                  display: inline;
                }
              `}
              className="onHover"
            >
              <NextVideo />
            </ChangeVideo>
          </Link>
          <video
            src={currentVideo.link}
            ref={Video}
            height="100%"
            width="100%"
            autoPlay
            controls
            controlsList="nodownload"
            disablePictureInPicture
            preload="auto"
          ></video>
          <Link
            to={`/expo/${orderedData[nextVideo]}`}
            onClick={() => setActive(nextVideo)}
          >
            <ChangeVideo
              css={`
                right: 1%;
                :hover svg {
                  display: inline;
                }
              `}
            >
              <NextVideo rotate="right" />
            </ChangeVideo>
          </Link>
        </VideoPlayer>
        <BackArrow>
          <Link to="/expo">
            <ArrowCircle />
          </Link>
        </BackArrow>
      </Container>
    </main>
  );
};

export default Player;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  overflow: hidden;
`;

const InfoTabs = styled.div`
  height: auto;
  display: flex;
  left: 0;
  top: 0;
  bottom: 0;
`;

const VideoPlayer = styled.div`
  height: 100%;
  width: calc(100% - 5rem - 1px);
  position: relative;
  float: right;
`;

const ChangeVideo = styled.div`
  position: absolute;
  top: 0;
  height: 88%;
  line-height: 100vh;
  z-index: 1;
  cursor: pointer;
  width: 5rem;
  text-align: center;
  svg {
    display: none;
    width: 1vw;
  }
  .onHover {
    animation-name: showUp;
    animation-duration: 0.25s;
  }
  @keyframes showUp {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const BackArrow = styled.button`
  position: absolute;
  background: none;
  top: 8%;
  right: 1.5%;
  z-index: 2;
  svg {
    width: 2.5vw;
    height: 2.5vw;
  }
`;
