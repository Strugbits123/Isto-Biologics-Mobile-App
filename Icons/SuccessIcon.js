import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const SuccessIcon = ({ width, height }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="green"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={width}
    height={height}
  >
    <Circle cx={12} cy={12} r={10} />
    <Path d="M9 12l2 2 4-4" />
  </Svg>
)
export default SuccessIcon
