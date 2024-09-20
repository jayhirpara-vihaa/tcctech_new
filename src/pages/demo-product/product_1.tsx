import Container from "@components/ui/container";
import Layout from "@components/layout/layout-configurator";
import Divider from "@components/ui/divider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";

const DemoDetailComponent = dynamic(
  () => import("@components/product/demo-product-details"),
  {
    ssr: false,
  }
);

export default function DemoProductPage1() {
  const { t } = useTranslation("common");
  return (
    <>
      <Divider className="mb-0" />
      <Container>
        <DemoDetailComponent />
      </Container>
    </>
  );
}

DemoProductPage1.Layout = Layout;

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
