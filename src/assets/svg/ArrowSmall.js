import React from "react";

const ArrowSmall = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12.523"
      height="13.227"
      viewBox="0 0 12.523 13.227"
    >
      <path
        d="M695.245-141.612H685.114l4.352-5.007-1.058-.909-5.687,6.615h0l5.692,6.611,1.057-.91-4.358-5.006h10.132Z"
        transform="translate(695.245 -134.302) rotate(180)"
        fill={color ? color : "#e2e1e1"}
      />
    </svg>
  );
};

export default ArrowSmall;
