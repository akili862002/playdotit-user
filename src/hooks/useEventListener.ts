import { useEffect, useRef } from "react";

type IOption = {
  runInFirstRender: boolean;
};

export const useEventListener = <T>(
  event: string,
  callback: (e: T) => void,
  option?: IOption,
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (option?.runInFirstRender) callbackRef.current(null as any);

    const handler: any = (e: any) => callbackRef.current(e);
    window.addEventListener(event, handler);

    return () => window.removeEventListener(event, handler);
  }, [event]);
};
