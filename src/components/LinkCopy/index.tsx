import cn from "classnames";
import BaseButton from "@/components/BaseButton";
import CheckedIcon from "@/icons/Checked";
import CopyIcon from "@/icons/Copy";

import { useState } from "react";
import { useLocales } from "@/hooks/useLanguage";
import toast from "react-hot-toast";

interface ILinkCopyProps {
  className?: string;
  link: string;
}

const LinkCopy: React.FC<ILinkCopyProps> = ({ className = "", link }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLocales(["common"]);

  return (
    <div
      className={cn(
        " bg-alice-blue flex flex-row rounded-8 text-black ",
        className
      )}
    >
      <input
        className="w-full p-1 font-medium bg-transparent border-none rounded-l-8 focus:border-none focus:outline-none text-md bg-none"
        value={link}
        tabIndex={-1}
        type="text"
        onFocus={(e) => {
          e.target.setSelectionRange(0, e.target.value.length);
        }}
      />
      <BaseButton
        onClick={() => {
          setCopied(true);
          navigator.clipboard.writeText(link);
          toast.success(t("common.copied-link"), { position: "bottom-left" });
          setTimeout(() => setCopied(false), 2000);
        }}
        className="px-1.5 text-gray rounded-r-8 bg-silver bg-opacity-30 hover:bg-opacity-50"
      >
        {!copied ? <CopyIcon /> : <CheckedIcon />}
      </BaseButton>
    </div>
  );
};

export default LinkCopy;
