import React from "react";
import Layout from "@components/layout/layout";
import type { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate } from "react-query/hydration";
import { OurStore } from "@containers/our-store-location";

export default function Location() {
  return (
    <>
      <div className="my-12 mt-28 lg:mt-20">
        <OurStore />
      </div>
    </>
  );
}

Location.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
    revalidate: 60,
  };
};
