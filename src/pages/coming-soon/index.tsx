import Layout from "@components/layout/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ComingSoonInformation from "@components/coming-soon/comingsoon-information";
import { GetStaticProps } from "next";

export default function ComingSoonPage() {
  return <ComingSoonInformation />;
}

ComingSoonPage.Layout = Layout;

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
