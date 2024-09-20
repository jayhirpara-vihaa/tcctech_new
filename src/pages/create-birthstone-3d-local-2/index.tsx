import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Container from "@components/ui/container";
import Divider from "@components/ui/divider";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { useCompanyInfoProductsQuery } from "src/framework/company-info/get-all-company-info";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import BirthStoneLayout from "@components/layout/layout-zamels";

const ProductBirthStone3DRenderLocal2 = dynamic(() => import("@components/product/product-birthstone-3d-render-2"), {
    ssr: false,
});

export default function Product2() {
    // const { t } = useTranslation("common");
    const { updateOnlineLogos } =
        useContext(CompanyInfoContext);
    const { data: CompanyInfoData } = useCompanyInfoProductsQuery();
    const checkUserName = sessionStorage.getItem('config_user_email')
    useEffect(() => {
        //updateCompanyInfo(CompanyInfoData?.data.companyInfo);
        updateOnlineLogos(CompanyInfoData?.data.images);
    }, [CompanyInfoData]);

    useEffect(() => {
        if (checkUserName == null) {
            //Router.push('/config-login')
        }
    }, [checkUserName])


    return (
        <>
            <Divider className="mb-0" />
            <Container>
                {<ProductBirthStone3DRenderLocal2 />}

            </Container>
        </>
    );
}

Product2.Layout = BirthStoneLayout;

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