import React, { InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelKey?: string;
  placeholderKey?: string;
  name: string;
  errorKey?: string;
  type?: string;
  optionName?: string[];
  optionId?: string[] | string;
  shadow?: boolean;
  data?: Data[];
  value?: string[] | string;
  disableBorderRadius?: boolean;
  variant?: "normal" | "solid" | "outline" | "option";
}

export interface Data {
  optionId: number;
  optionName: string;
}

const Dropdown = React.forwardRef<HTMLInputElement, Props>(
  ({ className = "", name, errorKey, data = [], ...rest }, ref) => {
    return (
      <div className={className}>
        <select
          className="mb-select w-full my-3 outline-none"
          // @ts-ignore
          ref={ref}
          name={name}
          id={name}
          aria-invalid={errorKey ? "true" : "false"}
          {...rest}
        >
          {data.map((t) => {
            return <option value={t.optionId}> {t.optionName} </option>;
          })}
        </select>
      </div>
    );
  }
);

export default Dropdown;
