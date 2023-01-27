import { useEffect, useState } from "react";

export const useActiveElement = () => {
  const [activeElement, setActiveElement] = useState<Element | null>(null);

  const handleFocusIn = (e: FocusEvent) => {
    setActiveElement(document.activeElement);
  };

  const handleFocusOut = (e: FocusEvent) => {
    setActiveElement(null);
  };

  useEffect(() => {
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return activeElement;
};
