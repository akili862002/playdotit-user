import { Fragment, PropsWithChildren } from "react";
import { Dialog as DialogUI, Transition } from "@headlessui/react";
import cn from "classnames";

import BaseButton from "@/components/BaseButton";
import { useLocales } from "@/hooks/useLanguage";

export type IDialogSize = "sm" | "md" | "lg" | "auto";

interface ILoginDialogProps {
  size?: IDialogSize;
  open: boolean;
  onClose: () => void;
  className?: string;
}

const sizes: {
  [key in IDialogSize]: string;
} = {
  sm: "w-min",
  md: "w-full max-w-phone",
  lg: "w-full max-w-laptop",
  auto: "w-auto",
};

const Dialog = (props: PropsWithChildren<ILoginDialogProps>): JSX.Element => {
  const { size = "md", children, className = "", open, onClose } = props;

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <DialogUI as="div" className="fixed inset-0 z-100" onClose={handleClose}>
        <div className="px-2 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogUI.Overlay
              className="fixed inset-0 "
              style={{ backgroundColor: "#131313b3" }}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`
              inline-block text-left align-middle transition-all transform w-full rounded-15 p-2  bg-white max-w-sm
              ${sizes[size]}
              ${className}
            `}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </DialogUI>
    </Transition>
  );
};

Dialog.Divider = ({
  children,
  className = "",
}: PropsWithChildren<{ className: string }>) => {
  return <div className="w-full h-full">{children}</div>;
};

Dialog.Header = ({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) => {
  return <h1 className={"text-3xl font-bold " + className}>{children}</h1>;
};

Dialog.Content = ({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn("w-full mt-2", className)}>{children}</div>;
};

Dialog.ActionButtons = ({
  className,
  onClose,
  onConfirm,
  variant = "create",
}: PropsWithChildren<{
  variant?: "create" | "confirm";
  className?: string;
  onClose: Function;
  onConfirm?: Function;
}>) => {
  const { t } = useLocales(["common"]);

  return (
    <div
      className={cn(
        "flex flex-row justify-end w-full gap-2 mt-3 font-bold text-md",
        className
      )}
    >
      {variant === "create" && (
        <>
          <BaseButton
            className="px-2 py-1 text-black border border-solid rounded-8"
            onClick={() => onClose()}
          >
            {t("common.cancel")}
          </BaseButton>
          <BaseButton
            onClick={() => onConfirm?.()}
            className="px-2 py-1 text-white bg-black rounded-8"
            type="submit"
          >
            {t("common.create")}
          </BaseButton>
        </>
      )}
      {variant === "confirm" && (
        <BaseButton
          onClick={() => onClose?.()}
          className="px-2 py-1 text-white bg-black rounded-8"
          type="submit"
        >
          {t("common.finish")}
        </BaseButton>
      )}
    </div>
  );
};

export default Dialog;
