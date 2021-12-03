import { MouseEvent } from "react";
import Tooltip from "components/Tooltip";
import BaseButton from "components/BaseButton";

interface IIConButton {
  className?: string;
  tooltip?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const IconButton: React.FC<IIConButton> = props => {
  const { children, className = "", tooltip = "", onClick } = props;

  return (
    <BaseButton
      className={
        "flex items-center justify-center w-auto rounded-full group cursor-pointer select-none " +
        className
      }
      onClick={onClick}
    >
      <div className="absolute group-hover:bg-alice-blue w-4.5 rounded-full h-4.5 z-0" />
      <Tooltip className="z-50" text={tooltip}>
        {children}
      </Tooltip>
    </BaseButton>
  );
};

export default IconButton;
