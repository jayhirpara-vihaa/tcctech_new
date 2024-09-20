import { useRouter } from 'next/router';
import { useProductQuery } from '@framework/product/get-product';
import GalleryDefault from '../../components/product/gallery-default-product-3';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Layout from "@components/layout/layout-three";
import DetailOne from "../../components/product/detail-one";
import Container from "@components/ui/container";
import { useTranslation } from "next-i18next";
import ProductReview from "@components/product-review/product-review";

export default function Product_3() {
    const {
        query: { slug },
    } = useRouter();
    const { data, isLoading } = useProductQuery(slug as string);
    const { t } = useTranslation("common");

    return (
        <Container>
            <div className={`flex items-center justify-center mt-2 pb-0.5`}>
                <span className="Tcc-text-our-Jewelry-Section flex justify-center">{t("text-engagement-ring-setting")}</span>
            </div>
            <div className="flex flex-cols-2 ">
                <div className="">
                    {
                        !isLoading ?
                            <GalleryDefault product={data} />
                            : ""
                    }
                </div>
                <div className="">
                    <DetailOne product={data} />
                </div>
            </div >
            <ProductReview />
        </Container>

    )
}

Product_3.Layout = Layout;

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

