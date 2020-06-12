import { useState, useEffect, useCallback } from "react";
export default function useWindowWidth() {
  const getWidth = useCallback(() => {
    return {
      width: window.innerWidth,
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(getWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWidth());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getWidth]);
  return windowWidth;
}
