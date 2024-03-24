import React from "react";
import { useFormContext } from "react-hook-form";

interface InputWrapperProps {
  className?: string;
  name: string;
  label: string;
}

export const InputWrapper: React.FC<
  React.PropsWithChildren<InputWrapperProps>
> = ({ className, name, label, children }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label}
      </label>

      {children}

      {errors?.[name] && (
        <span className="text-red-800 text-xs">
          {errors[name]?.type === "required"
            ? "This field is required"
            : "Invalid value"}
        </span>
      )}
    </div>
  );
};

export default InputWrapper;
