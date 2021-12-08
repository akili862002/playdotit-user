import { useField } from "formik";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
} from "react";

interface IInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  className?: string;
  type?: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: "on" | "off";
  // use onChangeValue instead of onChange, since Formik will overwrite the onChange
  onChangeValue?: (value: string | number) => void;
  readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<IInput> = props => {
  const {
    name,
    className,
    disabled,
    type = "text",
    label,
    onChangeValue,
    autoComplete = "off",
    ...rest
  } = props;
  const [field, meta] = useField(name);

  useEffect(() => {
    onChangeValue && onChangeValue(field.value || "");
  }, [field.value]);

  let isError: boolean = !!meta.touched && !!meta.error;

  return (
    <div className={`w-full ${className}`}>
      <label
        className={`
         font-medium text-lg 
         ${isError && `text-danger`}
      `}
      >
        {label}
      </label>
      <input
        className={`
          w-full rounded-lg mt-0.5   bg-transparent text-black px-1.5 h-4 text-md font-medium placeholder-gray  rounded-8
          ${!isError ? " bg-alice-blue" : "border-danger bg-danger-light"}
          ${disabled && "opacity-60"}
        `}
        type={type}
        isError={isError}
        autoComplete={autoComplete}
        {...(rest as any)}
        {...field}
      />
      {isError && (
        <p className=" text-danger text-xs ml-1.5 mt-0.5 ">{meta?.error}</p>
      )}
    </div>
  );
};

export default TextField;
