import type { GetStaticProps } from "next";
import { useContext, useEffect, useState } from "react";
import Container from "@components/ui/container";
import HeroSlider from "@containers/hero-slider";
import Layout from "@components/layout/layout-BET";
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
import dynamic from "next/dynamic";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { DemoProductGridBET } from "@components/product/demoProduct-grid-BET";
import Text from "@components/ui/text";

const Product3DRenderLocal = dynamic(() => import("@components/product/product-3d-render-local"), {
  ssr: false,
});


export default function Home() {

  const { t } = useTranslation("common");
  const { updateOnlineLogos } =
    useContext(CompanyInfoContext);
  const { data: CompanyInfoData } = useCompanyInfoProductsQuery();
  const checkUserName = sessionStorage.getItem('config_user_email')
  useEffect(() => {
    //updateCompanyInfo(CompanyInfoData?.data.companyInfo);
    updateOnlineLogos(CompanyInfoData?.data.images);
  }, [CompanyInfoData]);

  useEffect(() => {
    if (checkUserName == null) {
      //Router.push('/config-login')
    }
  }, [checkUserName])


  return (
    <>
      <Container>
        <div className="max-w-[1240px] mx-auto">
          <div className="mt-[127px] lg:mt-[14.5rem] xl:mt-[6.5rem] md:mt-[120px]">
            <div
              className={`flex items-center justify-center mt-2 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8 text-black`}
            >
              <Text className="zapfumanist-font font-medium">
                Engagement Rings
              </Text>
            </div>
            <DemoProductGridBET />
          </div>
        </div>

      </Container>
    </>
  );
}

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ]))
    },
    revalidate: 60,
  };
};
