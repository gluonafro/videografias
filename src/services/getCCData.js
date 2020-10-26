/* eslint-disable no-nested-ternary */
import { curators } from "../resources/data.json";
import centros from "../resources/centros.json";
import tooltipMapa from "../components/tooltipMapa";
import isFirefox from "../utils/isFirefox";

function getOption(isDesktop) {
  const option = {
    baseOption: {
      series: [
        {
          type: "map",
          mapType: "countries",
          aspectScale: 1,
          zoom: 2,
          center: [-45, 0],
          roam: isFirefox() ? false : true,
          scaleLimit: {
            min: 2,
            max: 10,
          },
          label: {
            show: false,
          },
          itemStyle: {
            backgroundColor: "#ececec",
            emphasis: {
              areaColor: "#ececec",
            },
          },
          markPoint: {
            symbolSize: 14,
            itemStyle: {
              color: "red",
              borderWidth: 0.5,
              borderColor: "#000",
            },
            animation: false,
            data: centros,
          },
        },
      ],
      title: {
        show: true,
        text: "Red de Centros Culturales",
        textStyle: {
          color: "#ececec",
          fontWeight: "bold",
          fontFamily: "Inter",
          fontSize: 16,
        },
        left: "center",
        top: 10,
        backgroundColor: "#000",
        borderColor: "#ececec",
        borderWidth: 1.25,
      },
      tooltip: tooltipMapa(),
    },
  };
  return option;
}

export { getOption };
