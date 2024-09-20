import Container from "@components/ui/container";
import Layout from "@components/layout/layout-three";
import Subscription from "@components/common/subscription";
import CheckoutForm from "@components/checkout/checkout-form";
import CheckoutCard from "@components/checkout/checkout-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import Text from "@components/ui/text";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CheakOutContext } from "@contexts/cheakout/order_cheakout";
import { useOrderMutation } from "@framework/checkout/add-order-details";
import { getUserDetails } from "@store/authorization";
import { ProductDetailsContext } from "@contexts/productDetails/product-Details-Context";

export default function CheckoutPage() {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`flex items-center justify-center mt-10 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8`}
      >
        <Text className="Tcc-text-our-Jewelry-Section">
          {t("text-proceed-to-checkout")}
        </Text>
      </div>
      <Container>
        <div className="xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
          <div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
            <CheckoutForm />
          </div>
          <div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full">
            <CheckoutCard />
          </div>
        </div>
        <Subscription />
      </Container>
    </>
  );
}

CheckoutPage.Layout = Layout;

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
