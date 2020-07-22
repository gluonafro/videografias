import React from "react";

const ArrowCircle = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44.409"
      height="44.409"
      viewBox="0 0 44.409 44.409"
    >
      <g transform="translate(-667.867 161.196)">
        <path
          d="M707.854-135.656h-20.33l8.733-10.048-2.123-1.825-11.412,13.276h0l11.423,13.266,2.121-1.826-8.745-10.045h20.332Z"
          transform="translate(-5.216 -4.734)"
          fill={color ? color : "#e2e1e1"}
        />
        <g fill="none" strokeMiterlimit="10">
          <path
            d="M690.071-159.2a20.227,20.227,0,0,0-20.2,20.2,20.227,20.227,0,0,0,20.2,20.2,20.227,20.227,0,0,0,20.2-20.2A20.228,20.228,0,0,0,690.071-159.2Z"
            stroke="none"
          />
          <path
            d="M 690.0712890625 -159.1960144042969 C 678.93017578125 -159.1960144042969 669.8670043945313 -150.1322631835938 669.8670043945313 -138.9911193847656 C 669.8670043945313 -127.8499908447266 678.93017578125 -118.786865234375 690.0712890625 -118.786865234375 C 701.21240234375 -118.786865234375 710.276123046875 -127.8499908447266 710.276123046875 -138.9911193847656 C 710.276123046875 -150.1322631835938 701.21240234375 -159.1960144042969 690.0712890625 -159.1960144042969 M 690.0712890625 -161.1960144042969 C 702.3150634765625 -161.1960144042969 712.276123046875 -151.2349243164063 712.276123046875 -138.9911193847656 C 712.276123046875 -126.7476501464844 702.3150634765625 -116.786865234375 690.0712890625 -116.786865234375 C 677.8278198242188 -116.786865234375 667.8670043945313 -126.7476501464844 667.8670043945313 -138.9911193847656 C 667.8670043945313 -151.2349243164063 677.8278198242188 -161.1960144042969 690.0712890625 -161.1960144042969 Z"
            stroke="none"
            fill="#e2e1e1"
          />
        </g>
      </g>
    </svg>
  );
};

export default ArrowCircle;
