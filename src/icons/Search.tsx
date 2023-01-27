import { IIconSVGProps } from "@/typings";

const SearchIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.63638 2.5C7.42273 2.5 6.23633 2.85989 5.22722 3.53416C4.2181 4.20843 3.43159 5.16679 2.96715 6.28806C2.5027 7.40932 2.38118 8.64314 2.61796 9.83347C2.85473 11.0238 3.43916 12.1172 4.29734 12.9754C5.15552 13.8335 6.24891 14.418 7.43924 14.6547C8.62957 14.8915 9.86338 14.77 10.9846 14.3056C12.1059 13.8411 13.0643 13.0546 13.7385 12.0455C14.4128 11.0364 14.7727 9.84998 14.7727 8.63633C14.7726 7.0089 14.1261 5.44817 12.9753 4.2974C11.8245 3.14664 10.2638 2.5001 8.63638 2.5V2.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
    />
    <path
      d="M13.2144 13.2145L17.5 17.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);

export default SearchIcon;
