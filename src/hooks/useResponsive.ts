import { useState } from "react";
import { useEventListener } from "./useEventListener";

export const useResponsive = () => {
  const [downPhone, setDownPhone] = useState(false);

  useEventListener(
    "resize",
    () => {
      const widthScr = window.innerWidth;
      setDownPhone(widthScr <= 600 ? true : false);
    },
    {
      runInFirstRender: true,
    },
  );

  return { downPhone };
};
