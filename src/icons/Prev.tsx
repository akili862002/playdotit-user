import { IIconSVGProps } from "@/typings";

const PrevIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.2666 6.35883C17.2666 5.58902 16.4333 5.10788 15.7666 5.49278L4.88687 11.7744C4.22022 12.1593 4.22023 13.1215 4.88689 13.5064L15.7666 19.788C16.4333 20.1729 17.2666 19.6918 17.2666 18.922L17.2666 6.35883Z"
      fill="currentColor"
    />
    <rect
      width="1.99995"
      height="15"
      rx="0.999975"
      transform="matrix(-1 0 0 1 3.28064 5)"
      fill="currentColor"
    />
  </svg>
);

export default PrevIcon;
