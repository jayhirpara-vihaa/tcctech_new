import Layout from "@components/layout/layout-three";
import Text from "@components/ui/text";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useConstant } from "@react-spring/shared";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

const Revaluation = () => {
  const { companyInfo } = useContext(CompanyInfoContext);
  return (
    <div className=" px-4 md:px-8 2xl:px-16 max-sm:mt-36 md:mt-24 lg:mt-8  mx-auto max-w-[1920px]">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 items-center  ">
        <div>
          <Text className="revaluation-heading-text font-bold text-black">
            Request For Valuation
          </Text>
          <h1 className="py-10">
            Whether it’s your fifth anniversary or your first, our Ring Upgrade
            Program offers the opportunity to upgrade your Nungu engagement
            ring. Upon review, you will receive a credit up to the original
            purchase price, which can be used toward the purchase of a new Nungu
            engagement ring. Find a store
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
            src="/assets/images/revaluation.png"
            width="w-full"
            height="h-full"
          />
        </div>
      </div>
    </div>
  );
};
Revaluation.Layout = Layout;

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
export default Revaluation;
