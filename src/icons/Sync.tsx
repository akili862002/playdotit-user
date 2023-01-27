/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "@/typings";

const SyncIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.2241 13.9448V12.4898C21.2241 7.66895 17.3062 3.75977 12.4741 3.75977C11.1596 3.75815 9.8617 4.05305 8.67696 4.62251C7.49222 5.19197 6.45118 6.02133 5.63135 7.04883M3.75 11.0527V12.5078C3.75 17.334 7.66602 21.2402 12.5 21.2402C13.8107 21.2383 15.1045 20.944 16.2871 20.3788C17.4697 19.8135 18.5113 18.9915 19.3359 17.9727"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.4375 12.5L21.2891 14.6484L19.043 12.5M1.5625 12.5L3.71094 10.3516L5.95703 12.5H1.5625Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SyncIcon;
