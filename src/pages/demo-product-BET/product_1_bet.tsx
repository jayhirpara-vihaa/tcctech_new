import Container from "@components/ui/container";
import Layout from "@components/layout/layout-BET";
import Divider from "@components/ui/divider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";

const DemoDetailComponent = dynamic(
  () => import("@components/product/demo-product-details-BET"),
  {
    ssr: false,
  }
);

export default function DemoProductPageBET1() {
  return (
    <>
      <Divider className="mb-0" />
      <Container className="mt-5">
        <DemoDetailComponent />
      </Container>
    </>
  );
}

DemoProductPageBET1.Layout = Layout;

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
