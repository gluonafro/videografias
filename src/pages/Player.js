import React, { useRef, useEffect, useState, useMemo } from "react";
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
import Cursor from "../components/Cursor/index";
import { useIsTablet } from "../hooks/useMediaQuery";
import Lottie from "react-lottie";
import loadingSpinner from "../assets/animations/Spinner-Loading.json";

const Player = ({ match, active, setActive, orderedData }) => {
  const [videoInfo, setVideoInfo] = useState({ isOpen: false, isBio: false });
  const [loading, setLoading] = useState(true);

  const Video = useRef(null);
  const VideosPlayer = useRef(null);
  const InfosVideo = useRef(null);
  const t = useTranslate();
  const isTablet = useIsTablet();

  useEffect(() => {
    Video.current.addEventListener("error", (err) => console.log(err));
  }, [Video]);

  const currentVideo = data[match.params.id] ?? {};
  const nextVideo = getNext(active, data.length, true);
  const prevVideo = getNext(active, data.length, false);

  const tabsWidth = isTablet ? 400 : 500;

  useEffect(() => {
    TweenMax.fromTo(
      InfosVideo.current,
      0.1,
      { width: videoInfo.isOpen ? 50 : tabsWidth + "px" },
      { width: videoInfo.isOpen ? tabsWidth + "px" : 50 }
    );
    TweenMax.fromTo(
      VideosPlayer.current,
      0.1,
      {
        width: videoInfo.isOpen
          ? "calc(100% - 51px)"
          : `calc(100% - ${tabsWidth}px)`,
      },
      {
        width: videoInfo.isOpen
          ? `calc(100% - ${tabsWidth}px)`
          : "calc(100% - 51px)",
      }
    );
  }, [videoInfo.isOpen]);

  useMemo(() => {
    setLoading(true);
  }, [currentVideo]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingSpinner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <main style={{ height: "100%" }}>
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
            <>
              {loading && (
                <div className="loading">
                  <Lottie
                    options={defaultOptions}
                    height={100}
                    width={100}
                    isClickToPauseDisabled
                  />
                </div>
              )}
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
                onLoadedData={() => setLoading(false)}
              ></video>
            </>
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
      <Cursor state={videoInfo.isOpen} />
    </>
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
  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  video:fullscreen {
    cursor: default;
  }
  video:-webkit-full-screen {
    cursor: default;
  }
  video:-ms-fullscreen {
    cursor: default;
  }
`;

const ChangeVideo = styled.div`
  position: absolute;
  top: 0;
  height: 88%;
  line-height: 100vh;
  z-index: 1;
  /* cursor: pointer; */
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
