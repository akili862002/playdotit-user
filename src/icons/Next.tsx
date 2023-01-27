import { IIconSVGProps } from "@/typings";

const NextIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.01364 6.35879C8.01364 5.58899 8.84698 5.10786 9.51364 5.49276L20.3937 11.7744C21.0603 12.1593 21.0603 13.1215 20.3937 13.5064L9.51364 19.788C8.84698 20.1729 8.01364 19.6918 8.01364 18.922L8.01364 6.35879Z"
      fill="currentColor"
    />
    <rect x="22" y="5" width="2" height="15" rx="1" fill="currentColor" />
  </svg>
);

export default NextIcon;
