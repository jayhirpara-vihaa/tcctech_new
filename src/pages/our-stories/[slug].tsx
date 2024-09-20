import ProductOne from "../products/product_1";
import ProductTwo from "../products/product_2";
import ProductThree from "../products/product_3";
import { siteSettings } from "../../settings/site-settings";
import Layout from "@components/layout/layout-three";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Blog from "./blog";

export default function BlogSlug() {
  return (
    <>
      <Blog />
    </>
  );
}

BlogSlug.Layout = Layout;

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
