import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const CustomTabBarBackground = ({width, height}) => (
  <Svg
    viewBox="0 0 534 194"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <G filter="url(#filter0_d_551_504)">
      <Path
        d="M53 71H160C160 71 129.272 71 177.559 71C225.846 71 211.031 121.482 265.354 121.482C319.677 121.482 307.605 71 356.441 71C405.277 71 374 71 374 71H481V158.795H53V71Z"
        fill="white"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default CustomTabBarBackground
