import { cn } from "@/util/classnames.utils";
import React, { ButtonHTMLAttributes } from "react";
import Spinner from "../Spinner";
import { Tooltip } from "../Tooltip";

export interface IIConButton extends ButtonHTMLAttributes<any> {
  className?: string;
  tooltip?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const IconButton: React.FC<IIConButton> = (props) => {
  const {
    children,
    loading = false,
    className = "",
    tooltip = "",
    ...rest
  } = props;

  return (
    <Tooltip tooltip={tooltip}>
      <button
        type="button"
        className={cn(
          "relative flex-shrink-0 ring-primary-700 group center-children w-auto cursor-pointer select-none",
          "w-3.5 h-3.5 rounded-lg",
          "text-gray-600",
          "hover:bg-gray-100 hover:text-gray-900",
          "active:bg-gray-200 active:text-gray-900",
          "disabled:opacity-40",
          className
        )}
        {...rest}
      >
        <div className={cn("z-10")}>
          {!loading ? children : <Spinner size={20} />}
        </div>
      </button>
    </Tooltip>
  );
};
