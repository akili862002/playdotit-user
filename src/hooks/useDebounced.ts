import { useMemo, useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "./useConstant";
import { useAsync } from "./useAsync";

// Generic reusable hook
export function useDebounced<T = any, P = any>(
  searchFunction: (text: string, payload?: P) => void,
  payload?: P,
  timeDebounced = 300,
  deps: any[] = [],
) {
  const [inputText, setInputText] = useState("");

  const debouncedSearchFunction = useConstant<any>(() =>
    AwesomeDebouncePromise(searchFunction, timeDebounced),
  );

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(async () => {
    if (inputText.length < 0) {
      return [];
    } else {
      return (debouncedSearchFunction(inputText, payload) as T[]) || [];
    }
  }, [debouncedSearchFunction, inputText]);

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    searchResults,
  };
}
