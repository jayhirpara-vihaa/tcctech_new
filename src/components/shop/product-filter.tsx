import { useContext, useState } from "react";
import { CartWeightFilter } from "../../components/Main_Filter/cart-weight-filter";
import { ColorFilter } from "../../components/Main_Filter/color-filter";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useFilterQuery } from "@framework/main_filters/main-filters";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

export const ProductFilter: React.FC = () => {
  const router = useRouter();
  const [className, setClassName] = useState("");
  const { query } = useRouter();
  const { data } = useFilterQuery();
  const { companyInfo } = useContext(CompanyInfoContext);

  const { t } = useTranslation("common");
  return (
    <div className="pt-1 h-auto w-full flex justify-center">
      <div className=" border-b border-gray-300 w-9/12 pb-3 mb-3">
        <div className="flex items-center justify-center mx-5 mb-3">
          <button
            className={`flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-[#DBB961]  text-[${
              className === "" ? companyInfo.web_secondary_color : "black"
            }]`}
            aria-label="Clear All"
            onClick={() => setClassName("")}
          >
            {t("text-more-filter")}
          </button>
        </div>
        <div className="">
          <ColorFilter data={data} />
        </div>
      </div>
    </div>
  );
};
