import BaseButton from "@/components/BaseButton";
import Dialog from "@/components/Dialog";
import { ReactNode, useState } from "react";
import BlogContent from "@/components/BlogContent";
import {
  DownArrow,
  LeftArrowIcon,
  RightArrowIcon,
  UpArrow,
} from "@/icons/Arrows";
import { useLocales } from "@/hooks/useLanguage";

const listShortcuts: {
  keys: ReactNode[];
  desc: string;
}[] = [
  {
    keys: ["Space"],
    desc: "Để tạm dừng hoặc tiếp tục phát video",
  },
  {
    keys: [<RightArrowIcon />, "N"],
    desc: "Phát bài tiếp theo",
  },
  {
    keys: [<LeftArrowIcon />, "L"],
    desc: "Phát bài trước",
  },
  {
    keys: [<LeftArrowIcon />, "L"],
    desc: "Phát bài trước",
  },
  {
    keys: [<UpArrow />],
    desc: "Tăng âm lượng",
  },
  {
    keys: [<DownArrow />],
    desc: "Giảm âm lượng",
  },
  {
    keys: ["⌘ + K", "Alt + K"],
    desc: "Tìm bài hát",
  },
];

const Shortcuts: React.FC<{}> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLocales(["common"]);

  return (
    <>
      <BaseButton onClick={() => setIsOpen(true)}>
        {t("common.shortcut.title")}
      </BaseButton>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Header>{t("common.shortcut.title")}</Dialog.Header>
        <Dialog.Content>
          <BlogContent className="overflow-x-auto">
            {/* <h3># Phím tắt</h3> */}
            <div className=" min-w-max">
              <div className="flex flex-row items-center text-lg font-bold">
                <p className="w-1/3 pr-1">Shortcut</p>
                <p className="w-2/3">Function</p>
              </div>
              <div className="w-full mt-1">
                {listShortcuts.map(({ keys, desc }, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center py-0.5 odd:bg-alice-blue text-md "
                  >
                    <div className="flex flex-wrap w-1/3 gap-1 pr-1">
                      {keys.map((key, index) => (
                        <kbd className="" key={"key" + index}>
                          {key}
                        </kbd>
                      ))}
                    </div>
                    <p className="w-2/3">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </BlogContent>
        </Dialog.Content>
        <Dialog.ActionButtons
          variant="confirm"
          onClose={() => setIsOpen(false)}
        />
      </Dialog>
    </>
  );
};

export default Shortcuts;
