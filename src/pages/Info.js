import React from "react";
import styled from "styled-components";
import Header from "../containers/Header";
import { useTranslate } from "../contexts/languageContext";

const Info = ({ match }) => {
  const t = useTranslate();
  return (
    <>
      <Header match={match} />
      <main style={{ height: "calc(100vh - 6rem)" }}>
        <SWrapper>
          <div className="scrollSection extraLarge">{t("textoInfo")}</div>
        </SWrapper>
      </main>
    </>
  );
};

export default Info;

const SWrapper = styled.section`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 100%;
  .scrollSection {
    flex: 0 0 auto;
    width: 60vw;
    margin: auto 10vw;
  }
  .useTip {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
  }
`;
