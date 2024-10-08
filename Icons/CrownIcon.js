import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const CrownIcon = ({ width, height }) => (
  <Svg
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    transform="rotate(-18)"
  >
    <Path
      d="M1.19984 15.4526C0.822222 15.079 0.765834 14.4888 1.06588 14.0504L10.0313 0.951985C10.6249 0.0847179 11.9804 0.465206 12.036 1.5147L12.4969 10.2196C12.5339 10.9178 13.2048 11.4045 13.88 11.223L22.7701 8.83282C23.583 8.61427 24.3298 9.35318 24.1199 10.1684L21.8245 19.0834C21.6502 19.7605 22.144 20.4261 22.8425 20.4557L31.5519 20.824C32.6019 20.8684 32.9968 22.2197 32.1359 22.8225L19.1336 31.9269C18.6985 32.2316 18.1077 32.1815 17.7301 31.8078L1.19984 15.4526Z"
      fill="url(#paint0_linear_154_5278)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_154_5278"
        x1={27.5499}
        y1={4.30776}
        x2={0.0706944}
        y2={31.787}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFBD62" />
        <Stop offset={1} stopColor="#ED8E0A" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default CrownIcon;
