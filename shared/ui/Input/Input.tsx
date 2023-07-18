import { ChangeEvent, InputHTMLAttributes } from "react";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;
interface InputProps {
  value?: string | number;
  placeholder?: string;
  onChange?: (value: string) => void;
  type?: string;
  label?: string;
}
export const Input = (props: InputProps) => {
  const { value, type, onChange, label, placeholder, ...otherProps } = props;
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };
  return (
    <div className={"flexStart flex-col w-full gap-4"}>
      <label className={"w-full text-gray-100"}>{label}</label>
      <input
        onChange={onChangeInput}
        value={value}
        className={"form_field-input"}
        placeholder={placeholder}
        {...otherProps}
      />
    </div>
  );
};
