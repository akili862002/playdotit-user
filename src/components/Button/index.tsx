import BaseButton from "@/components/BaseButton";
import Spinner from "@/components/Spinner";
import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface IButtonProps extends ButtonHTMLAttributes<any> {
  primary?: boolean;
  danger?: boolean;
  className?: string;
  loading?: boolean;
  icon?: ReactNode;
  to?: string;
}

const primaryClassName = cn("bg-black text-white dark:bg-white dark:text-black");
const dangerClassName = cn("bg-danger text-white");
const secondaryClassName = cn(
  "bg-alice-blue text-black dark:bg-gray dark:bg-opacity-30 dark:text-white",
);

const Button: React.FC<IButtonProps> = ({
  className = "",
  primary = false,
  danger = false,
  icon = null,
  loading = false,
  children,
  ...rest
}) => {
  const secondary = !primary && !danger;
  return (
    <BaseButton
      className={cn(
        "text-md font-bold  select-none",
        "flex w-auto flex-row items-center justify-center gap-1 py-1  rounded-8",
        { "opacity-80 pointer-events-none": loading },
        primary && primaryClassName,
        danger && dangerClassName,
        secondary && secondaryClassName,
        className,
      )}
      {...rest}
    >
      {loading ? <Spinner size={20} /> : icon}
      {children}
    </BaseButton>
  );
};

export default Button;
