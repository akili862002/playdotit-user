import { useDebounced } from "@/hooks/useDebounced";
import PenIcon from "@/icons/Pen";
import { useEffect, useState } from "react";

interface IToggleTextFieldProps {
  className?: string;
  inputClassName?: string;
  defaultValue: string;
  type?: "text" | "number";
  validateChecker?: (text: string) => string | false | undefined | null;
  maxLength?: number;
  onSave: (val: string) => void;
}

const ToggleTextField: React.FC<IToggleTextFieldProps> = ({
  className = "",
  inputClassName = "",
  defaultValue,
  type = "text",
  maxLength,
  onSave,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const { inputText: value, setInputText: setValue } = useDebounced((text) => {
    onSave(text);
  });

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={className}>
      {isEdit ? (
        <form onSubmit={() => setIsEdit(false)}>
          <input
            autoFocus
            onFocus={(e) => {
              e.target.setSelectionRange(0, e.target.value.length);
            }}
            className={inputClassName}
            value={value}
            type={type}
            maxLength={maxLength}
            onChange={(e) => {
              const val = e.target.value;
              setValue(val);
            }}
            onBlur={() => setIsEdit(false)}
          />
        </form>
      ) : (
        <a
          onClick={() => setIsEdit(true)}
          className="flex flex-row items-center gap-1 cursor-pointer"
        >
          {value}
          <PenIcon className="w-2.5 h-2.5" />
        </a>
      )}
    </div>
  );
};

export default ToggleTextField;
