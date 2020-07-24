import React from "react";

const NextVideo = ({ rotate }) => {
  return rotate === "right" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36.896"
      height="38.388"
      viewBox="0 0 36.896 38.388"
    >
      <g transform="translate(0)">
        <path
          d="M-822.6-164.192l27.038-19.194L-822.6-202.58Z"
          transform="translate(822.601 202.58)"
          fill="#ececec"
        />
        <rect
          width="7.994"
          height="35.518"
          transform="translate(28.901 1.435)"
          fill="#ececec"
        />
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36.895"
      height="38.388"
      viewBox="0 0 36.895 38.388"
    >
      <path
        d="M-795.563-164.192-822.6-183.386l27.038-19.194Z"
        transform="translate(832.458 202.58)"
        fill="#ececec"
      />
      <rect
        width="7.994"
        height="35.518"
        transform="translate(0 1.435)"
        fill="#ececec"
      />
    </svg>
  );
};

export default NextVideo;
