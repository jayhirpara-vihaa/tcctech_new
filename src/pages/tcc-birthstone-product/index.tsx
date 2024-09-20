import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Layout from "@components/layout/layout-configurator";
import Divider from "@components/ui/divider";
import Container from "@components/ui/container";
import Text from "@components/ui/text";
import { ZamlesBirthstoneProductGrid } from "@components/product/zamles-birthstoneProduct-grid";

const companyInfoKey = process.env.NEXT_PUBLIC_COMPANY_INFO_KEY
export default function Product2() {
    const webConfigBgColor = process.env.NEXT_PUBLIC_ZAMLES_BG_COLOR;

    return (

        <>
            <Divider className="mb-0" />
            <Container>

                <div className="mt-[127px] lg:mt-[14.5rem] xl:mt-[6.5rem] md:mt-[120px]">
                    <div
                        className={`flex items-center justify-center mt-2 pb-0.5 mb-[4.5rem] md:mb-[4.5rem] lg:mb-[4.5rem] 2xl:mb-7 3xl:mb-8 text-black`}
                    >
                        <Text className={`zamels-main-title-section feijoa-bold tracking-[1.5px] leading-normal text-[${webConfigBgColor}]`}>
                            Birthstone Collection
                        </Text>
                    </div>
                    {companyInfoKey == "THE_CAD_CO" ?
                        <ZamlesBirthstoneProductGrid /> :
                        companyInfoKey == "ZAMLES_APP_KEY" ?
                            <ZamlesBirthstoneProductGrid /> :
                            <ZamlesBirthstoneProductGrid />}

                </div>
            </Container>
        </>
    );
};

Product2.Layout = Layout;

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
