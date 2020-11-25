import React from "react";
import styled from "styled-components";
import Main from "../components/HorizontalMain";
import Header from "../containers/Header";
import Cursor from "../components/Cursor/index";
import { responsive } from "../resources/constants.json";
import ScrollToTop from "../components/ScrollToTop";
import { useLanguage, useTranslate } from "../contexts/languageContext";

const MesasRedondas = ({ match }) => {
  const lang = useLanguage();
  const t = useTranslate();
  return (
    <>
      <Header match={match} />
      <Main>
        <Wrapper className="extraLarge">
          <p dangerouslySetInnerHTML={{ __html: t("textoMesasRedondas") }}></p>
          <br />
          <a
            href={
              lang === "es"
                ? "https://www.accademiaspagna.org/mesas-redondas-rv/"
                : "https://www.accademiaspagna.org/mesas-redondas-rv/?lang=it"
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{ borderBottom: "1px solid #ececec" }}
          >
            {t("masInfo")}
          </a>
        </Wrapper>
      </Main>
      <Cursor />
      <ScrollToTop />
    </>
  );
};

export default MesasRedondas;

const Wrapper = styled.div`
  height: calc(100% - 15vh - 6rem);
  padding-top: calc(15vh + 6rem);
  margin-left: 60px;
  width: 655px;
  @media screen and (min-width: ${responsive.tablet}px) {
    margin-left: 180px;
  }
  @media screen and (min-width: ${responsive.large}px) {
    width: 910px;
  }
  @media screen and (min-width: ${responsive.extraLarge}px) {
    margin-left: 335px;
  }
  @media screen and (max-width: ${responsive.mobile}px) {
    padding: 15rem 1rem 15rem 1rem;
    margin: 0;
    height: auto;
    width: calc(100% - 2rem);
  }
`;
