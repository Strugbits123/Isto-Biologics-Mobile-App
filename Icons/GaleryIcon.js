import * as React from "react";
import Svg, { Rect, Path, Circle } from "react-native-svg";

const GalleryIcon = ({ width, height }) => (
  <Svg
    viewBox="0 0 50 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <Rect x="2" y="2" width="46" height="41" rx="3" fill="#E8ECF4" stroke="#00293F" strokeWidth="2" />
    <Path
      d="M10 34 L20 24 L28 31 L37 22 L46 34"
      stroke="#00293F"
      strokeWidth="2"
      fill="none"
    />
    <Circle cx="15" cy="12" r="4" fill="#00293F" />
  </Svg>
);

export default GalleryIcon;
