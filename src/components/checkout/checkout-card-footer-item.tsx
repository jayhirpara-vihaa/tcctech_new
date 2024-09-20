import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { useContext } from "react";

type FooterItemProps = {
  id: string;
  name: string;
  price: string;
  rate: string;
};
export const CheckoutCardFooterItem: React.FC<{ item: FooterItemProps }> = ({
  item,
}) => {
  const { companyInfo } = useContext(CompanyInfoContext);
  return (
    <div
      className={`flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold  last:border-b-0 last:text-base last:pb-0`}
    >
      <div
        className={`flex items-center text-sm lg:px-3 w-full font-semibold `}
      >
        <span>{item.rate == null ? `${item.name}` : `${item.name} (${item.rate}%)`}</span>
      </div>
      <span className={`ms-auto flex-shrink-0`}>
        <span className={`text-[${companyInfo.web_secondary_color}]`}>
          {item.price}
        </span>
      </span>
    </div>
  );
};
