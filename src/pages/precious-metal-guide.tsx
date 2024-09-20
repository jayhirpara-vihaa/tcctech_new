import Layout from "@components/layout/layout-three";
import Text from "@components/ui/text";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useContext } from "react";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import SectionHeader from "@components/common/theProcess-section-header";

const PreciousMetalGuide = () => {
  const { companyInfo } = useContext(CompanyInfoContext);
  return (
    <div className="px-4 md:px-8 2xl:px-16 max-sm:mt-36 md:mt-32 lg:mt-44 xl:mt-8 mx-auto max-w-[1920px]">
      <div>
        <SectionHeader
          topVarient={false}
          sectionHeading={"Guide to Precious Metals"}
          className="pb-0.5 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 "
        />
        <h1 className="py-8 text-center">
          There are many ways to buy precious metals like gold, silver,
          platinum, and a host of good reasons why you should give in to the
          treasure hunt. So if you're just getting started out in precious
          metals, read on to learn more about how they work and how you can
          invest in them.
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
        <div className="w-full h-full py-8 order-1">
          <img src="/assets/Photos/gold.jpg" className="w-full h-full" />
        </div>
        <div className="max-md:order-2 order-1 py-8">
          <h1 className="revaluation-heading-text font-bold">Gold</h1>
          <span className="lg:py-10 py-4">
            <h1 className="lg:py-10">
              We'll start with the granddaddy of them all. Gold is unique for
              its durability (it doesn't rust or corrode), malleability, and
              ability to conduct both heat and electricity. It has some
              industrial applications in dentistry and electronics, but we know
              it principally as a base for jewelry and as a form of currency.
            </h1>
            <h1 className="lg:pb-10">
              Its value is determined by the market 24 hours a day, seven days a
              week. Gold trades predominantly as a function of sentiment—its
              price is less affected by the laws of supply and demand. This is
              because the new mine supply is vastly outweighed by the sheer size
              of above-ground, hoarded gold. To put it simply, when hoarders
              feel like selling, the price drops. When they want to buy, a new
              supply is quickly absorbed and gold prices are driven higher.
            </h1>
          </span>
          <Link
            href={"/"}
            className={`underline text-[${companyInfo.web_secondary_color}]`}
          >
            {"View Warranty >"}
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="max-md:order-2 order-1 ">
          <h1 className="revaluation-heading-text font-bold text-black">
            Silver
          </h1>
          <h1 className="lg:py-10  py-4">
            While silver roughly trades in line with gold as an item to be
            hoarded, the industrial supply/demand equation for the metal exerts
            an equally strong influence on its price. That equation has always
            fluctuated with new innovations, including:
          </h1>
          <Link
            href={"/"}
            className={`underline text-[${companyInfo.web_secondary_color}]`}
          >
            {"Contact a Diamond Expert >"}
          </Link>
        </div>
        <div className="w-full h-full py-8 order-1">
          <img src="/assets/Photos/silver.jpg" className="h-full w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5 items-center">
        <div className="w-full h-full py-10 max-md:py-2 ">
          <img src="/assets/Photos/platinum.jpg" className="h-full w-full" />
        </div>
        <div>
          <h1 className="revaluation-heading-text font-bold text-black">
            Platinum
          </h1>
          <h1 className="lg:py-10  py-4">
            Like gold and silver, platinum trades around the clock on global
            commodities markets. It often tends to fetch a higher price (per
            troy ounce) than gold during routine periods of market and political
            stability simply because it's much rarer. Far less of the metal is
            actually pulled from the ground annually.
          </h1>
          <Link
            href={`/${ROUTES.LOCATION}`}
            className={`underline text-[${companyInfo.web_secondary_color}]`}
          >
            {"Find a Store >"}
          </Link>
        </div>
      </div>
    </div>
  );
};
PreciousMetalGuide.Layout = Layout;

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
export default PreciousMetalGuide;
