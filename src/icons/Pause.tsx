import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { IIconSVGProps } from "@/typings";

const PauseIcon: React.FC<IIconSVGProps> = (props) => {
  const { isDarkMode } = useSelector((state: IRootState) => state.common);

  return (
    <svg
      width={78}
      height={78}
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_285_604)">
        <circle cx={39} cy={39} r={29} fill={isDarkMode ? "white" : "#171C26"} />
      </g>
      <path
        d="M35.9062 32.3125H36.625V46.6875H35.9062V32.3125ZM42.375 32.3125H43.0938V46.6875H42.375V32.3125Z"
        stroke={!isDarkMode ? "white" : "#171C26"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_285_604"
          x={0}
          y={0}
          width={78}
          height={78}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0125 0 0 0 0 0.0125 0 0 0 0 0.0125 0 0 0 0.32 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_285_604"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_285_604"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default PauseIcon;
