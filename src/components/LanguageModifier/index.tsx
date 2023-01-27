import BaseButton from "@/components/BaseButton";
import { Tooltip } from "@/components/Tooltip";
import { useLocales, useModifyLanguage } from "@/hooks/useLanguage";
import { Fragment } from "react";

interface ILanguageModifierProps {}

const LanguageModifier: React.FC<ILanguageModifierProps> = (props) => {
  const { modifyLanguage, language } = useModifyLanguage();

  return (
    <div className="flex flex-row items-center gap-1 font-light text-md">
      {["vi", "en"].map((lng: "vi" | "en", index) => (
        <>
          <BaseButton
            key={lng}
            onClick={() => modifyLanguage(lng)}
            className={
              language === lng
                ? "text-black dark:text-white font-bold"
                : "text-silver "
            }
          >
            <Tooltip tooltip={lng === "vi" ? "Vietnamese" : "English"}>
              <p>{lng.toUpperCase()}</p>
            </Tooltip>
          </BaseButton>
          {index < 1 && "|"}
        </>
      ))}
    </div>
  );
};

export default LanguageModifier;
