import { IIconSVGProps } from "@/typings";

const RemoveSongIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.7435 8.19758L8.19759 17.7435M8.19759 8.19758L17.7435 17.7435L8.19759 8.19758Z"
      stroke="white"
      strokeLinecap="round"
      strokeWidth="round"
    />
  </svg>
);

export default RemoveSongIcon;
