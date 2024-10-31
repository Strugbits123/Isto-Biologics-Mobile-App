import * as React from "react";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
const CrownFrameIcon = ({ width, height }) => (
  <Svg
  viewBox="0 0 94 92" 
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
  >
    <Path
      fill="url(#a)"
      d="M59.2 18.453a1.1 1.1 0 0 1-.134-1.403l8.965-13.098c.594-.867 1.95-.487 2.005.563l.461 8.705a1.1 1.1 0 0 0 1.383 1.003l8.89-2.39a1.1 1.1 0 0 1 1.35 1.335l-2.295 8.915a1.1 1.1 0 0 0 1.018 1.373l8.71.368c1.05.044 1.444 1.396.583 1.998l-13.002 9.105a1.099 1.099 0 0 1-1.404-.12L59.2 18.454Z"
    />
    <Circle cx={37.5} cy={54.5} r={36.5} stroke="#F5A534" strokeWidth={2} />
    <Defs>
      <LinearGradient
        id="a"
        x1={85.55}
        x2={58.071}
        y1={7.308}
        y2={34.787}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFBD62" />
        <Stop offset={1} stopColor="#ED8E0A" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default CrownFrameIcon;