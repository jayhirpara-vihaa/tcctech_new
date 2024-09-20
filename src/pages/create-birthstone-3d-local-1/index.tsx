import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Container from "@components/ui/container";
import Divider from "@components/ui/divider";
import dynamic from "next/dynamic";
import BirthStoneLayout from "@components/layout/layout-zamels";

const ProductBirthdayStone3DRenderLocal1 = dynamic(() => import("@components/product/product-birthstone-3d-render-1"), {
    ssr: false,
});

export default function Product2() {

    const checkUserName = sessionStorage.getItem('config_user_email')

    // useEffect(() => {
    //     if (checkUserName == null) {
    //         //Router.push('/config-login')
    //     }
    // }, [checkUserName])


    return (
        <>
            <Divider className="mb-0" />
            <Container>
                {<ProductBirthdayStone3DRenderLocal1 />}

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