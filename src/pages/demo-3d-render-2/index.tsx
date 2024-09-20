import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Layout from "@components/layout/layout-product-demo-render-1";
import Container from "@components/ui/container";
import { useTranslation } from "next-i18next";
import Divider from "@components/ui/divider";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { useCompanyInfoProductsQuery } from "src/framework/company-info/get-all-company-info";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import Router from "next/router";
import { useConfiguratorSideBarQuery } from "@framework/configurator-sidebar/configurator-sidebar";
const Product3DRenderPricing = dynamic(
  () => import("@components/product/demo-product-3d-render-2"),
  {
    ssr: false,
  }
);

export default function Product2() {
  // const { t } = useTranslation("common");
  const { data: configData } = useConfiguratorSideBarQuery();
  const { updateOnlineLogos } = useContext(CompanyInfoContext);
  const { data: CompanyInfoData } = useCompanyInfoProductsQuery();
  const checkUserName = sessionStorage.getItem("config_user_email");
  useEffect(() => {
    updateOnlineLogos(CompanyInfoData?.data.images);
  }, [CompanyInfoData]);

  return (
    <>
      <Divider className="mb-0" />
      <Container>
        {checkUserName && configData && (
          <Product3DRenderPricing configData={configData && configData.data} />
        )}
      </Container>
    </>
  );
}

Product2.Layout = Layout;

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
