import Container from "@components/ui/container";
import Layout from "@components/layout/layout-three";
// import Subscription from "@components/common/subscription";
import ProductSingleDetails from "@components/product/product-single-details";
// import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
// import Breadcrumb from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import ProductPannel from "@components/ui/Product_panels";
import ProductReview from "@components/product-review/product-review";

export default function ProductPage1() {
  const { t } = useTranslation("common");
  return (
    <>
      <Divider className="mb-0" />
      <Container>
        <div className={`flex items-center justify-center mt-2 pb-0.5`}>
          <span className="Tcc-text-our-Jewelry-Section flex justify-center">
            {t("text-engagement-ring-setting")}
          </span>
        </div>
        {/* <ProductPannel /> */}
        <ProductSingleDetails />
        <ProductReview />
      </Container>
    </>
  );
}

ProductPage1.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
