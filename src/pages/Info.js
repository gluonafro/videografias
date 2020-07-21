import React from "react";
import styled from "styled-components";
import Header from "../containers/Header";

const Info = ({ match }) => {
  return (
    <>
      <Header match={match} />
      <main>
        <div>Info</div>
      </main>
    </>
  );
};

export default Info;
