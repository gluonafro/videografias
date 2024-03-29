import centros from "../resources/centros.json";
import tooltipMapa from "../components/tooltipMapa";
import isFirefox from "../utils/isFirefox";

function getOption(isExtraLarge, t) {
  const option = {
    baseOption: {
      series: [
        {
          type: "map",
          mapType: "countries",
          aspectScale: 1,
          zoom: 2,
          center: [-35, 10],
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
            symbolSize: 22,
            itemStyle: {
              color: "#fdbb11",
              borderWidth: 0.5,
              borderColor: "#000",
              emphasis: {
                color: "#fff",
                borderWidth: 1,
              },
            },
            animation: false,
            data: centros,
          },
        },
      ],
      title: {
        show: true,
        text: t("redDeCentros"),
        textStyle: {
          color: "#ececec",
          fontWeight: "bold",
          fontFamily: "Inter",
          fontSize: isExtraLarge ? 21 : 17,
        },
        padding: [3, 5, 5, 5],
        textVerticalAlign: "top",
        left: "center",
        backgroundColor: "#000",
        borderColor: "#000",
        borderWidth: 6,
      },
      tooltip: tooltipMapa(),
    },
  };
  return option;
}

export { getOption };
