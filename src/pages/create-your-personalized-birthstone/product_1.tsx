import Container from "@components/ui/container";
import Layout from "@components/layout/layout-configurator";
import Divider from "@components/ui/divider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import ProductPannel from "@components/ui/Product_panels";
import ProductReview from "@components/product-review/product-review";
import BirthStoneProductSingleDetails from "@components/product/birthstone-product-details";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";

const BirthStoneDetailComponent = dynamic(() => import("@components/product/zamles-birthstone-product-details"), {
    ssr: false,
});

export default function BirthStoneProductPage1() {
    const { t } = useTranslation("common");
    return (
        <>
            <Divider className="mb-0" />
            <Container>
                <div className={`flex items-center justify-center mt-2 pb-0.5`}>
                    {/* <span className="Tcc-text-our-Jewelry-Section flex justify-center">
                        {t("text-engagement-ring-setting")}
                    </span> */}
                </div>
                {/* <ProductPannel /> */}
                <BirthStoneDetailComponent />
                {/* <ProductReview /> */}
            </Container>
        </>
    );
}

BirthStoneProductPage1.Layout = Layout;

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
