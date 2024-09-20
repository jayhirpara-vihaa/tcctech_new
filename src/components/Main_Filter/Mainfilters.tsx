import { useContext, useEffect, useState } from "react";
import { CartWeightFilter } from "./cart-weight-filter";
import { ColorFilter } from "./color-filter";
import { useTranslation } from "next-i18next";
import { useFilterQuery } from "@framework/main_filters/main-filters";
import { DiamondSettingContext } from "@contexts/diamond_setting/diamond-setting-context";
import { FilterQueryType } from "@framework/types";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

export const ShopFilters: React.FC = () => {
  const [className, setClassName] = useState("jsGridView");
  const { data: filterData, isLoading } = useFilterQuery();
  const { t } = useTranslation("common");
  const { updateMainFilterData } = useContext(DiamondSettingContext);
  const { companyInfo } = useContext(CompanyInfoContext);

  useEffect(() => {
    updateMainFilterData(filterData?.data as FilterQueryType);
  }, [filterData]);

  return (
    <div className="hidden lg:flex pt-1 h-auto w-full  justify-center">
      <div className=" border-b border-gray-300 w-9/12 pb-3 mb-3">
        <div className="flex items-center justify-center mx-5 mb-3">
          <button
            className={`flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-[#DBB961]  text-[${
              className === "" ? companyInfo.web_secondary_color : "black"
            }]`}
            aria-label="Clear All"
          >
            {t("text-more-filter")}
          </button>
        </div>
        <ColorFilter data={filterData} />
      </div>
    </div>
  );
};
