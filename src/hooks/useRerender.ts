import { useCallback, useState } from "react";

export const useRerender = () => {
  const [isRerender, setBool] = useState(false);
  const rerender = useCallback(() => {
    setBool((prev) => !prev);
  }, []);
  return { isRerender, rerender };
};
