const tooltipMapa = (nomenclator, tipoMapa, stateRef) => {
  return {
    confine: true,
    padding: 0,
    // position: (point, params, dom, rect, size) =>
    //   calcTooltipPosition("top", rect, dom, stateRef),
    position: "top",
    formatter: function (params) {
      if (params.data)
        return `
      <div style="color: #ececec; background-color: #000; padding: 0.5rem; font-size: 1.4rem; border: 1px solid #ececec; font-family: 'Inter', 'Open Sans', 'Calibri', 'Georgia', 'Helvetica', 'sans-serif';" >
        <div>${params.data.instAbbr}</div>
      </div>`;
    },
  };
};

export default tooltipMapa;
