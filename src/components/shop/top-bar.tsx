import { Drawer } from "@components/common/drawer/drawer";
import FilterIcon from "@components/icons/filter-icon";
import Text from "@components/ui/text";
import { useUI } from "@contexts/ui.context";
import FilterSidebar from "@components/shop/filter-sidebar";
import ListBox from "@components/ui/list-box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import ActiveLink from "@components/ui/active-link";
import { ROUTES } from "@utils/routes";
import { useContext } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

export default function SearchTopBar() {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const { companyInfo } = useContext(CompanyInfoContext);
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
  return (
    <div className="flex justify-end items-center mb-7 lg:hidden">
      <div className="flex items-center">
        <div className="flex justify-end items-center">
          <button
            className={`text-[${companyInfo.web_secondary_color}] text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200`}
            onClick={openFilter}
          >
            <FilterIcon />
            <span className="ps-2.5">{t("text-filters")}</span>
          </button>
        </div>
      </div>
      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displayFilter}
        onClose={closeFilter}
        contentWrapperStyle={contentWrapperCSS}
        {...motionProps}
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
}
