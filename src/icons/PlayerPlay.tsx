import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { IIconSVGProps } from "@/typings";

const PlayerPlayIcon: React.FC<IIconSVGProps> = (props) => {
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
      <g filter="url(#filter0_d_49_1168)">
        <circle cx={39} cy={39} r={29} fill={isDarkMode ? "white" : "#171C26"} />
      </g>
      <path
        d="M34.0136 32.3588C34.0136 31.589 34.847 31.1079 35.5136 31.4928L46.3937 37.7744C47.0603 38.1593 47.0603 39.1215 46.3937 39.5064L35.5136 45.788C34.847 46.1729 34.0136 45.6918 34.0136 44.922L34.0136 32.3588Z"
        fill={isDarkMode ? "#171C26" : "white"}
      />
      <defs>
        <filter
          id="filter0_d_49_1168"
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
            result="effect1_dropShadow_49_1168"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_49_1168"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default PlayerPlayIcon;
