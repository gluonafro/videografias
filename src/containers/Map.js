import React, { useEffect, useRef, useState } from "react";
import Map from "../components/MapGeneral";
import { getOption } from "../services/getCCData";
import { useIsExtraLarge } from "../hooks/useMediaQuery";
import fetcher from "../utils/fetcher";
import { withRouter } from "react-router-dom";

const Mapa = (props) => {
  const stateRef = useRef({ x: 0, y: 0 });
  const isExtraLarge = useIsExtraLarge();

  const [mapaData, setMapaData] = useState({});

  useEffect(() => {
    fetcher("/assets/countries.json").then((res) => {
      setMapaData(res);
    });
  }, []);

  if (!mapaData.name) return <div style={{ width: "100%", height: 400 }} />;
  return (
    <Map
      option={getOption(isExtraLarge)}
      data={mapaData}
      width="100%"
      // height="200px"
      style={{
        width: isExtraLarge ? "850px" : "700px",
        height: "100%",
        margin: "0 auto",
      }}
      name="countries"
      events={getOnEvents(props.history)}
    />
  );
};

export default withRouter(Mapa);

const getOnEvents = (history) => {
  const onEvents = {
    click: (params) => {
      if (params.componentType === "markPoint" && params.data) {
        window.open(params.data.link, "_blank");
      }
    },
    // mouseover: (params) => {
    //   const hayEleccion = nomenclator.ambitos[elecMapa].some(
    //     (e) => e.c === params.name
    //   );
    //   if (params.data) {
    //     hayEleccion
    //       ? (params.event.event.target.style.cursor = "pointer")
    //       : (params.event.event.target.style.cursor = "default");
    //   }
    // },
  };
  return onEvents;
};
