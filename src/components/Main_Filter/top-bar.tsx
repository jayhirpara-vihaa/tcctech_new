import { Drawer } from "@components/common/drawer/drawer";
import FilterIcon from "@components/icons/filter-icon";
import { useUI } from "@contexts/ui.context";
import FilterSidebar from "@components/shop/filter-sidebar";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";

export default function SearchTopBar() {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
  return (
    <div className="flex justify-end items-center mb-7">
      {/* <Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
				{t('text-casual-wear')}
			</Text> */}
      {/* <button
				className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
				onClick={openFilter}
			>
				<FilterIcon />
				<span className="ps-2.5">{t('text-filters')}</span>
			</button> */}
      {/* <BreadcrumbItems separator="/">
				<ActiveLink
					href={"/contemporary"}
					activeClassName="font-semibold text-heading"
				>
					<a>{t("breadcrumb-home")}</a>
				</ActiveLink>
				<ActiveLink
					href={ROUTES.PRODUCT}
					activeClassName="font-semibold text-heading"
				>
					<a className="capitalize">{t("breadcrumb-products")}</a>
				</ActiveLink>
			</BreadcrumbItems> */}
      <div className="flex items-center">
        <div className="flex-shrink-0  justify-between text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2 hidden lg:block">
          9,608 {t("text-items")}
        </div>
        <div className="flex justify-end items-center my-7">
          <button
            className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
            onClick={openFilter}
          >
            <FilterIcon />
            <span className="ps-2.5">{t("text-filters")}</span>
          </button>
        </div>
      </div>
      {/* TODO: need to use just one drawer component */}
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
