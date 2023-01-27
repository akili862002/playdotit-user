import { Fragment, PropsWithChildren } from "react";
import { Dialog as DialogUI, Transition } from "@headlessui/react";
import Button from "@/components/Button";
import DangerIcon from "@/icons/Danger";
import { useLocales } from "@/hooks/useLanguage";

export type IDialogSize = "sm" | "md" | "lg" | "auto";

interface ILoginDialogProps {
  title: string;
  message: string;
  size?: IDialogSize;
  open: boolean;
  onClose: () => void;
  onConfirm: (closeDialog: Function) => void;
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

const AlertDialog = (
  props: PropsWithChildren<ILoginDialogProps>
): JSX.Element => {
  const {
    size = "md",
    title,
    message,
    className = "",
    open,
    onClose,
    onConfirm,
  } = props;
  const { t } = useLocales(["common"]);

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
              inline-block overflow-hidden text-left align-middle transition-all transform w-full rounded-15 bg-white max-w-sm
              ${sizes[size]}
              ${className}
            `}
            >
              <div
                className="grid w-full p-2 bg-white"
                style={{ gridTemplateColumns: "80px 1fr" }}
              >
                <div>
                  <DangerIcon />
                </div>
                <div>
                  <h1 className="font-semibold text-xxl">{title}</h1>
                  <p className="mt-1 text-md text-gray">{message}</p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-end gap-2 px-2 py-1 bg-silver bg-opacity-20">
                <Button className="px-2" onClick={handleClose}>
                  {t("common.cancel")}
                </Button>
                <Button
                  onClick={() => onConfirm(handleClose)}
                  danger
                  className="px-2 bg-opacity-80"
                >
                  {t("common.delete")}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </DialogUI>
    </Transition>
  );
};

AlertDialog.Divider = ({
  children,
  className = "",
}: PropsWithChildren<{ className: string }>) => {
  return <div className="w-full h-full">{children}</div>;
};

export default AlertDialog;
