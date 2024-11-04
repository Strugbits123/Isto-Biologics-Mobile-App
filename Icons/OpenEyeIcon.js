import * as React from "react";
import Svg, { Path } from "react-native-svg";
const OpenEyeIcon = ({ width, height }) => (
  <Svg
  viewBox="0 0 20 14"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
  >
    <Path
      fill="#6A707C"
      d="M1.323 8.22c.881-3.728 4.568-6.377 8.715-6.377 4.146 0 7.832 2.65 8.716 6.377a.574.574 0 0 0 .278.36.72.72 0 0 0 .487.082.655.655 0 0 0 .41-.246.514.514 0 0 0 .092-.428C19.016 3.748 14.813.705 10.038.705S1.06 3.748.055 7.988a.514.514 0 0 0 .093.428.655.655 0 0 0 .41.246.72.72 0 0 0 .486-.081.574.574 0 0 0 .279-.36Zm8.702-4.1c1.2 0 2.352.42 3.2 1.167.85.747 1.326 1.76 1.326 2.817 0 1.057-.477 2.07-1.326 2.817-.848.748-2 1.167-3.2 1.167-1.2 0-2.351-.42-3.2-1.167-.849-.747-1.326-1.76-1.326-2.817 0-1.057.477-2.07 1.326-2.817.849-.747 2-1.167 3.2-1.167Z"
    />
  </Svg>
);

export default OpenEyeIcon;
