/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "typings";

const ShuffleIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.125 17.1875H7.28467C7.9277 17.1875 8.56078 17.0287 9.12772 16.7253C9.69467 16.4219 10.1779 15.9833 10.5347 15.4482L12.5 12.5M19.5312 14.8438L21.875 17.1875L19.5312 19.5312V14.8438ZM19.5312 5.46875L21.875 7.8125L19.5312 10.1562V5.46875Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.125 7.8125H7.28467C7.9277 7.81251 8.56078 7.97126 9.12772 8.27467C9.69467 8.57807 10.1779 9.01675 10.5347 9.55176L14.4653 15.4482C14.8221 15.9833 15.3053 16.4219 15.8723 16.7253C16.4392 17.0287 17.0723 17.1875 17.7153 17.1875H20.3125M20.3125 7.8125H17.7153C17.0723 7.81251 16.4392 7.97126 15.8723 8.27467C15.3053 8.57807 14.8221 9.01675 14.4653 9.55176L14.0625 10.1562"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShuffleIcon;
