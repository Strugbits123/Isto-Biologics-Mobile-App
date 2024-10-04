// import * as React from "react"
// import Svg, { Polygon, Line } from "react-native-svg"
// const WarningIcon = ({width, height}) => (
//   <Svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="orange"
//     strokeWidth={2}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     width={width}
//     height={height}
//   >
//     <Polygon points="12 2 2 22 22 22 12 2" />
//     <Line x1={12} y1={16} x2={12} y2={16} />
//     <Line x1={12} y1={8} x2={12} y2={8} />
//   </Svg>
// )
// export default WarningIcon


import * as React from "react";
import Svg, { Circle, Line } from "react-native-svg";

const WarningIcon = ({ width, height }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="orange"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={width}
    height={height}
  >
    {/* Outer circle */}
    <Circle cx={12} cy={12} r={10} />

    {/* "i" symbol: vertical line */}
    <Line x1={12} y1={8} x2={12} y2={14} />

    {/* "i" symbol: dot */}
    <Line x1={12} y1={16} x2={12} y2={16} />
  </Svg>
);

export default WarningIcon;

