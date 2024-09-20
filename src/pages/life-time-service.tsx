import Layout from "@components/layout/layout-three";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useContext } from "react";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import SectionHeader from "@components/common/theProcess-section-header";

const LifeTimeService = () => {
  const { companyInfo } = useContext(CompanyInfoContext);
  return (
    <div className="px-4 md:px-8 2xl:px-16 max-sm:mt-36 md:mt-32 lg:mt-44 xl:mt-8 mx-auto max-w-[1920px]">
      <div>
        <SectionHeader
          topVarient={false}
          sectionHeading={"A Lifetime of Service"}
          className="pb-0.5 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 "
        />
        <h1 className="py-8 text-center">
          When you purchase an engagement ring, you become a valued member of
          the Nungu family. We pride ourselves on providing continuous premium
          service, including care and repair, complimentary ring polishing and a
          full lifetime warranty.
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
        <div className="w-full h-full py-8 order-1">
          <img
            src="/assets/images/LifeTimeService-1.png"
            className="w-full h-full"
          />
        </div>
        <div className="max-md:order-2 order-1  py-8">
          <h1 className="revaluation-heading-text font-bold  ">
            Nungu Diamond Certificate and Lifetime Warranty
          </h1>
          <h1 className="lg:py-10  py-4">
            We are the only global luxury jeweler to guarantee the quality of
            our engagement diamonds through our Tiffany Diamond Certificate,
            issued by Tiffany & Co. to certify the authenticity and integrity of
            serialized Tiffany diamonds. View Warranty
          </h1>
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
            Ring Upgrade Program
          </h1>
          <h1 className="lg:py-10  py-4">
            Whether it’s your fifth anniversary or your first, our Ring Upgrade
            Program offers the opportunity to upgrade your Nungu engagement
            ring. Upon review, you will receive a credit up to the original
            purchase price, which can be used toward the purchase of a new Nungu
            engagement ring.
          </h1>
          <Link
            href={"/"}
            className={`underline text-[${companyInfo.web_secondary_color}]`}
          >
            {"Contact a Diamond Expert >"}
          </Link>
        </div>
        <div className="w-full h-full py-8 order-1">
          <img
            src="/assets/images/LifeTimeService-2.png"
            className="h-full w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5 items-center">
        <div className="w-full h-full py-10 max-md:py-2 ">
          <img
            src="/assets/images/LifeTimeService-3.png"
            className="h-full w-full"
          />
        </div>
        <div>
          <h1 className="revaluation-heading-text font-bold text-black">
            Cleaning
          </h1>
          <h1 className="lg:py-10  py-4">
            This complimentary service is offered over the lifetime of your ring
            and not only ensures that your diamonds or gemstones are cleaned, it
            also includes routinely checking (every six months) that the stones
            are secure in their settings. With proper care, your Tiffany diamond
            ring will retain its beauty and character for many generations to
            come. Contact us or bring your ring to one of our stores for
            cleaning.
          </h1>
          <Link
            href={`/${ROUTES.LOCATION}`}
            className={`underline text-[${companyInfo.web_secondary_color}]`}
          >
            {"Find a Store >"}
          </Link>
        </div>
      </div>
      <div className="text-center py-16">
        <SectionHeader
          topVarient={false}
          sectionHeading={"Repairs"}
          className="pb-0.5 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 mb-8"
        />
        <h1 className="py-8">
          We ensure that our craftsmanship is to the highest standards and
          repair all items made by Nungu Diamonds You may either bring your item
          to the Nungu store near you or send in your item by mail. If you
          choose to send your item by mail, please follow the instructions
          listed below.
        </h1>
        <h1 className="py-2">
          1. Download our Repair Form or email:
          CustomerRelations@Nungudiamonds.com.
        </h1>
        <h1 className="py-2">2. Print form and complete all information.</h1>
        <h1 className="py-2">3. Enclose form with item to be repaired.</h1>
        <h1 className="py-2">
          4. Send item and form, via an insured shipping method, to:
        </h1>
        <h1 className="py-2 ">TCO Client Services</h1>
        <h1 className="py-2 ">
          75-20 Astoria Boulevard, Third FloorEast Elmhurst, NY 11370
        </h1>
        <h1 className="py-2 ">
          After we make an assessment, we will send you a free estimate. At this
          time, we can only accept shipments from clients residing in the U.S.
          If you reside outside of the U.S., please refer to your local Tiffany
          & Co. or you may call us at 800 464 5000 and we can assist you with
          your servicing needs.
        </h1>
        <Link
          href={ROUTES.LOCATION}
          className={`underline text-[${companyInfo.web_secondary_color}]`}
        >
          {"Find a Store >"}
        </Link>
      </div>
    </div>
  );
};
LifeTimeService.Layout = Layout;

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
export default LifeTimeService;
