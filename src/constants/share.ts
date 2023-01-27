export const SHARED_SIGN = "@shared";

export const shareSignFormat = (code: string) => {
  return `${code}${SHARED_SIGN}`;
};
