import classnames, { Argument } from "classnames";
import { twMerge } from "tailwind-merge";

/**
 * @description
 *  - For merge classnames and tailwind merge: twMerge(classnames(...args))
 *  - Check classnames lib:
 *  - tailwind-merge: https://www.npmjs.com/package/tailwind-merge
 *  - classnames: https://www.npmjs.com/package/classnames
 *
 * @example
 *  cn("text-primary-white bg-white", "focus:text-lg focus:ring-2")
 *  => "text-primary-white bg-white focus:text-lg focus:ring-2"
 *
 *  cn("bg-white bg-black")
 *  => "bg-black"
 */
export const cn = (...args: Argument[]): string => {
  if (args.length === 1 && typeof args[0] === "string") return args[0];
  if (args.length === 2 && typeof args[0] === "string" && !args[1])
    return args[0];

  return twMerge(classnames(...args));
};
