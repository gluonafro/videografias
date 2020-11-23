import React, { useEffect, useRef, useState } from "react";
import Map from "../components/MapGeneral";
import { getOption } from "../services/getCCData";
import { useIsExtraLarge } from "../hooks/useMediaQuery";
import fetcher from "../utils/fetcher";
import { withRouter } from "react-router-dom";
import { useTranslate } from "../contexts/languageContext";

const Mapa = (props) => {
  const stateRef = useRef({ x: 0, y: 0 });
  const isExtraLarge = useIsExtraLarge();
  const t = useTranslate();

  const [mapaData, setMapaData] = useState({});

  useEffect(() => {
    fetcher("/assets/countries.json").then((res) => {
      setMapaData(res);
    });
  }, []);

  if (!mapaData.name) return <div style={{ width: "100%", height: 400 }} />;
  return (
    <Map
      option={getOption(isExtraLarge, t)}
      data={mapaData}
      width="100%"
      // height="200px"
      style={{
        width: isExtraLarge ? "850px" : "700px",
        height: "100%",
        margin: "0 auto",
      }}
      name="countries"
      events={getOnEvents()}
    />
  );
};

export default withRouter(Mapa);

const getOnEvents = () => {
  const onEvents = {
    click: (params) => {
      if (params.componentType === "markPoint" && params.data) {
        window.open(params.data.link, "_blank");
      }
    },
  };
  return onEvents;
};
