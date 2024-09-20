import { siteSettings } from "../../settings/site-settings";
import Layout from "@components/layout/layout-BET";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import DemoProductPageBET1 from "./product_1_bet";

export default function ProductSlug() {
  const showProductPage = () => {
    if (siteSettings.productPage === "#TCC-product-1") {
      return <DemoProductPageBET1 />;
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
