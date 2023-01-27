import Slider from "@/components/Slider";
import { useDebouncedState } from "@/hooks/useDebouncedState";
import MuteVolumeIcon from "@/icons/MuteVolume";
import VolumeIcon from "@/icons/Volume";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { useEventListener } from "@/hooks/useEventListener";
import { useActiveElement } from "@/hooks/useActiveElement";
import { useRerender } from "@/hooks/useRerender";

interface IVolumeProps {
  value: number;
  onChange: (val: number) => void;
}

const Volume: React.FC<IVolumeProps> = ({ value, onChange }) => {
  const [volume, setVolume] = useDebouncedState<number>(value, (val) => {
    onChange(val);
  });
  const activeElement = useActiveElement();
  const isFirstRender = useRef(true);
  const { isRerender, rerender } = useRerender();

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (activeElement) return;
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      rerender();
      e.preventDefault();
    }
  });

  useEffect(() => {
    setVolume(value);
    isFirstRender.current = false;
  }, [value, isRerender]);

  return (
    <div className="relative volume-container">
      <div className="cursor-pointer">
        {volume < 5 ? <MuteVolumeIcon /> : <VolumeIcon />}
      </div>
      <div
        className={cn(
          "absolute  transition bg-white dark:bg-silver rounded-sm shadow-md w-15 rounded-4 whitespace-nowrap",
          "-bottom-2 move-center-x p-1 ",
          "z-50",
          "text-xs font-normal text-center",
          "volume-float",
          "opacity-0 invisible hover:opacity-100",
        )}
      >
        <Slider
          value={volume}
          min={0}
          max={100}
          step={1}
          onChange={(newValue) => {
            setVolume(newValue);
          }}
        />
      </div>
    </div>
  );
};

export default Volume;
