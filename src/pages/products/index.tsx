// import Subscription from "@components/common/subscription";
// import { ShopFilters } from "@components/Main_Filter/Mainfilters";
// import StickyBox from "react-sticky-box";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout-three";
import ShopDiscount from "@components/shop/discount";
import { ProductGrid } from "@components/product/product-grid";
import SearchTopBar from "@components/shop/top-bar";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { GetStaticProps } from "next";
import Text from "@components/ui/text";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { useContext, useEffect, useState } from "react";
import FilterIcon from "@components/icons/filter-icon";
import { MdClose } from "react-icons/md";
import { useWindowSize } from "@utils/use-window-size";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { DiamondSettingContext } from "@contexts/diamond_setting/diamond-setting-context";
import { useFilterQuery } from "@framework/main_filters/main-filters";
import { useRouter } from "next/router";
import { FilterQueryType } from "@framework/types";

export default function Products() {
  const { companyInfo } = useContext(CompanyInfoContext);
  const { updateMainFilterData } = useContext(DiamondSettingContext);

  const [showFilter, setShowFiltert] = useState(true);
  const { t } = useTranslation("menu");
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { data: filterData } = useFilterQuery();

  const [queryItem, setQueryItem] = useState({ type: "", value: 0 });

  const Setting_Style = filterData?.data?.settingStyleData;
  const Diamond_Shape = filterData?.data?.diamondShapeData;
  const Metal_Color = filterData?.data?.metalToneData;
  // Read Query and Show Data
  const { query } = useRouter();
  const queryFilter = query.filter;
  const queryValue: any = query.value;
  console.log(query.filter === "menu");
  // To update api from reading query
  useEffect(() => {
    if (queryFilter === "style") {
      const queryStyleItem =
        Setting_Style &&
        Setting_Style.filter((t: any) => t.slug === queryValue)[0]?.id;
      setQueryItem({ type: queryFilter, value: queryStyleItem! });
    }
    if (queryFilter === "metal") {
      const queryMetalItem =
        Metal_Color &&
        Metal_Color.filter((t: any) => t.slug === queryValue)[0]?.id;
      setQueryItem({ type: queryFilter, value: queryMetalItem! });
    }

    if (queryFilter === "shape") {
      const queryShapeItem =
        Diamond_Shape &&
        Diamond_Shape.filter((t: any) => t.slug === queryValue)[0]?.id;
      setQueryItem({ type: queryFilter, value: queryShapeItem! });
    }
    if (queryFilter === "women") {
      setQueryItem({ type: queryFilter, value: queryValue });
    }
    if (queryFilter === "women-metal") {
      const queryMetalItem =
        Metal_Color &&
        Metal_Color.filter((t: any) => t.slug === queryValue)[0]?.id;
      setQueryItem({ type: queryFilter, value: queryMetalItem! });
    }
    if (queryFilter === "men") {
      setQueryItem({ type: queryFilter, value: queryValue });
    }
    if (queryFilter === "men-metal") {
      const queryMetalItem =
        Metal_Color &&
        Metal_Color.filter((t: any) => t.slug === queryValue)[0]?.id;
      setQueryItem({ type: queryFilter, value: queryMetalItem! });
    }
    if (queryFilter === "lifestyle") {
      setQueryItem({ type: queryFilter, value: queryValue });
    }
  }, [queryFilter, queryValue]);
  // to update filter context
  useEffect(() => {
    updateMainFilterData(filterData?.data as FilterQueryType);
  }, [filterData]);
  const {
    updateSelectedStyle,
    updateSelectedShape,
    updateSelectedColor,
    updateSelectedGender,
    updateSelectedCategory,
  } = useContext(DiamondSettingContext);
  useEffect(() => {
    if (queryItem.type === "style") {
      updateSelectedStyle(Number(queryItem.value!));
      updateSelectedColor(0);
      updateSelectedShape(0);
      updateSelectedGender(0);
      updateSelectedCategory(0);
    }
    if (queryItem.type === "metal") {
      updateSelectedColor(Number(queryItem.value!));
      updateSelectedStyle(0);
      updateSelectedShape(0);
      updateSelectedGender(0);
      updateSelectedCategory(0);
    }
    if (queryItem.type === "women-metal") {
      updateSelectedColor(Number(queryItem.value!));
      updateSelectedStyle(0);
      updateSelectedShape(0);
      updateSelectedGender(2);
      updateSelectedCategory(0);
    }
    if (queryItem.type === "men-metal") {
      updateSelectedColor(Number(queryItem.value!));
      updateSelectedStyle(0);
      updateSelectedShape(0);
      updateSelectedGender(1);
      updateSelectedCategory(0);
    }
    if (queryItem.type === "shape") {
      updateSelectedShape(Number(queryItem.value!));
      updateSelectedColor(0);
      updateSelectedStyle(0);
      updateSelectedGender(0);
      updateSelectedCategory(0);
    }
    if (queryItem.type === "women") {
      updateSelectedGender(2);
      updateSelectedCategory(queryItem.value!);
      updateSelectedColor(0);
      updateSelectedStyle(0);
      updateSelectedShape(0);
    }
    if (queryItem.type === "men") {
      updateSelectedGender(1);
      updateSelectedCategory(queryItem.value!);
      updateSelectedColor(0);
      updateSelectedStyle(0);
      updateSelectedShape(0);
    }
    if (queryItem.type === "lifestyle") {
      updateSelectedGender(0);
      updateSelectedCategory(queryItem.value!);
      updateSelectedColor(0);
      updateSelectedStyle(0);
      updateSelectedShape(0);
    }
  }, [queryItem]);

  return (
    <>
      <div className="mx-auto max-w-[1920px] mt-28 lg:mt-36 xl:mt-4">
        <div className="pb-7 px-12">
          <BreadcrumbItems separator="/">
            <ActiveLink
              href={"/"}
              activeClassName={`font-semibold text-[${companyInfo.web_secondary_color}]`}
            >
              <a>{t("breadcrumb-home")}</a>
            </ActiveLink>
            <ActiveLink
              href={ROUTES.PRODUCT}
              activeClassName={`font-semibold text-[${companyInfo.web_secondary_color}]`}
            >
              <a className="capitalize">{t("breadcrumb-products")}</a>
            </ActiveLink>
            <ActiveLink
              href={ROUTES.PRODUCT}
              activeClassName={`font-semibold text-[${companyInfo.web_secondary_color}]`}
            >
              <a className="capitalize">
                {query.filter === "menu" && t(`${query.value}`)}
              </a>
            </ActiveLink>
          </BreadcrumbItems>
        </div>

        <div
          className={`flex items-center justify-center mt-2 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8`}
        >
          <Text className="Tcc-text-our-Jewelry-Section">
            {query.filter === "menu" ? t(`${query.value}`) : "Nungu Collection"}
          </Text>
        </div>
        {/* Tcc Filter Button */}
        {/* {width > 1023 && (
          <div className="flex justify-end items-center my-7 mx-4">
            <button
              className={`text-[${companyInfo.web_primary_color}] text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200`}
              onClick={() => setShowFiltert(!showFilter)}
            >
              {showFilter === false ? <FilterIcon /> : <MdClose />}
              <span className="ps-2.5">{t("text-filters")}</span>
            </button>
          </div>
        )} */}
        {/* Tcc Main Filter */}
        {/* {showFilter === true && (
          <div className="flex justify-center">
            <ShopFilters />
          </div>
        )} */}
        <Container>
          <div className={`flex pt-8 pb-16 lg:pb-20 `}>
            <div className="w-full lg:-ms-9">
              {/* Mobile Side Bar Product Filter */}
              <SearchTopBar />
              <ShopDiscount />
              <ProductGrid />
            </div>
          </div>
          {/* <Subscription /> */}
        </Container>
      </div>
    </>
  );
}

Products.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
