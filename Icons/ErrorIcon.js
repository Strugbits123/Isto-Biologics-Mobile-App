import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const ErrorIcon = ({ width, height, color="red" }) => (
  <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color} // Color is dynamic and defaults to "red"
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
