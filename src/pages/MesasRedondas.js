import React from "react";
import styled from "styled-components";
import Main from "../components/HorizontalMain";
import Header from "../containers/Header";
import Cursor from "../components/Cursor/index";
import { responsive } from "../resources/constants.json";

const MesasRedondas = ({ match }) => {
  return (
    <>
      <Header match={match} />
      <Main>
        <Wrapper className="extraLarge">
          <p>
            Estas mesas redondas expondrán y justificarán las líneas de
            investigación paralelas a la puesta en marcha de la exposición
            online Reactivando <strong>Videografías</strong> a través una
            propuesta de debates y de investigación vinculadas y a desarrollar
            entre noviembre de 2020 y enero de 2022.
          </p>
          <br />
          <a
            href="https://www.accademiaspagna.org/mesas-redondas-rv/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ borderBottom: "1px solid #ececec" }}
          >
            Más información
          </a>
        </Wrapper>
      </Main>
      <Cursor />
    </>
  );
};

export default MesasRedondas;

const Wrapper = styled.div`
  height: calc(100% - 15vh - 6rem);
  padding-top: calc(15vh + 6rem);
  margin-left: 180px;
  width: 650px;
  @media screen and (min-width: ${responsive.large}px) {
    width: 900px;
  }
  @media screen and (min-width: ${responsive.extraLarge}px) {
    margin-left: 335px;
  }
  @media screen and (max-width: ${responsive.tablet}px) {
    padding: 15rem 1rem 2rem 1rem;
    margin: 0;
    height: auto;
  }
`;
