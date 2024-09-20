import SectionHeader from "@components/common/bestSelling-section-header";
import Layout from "@components/layout/layout-three";
import Link from "@components/ui/link";
import Text from "@components/ui/text";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const blackCards = () => {
  return (
    <div className="px-4 md:px-8 2xl:px-16 max-sm:mt-36 md:mt-32 lg:mt-44 xl:mt-8 mx-auto max-w-[1920px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
        <div className="w-full h-full py-8 order-1">
          <img
            src="/assets/Photos/black-gift-card.jpg"
            className="w-full h-full"
          />
        </div>
        <div className="max-md:order-2 order-1  py-8">
          <h1 className="revaluation-heading-text font-bold  ">Black cards</h1>
          <h1 className="lg:py-10  py-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            esse at cumque nobis accusantium, numquam dolorem odit cum ipsa ex
            iste hic inventore ut sunt dolore veniam soluta adipisci aut.
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="max-md:order-2 order-1 ">
          <h1 className="revaluation-heading-text font-bold text-black">
            Platinum cards
          </h1>
          <h1 className="lg:py-10  py-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse quae,
            accusamus cum quo aperiam perferendis mollitia possimus, ea commodi
            autem id quisquam tempora qui sed odit eius consectetur sint
            nesciunt.
          </h1>
        </div>
        <div className="w-full h-full py-8 order-1">
          <img
            src="/assets/Photos/black-gift-card.jpg"
            className="h-full w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5 items-center">
        <div className="w-full h-full py-10 max-md:py-2 ">
          <img
            src="/assets/Photos/black-gift-card.jpg"
            className="h-full w-full"
          />
        </div>
        <div>
          <h1 className="revaluation-heading-text font-bold text-black">
            Gold
          </h1>
          <h1 className="lg:py-10  py-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
            ipsam, praesentium, nulla, unde id facilis aperiam eius quod esse
            qui iste possimus? Ea perspiciatis molestiae ipsam repudiandae quis.
            Illum, ullam! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Deleniti mollitia nisi laboriosam placeat debitis a nemo
            molestiae, iste atque dignissimos natus, similique architecto?
            Maxime nesciunt nam, enim odio nihil veniam.
          </h1>
        </div>
      </div>
    </div>
  );
};

blackCards.Layout = Layout;
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
export default blackCards;
