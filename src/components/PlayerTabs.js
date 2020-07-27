import React, { useState } from "react";
import styled from "styled-components";
import { useIsMobile } from "../hooks/useMediaQuery";
import ArrowSmall from "../assets/svg/ArrowSmall";

const PlayerTabs = ({ videoInfo, setVideoInfo, t }) => {
  const [arrowHover, setArrowHover] = useState(false);
  const isMobile = useIsMobile();
  return (
    <Tabs isOpen={videoInfo.isOpen} isMobile={isMobile}>
      <button
        onClick={() => {
          setVideoInfo({ isOpen: true, isBio: false });
        }}
      >
        <span
          className={`textoBoton ${
            !videoInfo.isBio && videoInfo.isOpen && "underline"
          }`}
        >
          {t("sinopsisObra")}
        </span>
      </button>
      {videoInfo.isOpen && !isMobile && (
        <div
          onClick={() => {
            setVideoInfo({ ...videoInfo, isOpen: false });
          }}
          className="flechaCerrar"
          onMouseOver={() => setArrowHover(true)}
          onMouseLeave={() => setArrowHover(false)}
        >
          <ArrowSmall color={arrowHover && "#fff"} />
        </div>
      )}
      <button
        onClick={() => {
          setVideoInfo({ isOpen: true, isBio: true });
        }}
      >
        <span
          className={`textoBoton ${
            videoInfo.isBio && videoInfo.isOpen && "underline"
          }`}
        >
          {t("bioArtista")}
        </span>
      </button>
    </Tabs>
  );
};

export default PlayerTabs;

const Tabs = ({ children, isMobile }) =>
  isMobile ? <STabsMobile>{children}</STabsMobile> : <STabs>{children}</STabs>;

const STabs = styled.div`
  width: 5rem;
  z-index: 1;
  border-right: 1px solid #fff;
  button {
    height: ${({ isOpen }) => (isOpen ? "45%" : "50%")};
    display: flex;
    width: 5rem;
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

const STabsMobile = styled.div`
  display: flex;
  height: 5rem;
  margin-top: 1rem;
  button {
    width: 50%;
    text-align: center;
    color: #8f8f8f;
  }
  .underline {
    border-bottom: 1px solid #ececec;
  }
`;
