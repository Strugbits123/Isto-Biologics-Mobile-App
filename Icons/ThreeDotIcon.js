import * as React from "react"
import Svg, { Circle } from "react-native-svg"
const ThreeDotIcon = ({width, height}) => (
  <Svg
    viewBox="0 0 5 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <Circle cx={2.68108} cy={2.26433} r={1.84783} fill="#00293F" />
    <Circle cx={2.68109} cy={8.91643} r={1.84783} fill="#00293F" />
    <Circle cx={2.68109} cy={15.5688} r={1.84783} fill="#00293F" />
  </Svg>
)
export default ThreeDotIcon
