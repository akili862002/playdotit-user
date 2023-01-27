import { ButtonHTMLAttributes, MouseEvent } from "react";
import cn from "classnames";
import { useNavigate } from "react-router";

interface IBaseButtonProps extends ButtonHTMLAttributes<any> {
  className?: string;
  to?: string;
}

const BaseButton: React.FC<IBaseButtonProps> = (props) => {
  const nav = useNavigate();
  const {
    className = "",
    disabled,
    to,
    children,
    type = "button",
    onClick,
    ...rest
  } = props;

  const wrappedOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (to) nav(to);
    onClick && onClick(e);
  };

  return (
    <button
      className={cn(
        "active:scale-95 active:outline-none focus-visible:scale-95 focus-within:outline-none transform ",
        disabled && "opacity-30 cursor-default",
        className
      )}
      type={type}
      onClick={wrappedOnClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BaseButton;
