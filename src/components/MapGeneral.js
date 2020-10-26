import React, { useEffect, useRef } from "react";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/map";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/title";
import { bind, clear } from "size-sensor";
import useWindowWidth from "../hooks/useWindowWidth";

function useWindowWidthChange(callback) {
  const width = useWindowWidth();
  const prev = useRef();
  useEffect(() => {
    if (width !== prev.current) {
      prev.current = width;
      callback();
    }
  });
}

function Mapa({ name, data, option, events, ...rest }) {
  useEffect(() => {
    echarts.registerMap(name, data);
  }, [data, name]);

  // solves firefox timing issues around not loading fonts in canvas,
  // we have to wait for the fonts to be loaded and then repaint so the fonts are used
  useEffect(() => {
    const _ = document.fonts?.ready?.then?.(() => {
      chartRef.current.resize();
    });
  }, []);

  const chartRef = useRef();
  const divRef = useRef();

  useWindowWidthChange(() => {
    setTimeout(() => {
      chartRef.current.resize();
    }, 300);
  });
  useEffect(() => {
    chartRef.current = echarts.init(divRef.current);
    if (events) bindEvents(chartRef.current, events);
    return () => chartRef.current.dispose();
  }, [divRef, events, chartRef]);

  useEffect(() => {
    bind(divRef.current, () => {
      chartRef.current.resize();
    });
    return () => clear(divRef.current);
  }, []);

  useEffect(() => {
    chartRef.current.setOption(option);
  }, [option]);
  return (
    <div
      ref={(node) => {
        divRef.current = node;
      }}
      {...rest}
    />
  );
}

export default Mapa;

function bindEvents(element, events) {
  for (const [event, fn] of Object.entries(events)) {
    element.on(event, (x) => {
      fn(x, element);
    });
  }
}
