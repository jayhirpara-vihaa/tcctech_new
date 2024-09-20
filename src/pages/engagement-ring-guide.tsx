import Layout from "@components/layout/layout-three";
import Text from "@components/ui/text";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useContext } from "react";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const EnagagementRingGuide = () => {
  const { companyInfo } = useContext(CompanyInfoContext);
  return (
    <div className=" px-4 md:px-8 2xl:px-16 max-sm:mt-36 md:mt-24 lg:mt-8  mx-auto max-w-[1920px]">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 items-center  ">
        <div>
          <Text className="revaluation-heading-text font-bold text-black">
            Engagement Ring Guide
          </Text>
          <h1 className="py-10">
            We’ve tapped our network of jewelers and industry experts and
            rounded up our most comprehensive budgeting and shopping tips. We’ll
            walk you through the “Four Cs” that determine the quality and price
            of a diamond and break down the symbolism behind gemstones like
            sapphires and emeralds. We’ll teach you how to measure your ring
            size at home and answer your most pressing questions like where to
            buy an engagement ring and how much to spend on one. It’s all you
            need to make this important purchase with complete confidence, all
            in one place.
          </h1>
          <Link
            href={ROUTES.LOCATION}
            className={`underline text-[${companyInfo.web_secondary_color}]`}
          >
            {"Find a Store >"}
          </Link>
        </div>
        <div className="w-full h-full py-16 ">
          <img
            src="/assets/Photos/enagement-ring-guide.webp"
            width="w-full"
            height="h-full"
          />
        </div>
      </div>
    </div>
  );
};
EnagagementRingGuide.Layout = Layout;

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
export default EnagagementRingGuide;
