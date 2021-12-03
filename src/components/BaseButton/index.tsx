import { ButtonHTMLAttributes, MouseEvent } from "react";
import { useRedirect } from "hooks/useRedirect";
import "./styles.scss";

interface IBaseButtonProps extends ButtonHTMLAttributes<any> {
  className?: string;
  to?: string;
}

const BaseButton: React.FC<IBaseButtonProps> = props => {
  const redirect = useRedirect();
  const {
    className = "",
    to,
    children,
    type = "button",
    onClick,
    ...rest
  } = props;

  const wrappedOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (to) redirect(to);
    onClick && onClick(e);
  };

  return (
    <button
      className={"base-button " + className}
      type={type}
      onClick={wrappedOnClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BaseButton;
