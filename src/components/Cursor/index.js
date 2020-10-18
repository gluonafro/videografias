import React, { useState, useEffect } from 'react';
import './style.css'

const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
};

const Cursor = ({state}) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        addEventListeners();
        handleLinkHoverEvents();
        handleButtonHoverEvents();
        handlePointerHoverEvents();
        return () => removeEventListeners();
    }, [state]);

    if (typeof navigator !== "undefined" && isMobile()) return null;

    const addEventListeners = () => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", onMouseEnter);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setHidden(false)
    };

    const onMouseDown = () => {
        setClicked(true);
        setHidden(false)
    };

    const onMouseUp = () => {
        setClicked(false);
        setLinkHovered(false)
        setHidden(false)
    };

    const onMouseLeave = () => {
        setHidden(true);
    };

    const onMouseEnter = () => {
        setHidden(false);
    };

    const handleLinkHoverEvents = () => {
        document.querySelectorAll("a").forEach((el) => {
            el.addEventListener("mouseover", () => setLinkHovered(true));
            el.addEventListener("mouseout", () => setLinkHovered(false));
        });
    };

    const handleButtonHoverEvents = () => {
        document.querySelectorAll("button").forEach((el) => {
            el.addEventListener("mouseover", () => setLinkHovered(true));
            el.addEventListener("mouseout", () => setLinkHovered(false));
        });
    };

    const handlePointerHoverEvents = () => {
        Array.from(document.getElementsByClassName("pointer")).forEach((el) => {
                el.addEventListener("mouseover", () => setLinkHovered(true));
                el.addEventListener("mouseout", () => setLinkHovered(false));
        });
    };

    const cursorClasses = () => {
        return `cursor${clicked ? ' cursor--clicked' : ''}${hidden ? ' cursor--hidden' : ''}${linkHovered ? ' cursor--link-hovered' : ''}`
    }

    return (
        <div
            className={cursorClasses()}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        />
    );
};

export default Cursor;