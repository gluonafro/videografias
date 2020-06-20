import React, { useEffect, useState, useRef } from "react";

const Draggable = ({ initialPos = 0 }) => {
  const [pos, setPos] = useState(initialPos);
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState(null);

  const Bola = useRef();

  // we could get away with not having this (and just having the listeners on
  // our div), but then the experience would be possibly be janky. If there's
  // anything w/ a higher z-index that gets in the way, then you're toast,
  // etc.

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  }, [dragging]);

  // calculate relative position to the mouse and set dragging=true
  const onMouseDown = (e) => {
    if (e.button !== 0) return; // only left mouse button
    console.log(e.pageX);
    var pos = Bola.current.offsetLeft;
    console.log(pos);
    setDragging(true);
    setRel(e.pageX - pos);
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseUp = (e) => {
    console.log("asassasas");
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    setPos(e.pageX - rel);
    e.stopPropagation();
    e.preventDefault();
  };
  console.log(dragging);

  return (
    <div
      ref={Bola}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{ position: "absolute", left: pos + "px" }}
    ></div>
  );
};

export default Draggable;
