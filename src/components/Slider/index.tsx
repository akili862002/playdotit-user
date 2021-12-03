import Tooltip from "components/Tooltip";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import "./styles.scss";

interface ISliderProps {
  className?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (newValue: number) => void;
}

const Slider: React.FC<ISliderProps> = ({
  onChange,
  className = "",
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange && onChange(value);
  };

  return (
    <div className={"relative w-full " + className} style={{ height: "4px" }}>
      <div className="absolute inset-0 w-full ">
        <div className="absolute inset-0 w-full rounded-full bg-silver" />
        <div
          className="absolute inset-0 bg-black rounded-full"
          style={{ width: `${(rest.value / rest.max) * 100}%` }}
        ></div>
      </div>
      <input
        className="absolute inset-0 cursor-pointer slider"
        type="range"
        {...rest}
        onChange={handleChange}
      />
    </div>
  );
};

export default Slider;
