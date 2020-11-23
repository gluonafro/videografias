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
        <Wrapper className="extraLarge">Próximamente...</Wrapper>
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
  @media screen and (min-width: ${responsive.extraLarge}px) {
    margin-left: 340px;
  }
  @media screen and (max-width: ${responsive.tablet}px) {
    padding: 15rem 1rem 2rem 1rem;
    margin: 0;
    height: auto;
  }
`;
