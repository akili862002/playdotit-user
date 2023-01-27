import { IIconSVGProps } from "@/typings";

const SmallPlayIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    width="13"
    height="15"
    viewBox="0 0 13 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.013643 1.35873C0.0136438 0.588928 0.846976 0.107803 1.51364 0.492703L12.3937 6.7743C13.0603 7.1592 13.0603 8.12145 12.3937 8.50635L1.51364 14.7879C0.846977 15.1728 0.0136433 14.6917 0.0136431 13.9219L0.013643 1.35873Z"
      fill="white"
    />
  </svg>
);

export default SmallPlayIcon;
