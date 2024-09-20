import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Layout from "@components/layout/layout-mazzucchelli";
import Container from "@components/ui/container";
import { useTranslation } from "next-i18next";
import Divider from "@components/ui/divider";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { useCompanyInfoProductsQuery } from "src/framework/company-info/get-all-company-info";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import Router from "next/router";
import { useConfiguratorSideBarQuery } from "@framework/configurator-sidebar/configurator-sidebar";
import Cookies from "js-cookie";
const ProductMazzucchelli3DRenderPricing = dynamic(
  () => import("@components/product/product-mazzucchelli-3d-render-pricing"),
  {
    ssr: false,
  }
);

export default function Product2() {
  // const { t } = useTranslation("common");
  const { data: configData } = useConfiguratorSideBarQuery();
  const { updateOnlineLogos } = useContext(CompanyInfoContext);
  const { data: CompanyInfoData } = useCompanyInfoProductsQuery();
  const checkUserName = Cookies.get('USER_DETAILS');//sessionStorage.getItem("USER_DETAILS");
  useEffect(() => {
    updateOnlineLogos(CompanyInfoData?.data.images);
  }, [CompanyInfoData]);

  // useEffect(() => {
  //   if (checkUserName == null) {
  //     Router.push("/signin");
  //   }
  // }, [checkUserName]);

  return (
    <>
      <Divider className="mb-0" />
      <Container>
        {/* {checkUserName && configData && ( */}
        <ProductMazzucchelli3DRenderPricing configData={configData && configData.data} />
        {/* )} */}
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
