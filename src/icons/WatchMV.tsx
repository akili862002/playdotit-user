import { IIconSVGProps } from "@/typings";

const WatchMVIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 4V20V4ZM17 4V20V4ZM3 8H7H3ZM17 8H21H17ZM3 12H21H3ZM3 16H7H3ZM17 16H21H17ZM4 20H20C20.2652 20 20.5196 19.8946 20.7071 19.7071C20.8946 19.5196 21 19.2652 21 19V5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5V19C3 19.2652 3.10536 19.5196 3.29289 19.7071C3.48043 19.8946 3.73478 20 4 20Z"
      stroke="#A4ABB8"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default WatchMVIcon;
