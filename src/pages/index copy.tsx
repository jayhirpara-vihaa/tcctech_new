import type { GetStaticProps } from "next";
import { useContext, useEffect, useState } from "react";
import Container from "@components/ui/container";
import HeroSlider from "@containers/hero-slider";
import Layout from "@components/layout/layout-configurator";
import { QueryClient, dehydrate } from "react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBlockIcon from "@containers/category-block-icon";
import NewArrivalsProductFeedWithTabs from "@components/product/feeds/new-arrivals-product-feed-with-tabs";
import WebModel from "@components/common/modal/web-stater-model";
// All data file
import SaleBannerGrid from "@containers/sale-banner-grid";
import TheProcessTabs from "@components/product/feeds/trending-product-feed-with-tabs";
import Subscription from "@components/common/subscription";
import Instagram from "@components/common/instagram";
import RecentProductFeed from "@components/product/feeds/recent-product-feed";
import { useBanner } from "src/framework/Home/bannerlist";
import { useMarketingBanner } from "src/framework/Home/salebanner";
import { siteSettings } from "@settings/site-settings";
import Cookies from "js-cookie";
import { useTrendingProductsQuery } from "@framework/product/get-all-trending-products";
import { useFeaturedProductsQuery } from "@framework/product/get-all-featured-products-2";
import { useHomeAboutQuery } from "src/framework/Home/product";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import {
  fetchsCompanyInfo,
  useCompanyInfoProductsQuery,
} from "src/framework/company-info/get-all-company-info";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { useUI } from "@contexts/ui.context";

export default function Home() {
  const { updateCompanyInfo, updateOnlineLogos, updateTaxListItems } =
    useContext(CompanyInfoContext);

  const { data: HeroSliderData } = useBanner();
  const { data: CompanyInfoData } = useCompanyInfoProductsQuery();
  const { data: SaleBannerGridData, isLoading } = useMarketingBanner();
  const {
    data: homeAndAboutSectionData,
    isLoading: homeAboutFetchingDataLoading,
  } = useHomeAboutQuery();
  const {
    data: trendingProductData,
    isLoading: trendingDataLoading,
    error: trendingDataFetchingError,
  } = useTrendingProductsQuery();
  const {
    data: newArrivelData,
    isLoading: newArrivelDataLoading,
    error: arrivelDataFetchingError,
  } = useFeaturedProductsQuery();

  const [open, setOpen] = useState<boolean>(true);
  const closeModel = Cookies.get("modelclose");

  useEffect(() => {
    updateTaxListItems(CompanyInfoData?.data.taxList)
    updateCompanyInfo(CompanyInfoData?.data.companyInfo);
    updateOnlineLogos(CompanyInfoData?.data.images);
  }, [CompanyInfoData]);

  useEffect(() => {
    setOpen(closeModel as unknown as boolean);
  }, [closeModel]);

  const handleClose = () => {
    setOpen(false);
    Cookies.set("modelclose", false);
  };

  return (
    <>
      {open && !isLoading ? <WebModel modalIsClose={handleClose} /> : <></>}
      <div className="max-lg:mt-[89px] max-xl:mt-[8.8rem]  ">
        <HeroSlider
          data={HeroSliderData}
          variantRounded="default"
          variant="fullWidth"
          prevNextButtons="none"
          mobile={siteSettings.homeHeroSlider.mobile}
          desktop={siteSettings.homeHeroSlider.desktop}
          className="!mb-24 !md:mb-14 !xl:mb-[60px]"
        />
      </div>
      <Container className="border-b-2 border[#E6E6E6]">
        <SaleBannerGrid
          data={SaleBannerGridData}
          className="mb-12 md:mb-14 xl:mb-16 px-4 md:px-8 2xl:px-16"
        />

        <NewArrivalsProductFeedWithTabs
          isLoading={trendingDataLoading}
          data={trendingProductData}
          error={trendingDataFetchingError}
        />

        {!homeAboutFetchingDataLoading && (
          <TheProcessTabs data={homeAndAboutSectionData} />
        )}
        {!newArrivelDataLoading && (
          <RecentProductFeed
            isLoading={newArrivelDataLoading}
            data={newArrivelData}
            error={arrivelDataFetchingError}
          />
        )}

        <CategoryBlockIcon
          sectionHeading="text-browse-categories"
          variant="list"
        />

        <Subscription className="bg-opacity-0 px-5 sm:px-16 xl:px-0 mb-12 md:mb-14 xl:mb-16 !py-0 !md:py-0 !lg:py-0" />
        <Instagram className="mb-4 md:mb-5 xl:mb-16" variant="rounded" />
      </Container>
    </>
  );
}

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    API_ENDPOINTS.COMPANYINFORMATION,
    fetchsCompanyInfo
  );

  // await queryClient.prefetchQuery(
  //   [API_ENDPOINTS.CATEGORIES, { limit: 10 }],
  //   fetchCategories
  // );
  // await queryClient.prefetchQuery(
  //   [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, { limit: 10 }],
  //   fetchNewArrivalProducts
  // );
  // await queryClient.prefetchQuery(
  //   [API_ENDPOINTS.BRANDS, { limit: 0 }],
  //   fetchBrands
  // );

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
};
