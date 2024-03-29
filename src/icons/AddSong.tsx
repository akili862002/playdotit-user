import { IIconSVGProps } from "@/typings";

const AddSongIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.75 12H5.25M12 5.25V18.75V5.25Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default AddSongIcon;
