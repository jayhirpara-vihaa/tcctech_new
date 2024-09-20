import DemoProductPage1 from "../demo-product/product_1";
import { siteSettings } from "../../settings/site-settings";
import Layout from "@components/layout/layout-configurator";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

export default function ProductSlug() {
  const showProductPage = () => {
    if (siteSettings.productPage === "#TCC-product-1") {
      return <DemoProductPage1 />;
    } else if (siteSettings.productPage === "#TCC-product-2") {
      // return <ProductTwo />;
    } else {
      // return <ProductThree />;
    }
  };

  return <>{showProductPage()}</>;
}

ProductSlug.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
