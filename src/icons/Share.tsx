import { IIconSVGProps } from "@/typings";

const ShareIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    width="57"
    height="57"
    viewBox="0 0 57 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M31.2407 7V18.2174C14.3297 19.945 8.18308 27.5692 3 50C11.2883 36.7719 17.338 32.9667 31.2407 31.3043V42.5217L53 24.7609L31.2407 7Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShareIcon;
