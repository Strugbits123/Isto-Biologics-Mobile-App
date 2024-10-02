import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DocsTabIcon = ({ width, height }) => (
  <Svg
    viewBox="0 0 20 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <Path
      d="M3.9048 12H11.5238M3.9048 15.0477H14.5715M3.9048 18.0953H8.47622M19.1429 19.6191V8.95242L11.5238 1.33337H3.9048C3.09652 1.33337 2.32134 1.65446 1.7498 2.226C1.17827 2.79754 0.857178 3.57271 0.857178 4.38099V19.6191C0.857178 20.4274 1.17827 21.2025 1.7498 21.7741C2.32134 22.3456 3.09652 22.6667 3.9048 22.6667H16.0953C16.9036 22.6667 17.6787 22.3456 18.2503 21.7741C18.8218 21.2025 19.1429 20.4274 19.1429 19.6191Z"
      stroke="#6D698E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.5239 1.33337V5.9048C11.5239 6.71308 11.845 7.48826 12.4166 8.05979C12.9881 8.63133 13.7633 8.95242 14.5715 8.95242H19.143"
      stroke="#6D698E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default DocsTabIcon;
