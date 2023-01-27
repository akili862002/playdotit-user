import { LANGUAGE_KEY } from "@/constants/language";
import i18n, {
  ILanguageAreas,
  ILanguageCodes,
  ILanguageJson,
  _t,
} from "@/i18n";
import EventEmitter from "events";
import { useCallback, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useRerender } from "./useRerender";

const MODIFY_LANGUAGE = "MODIFY_LANGUAGE";

const event = new EventEmitter();

/**
 * Use this to get
 */
export const useLocales = <T extends ILanguageAreas>(areas: T[]) => {
  const { rerender } = useRerender();

  useEffect(() => {
    event.on(MODIFY_LANGUAGE, () => {
      rerender();
    });
  }, []);

  const t = useCallback(
    (key: NestedObjectLessPaths<Pick<ILanguageJson, T>>) => {
      return _t(key);
    },
    [i18n]
  );

  return { t, language: i18n.language };
};

export const useModifyLanguage = () => {
  const { rerender } = useRerender();
  const [languageState, setLanguageState] = useLocalStorage(LANGUAGE_KEY, "");
  const modifyLanguage = useCallback((toLang: ILanguageCodes) => {
    i18n.changeLanguage(toLang, () => {
      event.emit(MODIFY_LANGUAGE);
      setLanguageState(toLang);
      rerender();
    });
  }, []);

  return { modifyLanguage, language: i18n.language };
};
