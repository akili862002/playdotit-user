import { IIconSVGProps } from "@/typings";

const ReportIcon: React.FC<IIconSVGProps> = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={"w-2.5 h-2.5 " + className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...rest}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default ReportIcon;
