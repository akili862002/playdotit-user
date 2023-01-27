/**
 * @TODO
 *  [ ] convert svg to jsx - Come here: https://magic.reactjs.net/htmltojsx.html
 *  [ ] replace all fill="..." to  fill="currentColor" (except fill=none)
 *  [ ] add {...props} to <svg >
 */

import { IIconSVGProps } from "@/typings";

const DVDIcon: React.FC<IIconSVGProps> = props => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.9953 1.00385C7.72332 1.00385 0.996094 7.73105 0.996094 16.0031C0.996094 24.275 7.72332 31.0023 15.9953 31.0023C24.2673 31.0023 30.9945 24.275 30.9945 16.0031C30.9945 7.73105 24.2673 1.00385 15.9953 1.00385ZM15.9953 2.99593C23.1865 2.99593 29.0024 8.81187 29.0024 16.0031C29.0024 23.1942 23.1865 29.0024 15.9953 29.0024C8.80414 29.0024 2.99599 23.1942 2.99599 16.0031C2.99599 8.81187 8.80414 2.99593 15.9953 2.99593ZM15.9992 4.99973C9.93625 4.99973 4.99979 9.93621 4.99979 15.9992C4.99792 16.1317 5.0224 16.2632 5.07181 16.3862C5.12122 16.5091 5.19458 16.6211 5.28762 16.7154C5.38066 16.8098 5.49152 16.8847 5.61378 16.9359C5.73603 16.987 5.86722 17.0133 5.99974 17.0133C6.13226 17.0133 6.26345 16.987 6.3857 16.9359C6.50795 16.8847 6.61882 16.8098 6.71186 16.7154C6.8049 16.6211 6.87826 16.5091 6.92767 16.3862C6.97708 16.2632 7.00156 16.1317 6.99969 15.9992C6.99969 11.017 11.0171 6.99963 15.9992 6.99963C16.1317 7.0015 16.2633 6.97702 16.3862 6.92761C16.5092 6.8782 16.6211 6.80484 16.7155 6.7118C16.8098 6.61876 16.8848 6.50789 16.9359 6.38564C16.9871 6.26339 17.0134 6.1322 17.0134 5.99968C17.0134 5.86716 16.9871 5.73597 16.9359 5.61371C16.8848 5.49146 16.8098 5.3806 16.7155 5.28756C16.6211 5.19452 16.5092 5.12116 16.3862 5.07175C16.2633 5.02234 16.1317 4.99786 15.9992 4.99973V4.99973ZM15.9953 10.9975C13.2459 10.9975 10.9975 13.2536 10.9975 16.0031C10.9975 18.7525 13.2459 21.0009 15.9953 21.0009C18.7447 21.0009 21.0009 18.7525 21.0009 16.0031C21.0009 13.2536 18.7447 10.9975 15.9953 10.9975ZM15.9953 12.9993C17.6639 12.9993 19.001 14.3345 19.001 16.0031C19.001 17.6717 17.6639 18.999 15.9953 18.999C14.3267 18.999 12.9994 17.6717 12.9994 16.0031C12.9994 14.3345 14.3267 12.9993 15.9953 12.9993ZM25.9831 14.9855C25.7182 14.9897 25.4658 15.0987 25.2813 15.2888C25.0967 15.4788 24.9951 15.7343 24.9988 15.9992C24.9988 20.9813 20.9814 24.9987 15.9992 24.9987C15.8667 24.9968 15.7352 25.0213 15.6122 25.0707C15.4892 25.1201 15.3773 25.1935 15.283 25.2865C15.1886 25.3796 15.1137 25.4904 15.0625 25.6127C15.0114 25.7349 14.985 25.8661 14.985 25.9986C14.985 26.1312 15.0114 26.2624 15.0625 26.3846C15.1137 26.5069 15.1886 26.6177 15.283 26.7108C15.3773 26.8038 15.4892 26.8772 15.6122 26.9266C15.7352 26.976 15.8667 27.0005 15.9992 26.9986C22.0622 26.9986 26.9986 22.0621 26.9986 15.9992C27.0005 15.8654 26.9754 15.7326 26.925 15.6087C26.8746 15.4847 26.7999 15.3722 26.7052 15.2776C26.6105 15.1831 26.4978 15.1086 26.3737 15.0584C26.2497 15.0082 26.1169 14.9835 25.9831 14.9855V14.9855Z"
      fill="currentColor"
    />
  </svg>
);

export default DVDIcon;