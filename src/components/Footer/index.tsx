import { useLocales } from "@/hooks/useLanguage";
import FeedbackButton from "./Feedback";
import Shortcuts from "./Shortcuts";
interface IFooterProps {}

const Footer: React.FC<IFooterProps> = (props) => {
  return (
    <footer className="absolute text-sm bottom-1 left-1 ">
      <div className="flex flex-row justify-start w-full gap-1.5 text-sm dark:text-silver">
        <FeedbackButton />
        <Shortcuts />
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;

const Copyright: React.FC<{}> = (props) => {
  const { t } = useLocales(["common"]);
  return (
    <p className="text-gray">
      {`© Copyright, ${t("common.copyright")} `}
      <a href="https://www.facebook.com/rengar.the/">Dung Nguyen</a>
    </p>
  );
};
