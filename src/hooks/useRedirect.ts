/**
 * @description This will help you redirect by using history
 *  - Make sure that you take url from /constants/routes/index.ts
 *    It will make sure that URL will consistently
 *  @example
 *    const Component = () => {
 *      const redirect = useRedirect();
 *      //....
 *      redirect(PATH.HOME)
 *    }
 */

import { PATHS } from "constants/routes";
import { useCallback } from "react";
import { useHistory } from "react-router";

export const useRedirect = () => {
  const history = useHistory();
  const redirect = useCallback((url: string, params: any = {}) => {
    if (!Object.values(PATHS).includes(url)) {
      console.error(new Error(`[Redirect] Not found route: "${url}"`));
      return;
    }

    if (params) {
      for (const key in params) {
        const value = params[key] || "-";
        url = url.replace(`/:${key}`, `/${value}`);
      }
    }

    history.push(url);
  }, []);

  return redirect;
};
