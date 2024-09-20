import { useTranslation } from "react-i18next";
import react from "react";
import Layout from "@components/layout/layout-three";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import OurStoriesDetails from "@components/Blogs/our-story-details";

export default function Blog() {
  const { t } = useTranslation("common");
  return (
    <div>
      <OurStoriesDetails />
    </div>
  );
}

Blog.Layout = Layout;

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
