import React, { useContext } from "react";
import { useTranslation } from "next-i18next";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelKey?: string;
  label?: string | any;
  checked?: any;
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ labelKey, label, checked, ...rest }, ref) => {
    const { t } = useTranslation();
    const { companyInfo } = useContext(CompanyInfoContext);
    return (
      <label
        className={`group flex items-center text-[${companyInfo.web_primary_color}] text-sm cursor-pointer`}
      >
        <input
          type="checkbox"
          className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-black focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-black checked:hover:bg-black checked:focus:bg-black"
          ref={ref}
          {...rest}
          defaultChecked={checked}
        />
        <span className="ms-4 -mt-0.5">{labelKey ? t(labelKey) : label}</span>
      </label>
    );
  }
);
