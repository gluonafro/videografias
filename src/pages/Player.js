import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { data } from "../resources/data.json";
import getNext from "../utils/getNext";
import { useTranslate } from "../contexts/languageContext";
import InfoVideo from "../components/InfoVideo";
import { TweenMax } from "gsap";
import ArrowCircle from "../assets/svg/ArrowCircle";
import ArrowSmall from "../assets/svg/ArrowSmall";
import NextVideo from "../assets/svg/NextVideo";

const Player = ({ match, active, setActive, orderedData }) => {
  const [videoInfo, setVideoInfo] = useState({ isOpen: false, isBio: false });
  const [arrowHover, setArrowHover] = useState({
    back: false,
    next: false,
    prev: false,
    tabs: false,
  });
  const Video = useRef(null);
  const VideosPlayer = useRef(null);
  const InfosVideo = useRef(null);
  const t = useTranslate();

  useEffect(() => {
    if (Video.current) Video.current.play();
  }, [Video]);

  const currentVideo = data[match.params.id];
  const nextVideo = getNext(active, data.length, true);
  const prevVideo = getNext(active, data.length, false);

  useEffect(() => {
    if (videoInfo.isOpen) {
      TweenMax.fromTo(
        InfosVideo.current,
        0.1,
        { width: 50 },
        { width: "30vw" }
      );
      TweenMax.fromTo(
        VideosPlayer.current,
        0.1,
        { width: "calc(100% - 51px)" },
        { width: "70%" }
      );
    } else {
      TweenMax.fromTo(
        InfosVideo.current,
        0.1,
        { width: "30vw" },
        { width: 50 }
      );
      TweenMax.fromTo(
        VideosPlayer.current,
        0.1,
        { width: "70%" },
        { width: "calc(100% - 51px)" }
      );
    }
  }, [videoInfo.isOpen]);

  return (
    <main>
      <Container className="large">
        <InfoTabs ref={InfosVideo}>
          {videoInfo.isOpen && (
            <InfoVideo video={currentVideo} isBio={videoInfo.isBio} t={t} />
          )}
          <Tabs isOpen={videoInfo.isOpen}>
            <button
              onClick={() => {
                setVideoInfo({ isOpen: true, isBio: false });
              }}
            >
              <div
                className={`textoBoton ${
                  !videoInfo.isBio && videoInfo.isOpen && "underline"
                }`}
              >
                {t("sinopsisObra")}
              </div>
            </button>
            {videoInfo.isOpen && (
              <div
                onClick={() => {
                  setVideoInfo({ ...videoInfo, isOpen: false });
                }}
                className="flechaCerrar"
                onMouseOver={() => setArrowHover({ ...arrowHover, tabs: true })}
                onMouseLeave={() =>
                  setArrowHover({ ...arrowHover, tabs: false })
                }
              >
                <ArrowSmall color={arrowHover.tabs && "#fff"} />
              </div>
            )}
            <button
              onClick={() => {
                setVideoInfo({ isOpen: true, isBio: true });
              }}
            >
              <div
                className={`textoBoton ${
                  videoInfo.isBio && videoInfo.isOpen && "underline"
                }`}
              >
                {t("bioArtista")}
              </div>
            </button>
          </Tabs>
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
              <NextVideo color={arrowHover.prev && "#fff"} />
            </ChangeVideo>
          </Link>
          <video
            src={data[match.params.id].link}
            ref={Video}
            height="100%"
            width="100%"
            controls
            controlsList="nodownload"
            disablePictureInPicture
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
              onMouseOver={() => setArrowHover({ ...arrowHover, next: true })}
              onMouseLeave={() => setArrowHover({ ...arrowHover, next: false })}
            >
              <NextVideo rotate="right" color={arrowHover.next && "#fff"} />
            </ChangeVideo>
          </Link>
        </VideoPlayer>
        <BackArrow
          onMouseOver={() => setArrowHover({ ...arrowHover, back: true })}
          onMouseLeave={() => setArrowHover({ ...arrowHover, back: false })}
        >
          <Link to="/expo">
            <ArrowCircle color={arrowHover.back && "#fff"} />
          </Link>
        </BackArrow>
      </Container>
    </main>
  );
};

export default Player;

const Container = styled.div`
  width: 100%;
  height: auto;
  background: #000;
  display: flex;
  overflow: hidden;
`;

const InfoTabs = styled.div`
  height: auto;
  display: flex;
  left: 0;
  top: 0;
  height: 100vh;
`;

const Tabs = styled.div`
  width: 5rem;
  z-index: 1;
  border-right: 1px solid #fff;
  button {
    width: 100%;
    height: ${({ isOpen }) => (isOpen ? "45%" : "50%")};
    display: flex;
    .textoBoton {
      writing-mode: vertical-lr;
      line-height: 5rem;
      margin: auto;
      :hover {
        text-decoration: underline;
      }
    }
    .underline {
      text-decoration: underline;
    }
  }
  .flechaCerrar {
    height: 10%;
    line-height: 10vh;
    text-align: center;
    cursor: pointer;
    background: #000;
    transform: rotate(180deg);
    :hover svg {
      transform: scale(1.1);
    }
  }
`;

const VideoPlayer = styled.div`
  height: 100vh;
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
