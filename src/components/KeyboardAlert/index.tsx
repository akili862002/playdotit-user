import { Transition } from "@headlessui/react";
import { useActiveElement } from "@/hooks/useActiveElement";
import { useDebouncedState } from "@/hooks/useDebouncedState";
import { useEventListener } from "@/hooks/useEventListener";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { MuteIcon, SoundIcon } from "./icons";

interface IKeyboardAlertProps {}

const KeyboardAlert: React.FC<IKeyboardAlertProps> = (props) => {
  const activeElement = useActiveElement();
  const [signal, setSignal] = useDebouncedState<"VOLUME"[]>(
    [],
    () => {
      setIsShow(false);
    },
    1000,
  );
  const [isShow, setIsShow] = useState(false);

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (activeElement) return;

    const keyboardAction: Record<string, Function> = {
      // " ": () => {},
      // "ArrowRight": () => {},
      // "n": () => {},
      // "ArrowLeft": () => {},
      // "p": () => {},
      ArrowUp: () => setSignal(["VOLUME"]),
      ArrowDown: () => setSignal(["VOLUME"]),
      // "l": () => {},
      // "r": () => {},
    };

    if (keyboardAction[e.key]) {
      keyboardAction[e.key]();
      setIsShow(true);
      e.preventDefault();
    }
  });

  return (
    <>
      <Transition
        show={isShow}
        as={Fragment}
        enter="ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="fixed w-20 h-20 p-2 text-white -translate-x-1/2 -translate-y-1/2 bg-opacity-50 rounded-15 z-110 bg-gray backdrop-blur-lg left-1/2 top-1/2">
          {signal.includes("VOLUME") && <SoundAlert />}
        </div>
      </Transition>
    </>
  );
};

export default KeyboardAlert;

const SoundAlert: React.FC = () => {
  const { volume } = useSelector((state: IRootState) => state.playlist);

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      {volume > 0.05 ? (
        <SoundIcon className="w-2/3 h-auto mt-1 " />
      ) : (
        <MuteIcon className="w-2/3 h-auto mt-1 " />
      )}
      <ul className="flex w-full h-1 mt-1 overflow-hidden bg-black rounded-full">
        {new Array(Math.floor(volume * 10)).fill(0).map((_, index) => (
          <li key={index} style={{ width: "10%" }} className="bg-white "></li>
        ))}
      </ul>
    </div>
  );
};
