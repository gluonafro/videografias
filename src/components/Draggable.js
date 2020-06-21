import React, { useEffect, useState, useRef } from "react";
import usePrevious from "../hooks/usePrevious"

const Draggable = ({ initialPos = 0 }) => {
  const [pos, setPos] = useState(initialPos);
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState(null);

  const Bola = useRef();

  let prevDragging = usePrevious(dragging)

    // calculate relative position to the mouse and set dragging=true
    const onMouseDown = (e) => {
      if (e.button !== 0) return; // only left mouse button
      console.log("onmouseDOWN: drag -> " + dragging);
      console.log(e.pageX);
      var pos = Bola.current.offsetLeft;
      console.log(pos);
      setDragging(true);
      setRel(e.pageX - pos);
      e.stopPropagation();
      e.preventDefault();
    };
    const onMouseUp = (e) => {
      console.log("onmouseUP: drag -> " + dragging);
      setDragging(false);
      // console.log(dragging)
      e.stopPropagation();
      e.preventDefault();
    };
    const onMouseMove = (e) => {
      console.log('mousemove: drag -> ' + dragging)
      if (!dragging) return;
      setPos(e.pageX - rel);
      e.stopPropagation();
      e.preventDefault();
    };
  

  // we could get away with not having this (and just having the listeners on
  // our div), but then the experience would be possibly be janky. If there's
  // anything w/ a higher z-index that gets in the way, then you're toast,
  // etc.

  // useEffect(() => {
  //   // console.log(dragging)
  //   if (dragging && !prevDragging) {
  //     document.addEventListener("mousemove", onMouseMove)
  //     document.addEventListener("mouseup", onMouseUp);
  //     document.removeEventListener("mousedown", onMouseDown);
  //   } else if (!dragging && prevDragging) {
  //     document.removeEventListener("mousemove", onMouseMove);
  //     document.removeEventListener("mouseup", onMouseUp);
  //   }
  //   return () => setDragging(false)
  // }, [dragging]);

  useEffect(() => {
    console.log(dragging)
    document.addEventListener("mouseup", onMouseUp)
    // if (dragging) document.addEventListener("mousemove", onMouseMove)
    if (!dragging) {
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [dragging])



  return (
    <div
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
      ref={Bola}
      style={{ position: "absolute", left: pos + "px" }}
    ></div>
  );
};

export default Draggable;
