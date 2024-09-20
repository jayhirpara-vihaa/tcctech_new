import Container from "@components/ui/container";
import Layout from "@components/layout/layout-three";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import CartProductList from "@components/cart-page/cart-product-list";
import CartCheckOutCard from "@components/cart-page/cart-checkout-card";
import Text from "@components/ui/text";
import { useTranslation } from "next-i18next";

export default function CARTPAGE() {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`flex items-center justify-center mt-10 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8`}
      >
        <Text className="Tcc-text-our-Jewelry-Section pb-1.5">
          {t("text-my-cart")}
        </Text>
      </div>
      <Container>
        <div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
          <div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
            <CartProductList />
          </div>
          <div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
            <CartCheckOutCard />
          </div>
        </div>
      </Container>
    </>
  );
}

CARTPAGE.Layout = Layout;
// CARTPAGE.authenticate = true;
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
