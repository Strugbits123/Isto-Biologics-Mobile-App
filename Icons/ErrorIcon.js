// import * as React from "react"
// import Svg, { Circle, Path } from "react-native-svg"
// const ErrorIcon = ({width, height}) => (
//   <Svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="red"
//     strokeWidth={2}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     width={width}
//     height={height}
//   >
//     <Circle cx={12} cy={12} r={10} />
//     <Path d="M12 16v-2m0-4v2" />
//     <Path d="M12 14h0m-3-3h0m6 0h0" />
//   </Svg>
// )
// export default ErrorIcon


import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const ErrorIcon = ({ width, height }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="red"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={width}
    height={height}
  >
    {/* Outer circle */}
    <Circle cx={12} cy={12} r={10} />

    {/* Cross inside the circle */}
    <Path d="M15 9l-6 6" />
    <Path d="M9 9l6 6" />
  </Svg>
);

export default ErrorIcon;

