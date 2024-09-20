import BirthStoneProductOne from "../birthstone-product/product_1";
import { siteSettings } from "../../settings/site-settings";
import Layout from "@components/layout/layout-configurator";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import EnternityBandProductPage1 from "./product_1";

export default function ProductSlug() {
    const showProductPage = () => {
        if (siteSettings.productPage === "#TCC-product-1") {
            return <EnternityBandProductPage1 />;
        } else if (siteSettings.productPage === "#TCC-product-2") {
        } else {
        }
    };

    return <>{showProductPage()}</>;
}

ProductSlug.Layout = Layout;

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
