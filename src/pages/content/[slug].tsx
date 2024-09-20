import Layout from "@components/layout/layout-three";
import Container from "@components/ui/container";
import PageHeader from "@components/ui/page-header";
import { privacyPolicy } from "@settings/privacy-settings";
import SectionHeader from "@components/common/theProcess-section-header";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { useStaticDetailMutation } from "src/framework/company-info/get-static-page";
import { useEffect } from "react";
import { useRouter } from "next/router";
import FallbackSpinner from "@components/spinner";

// function makeTitleToDOMId(title: string) {
//     return title?.toLowerCase()?.split(" ")?.join("_");
// }

export default function ContentPage() {
    const { t } = useTranslation("privacy");
    //const query = useRouter();
    const {
        query: { slug },
    } = useRouter();

    const { data: staticDetail, mutate: fetchStaticDetail } =
        useStaticDetailMutation();
    useEffect(() => {
        fetchStaticDetail({ slug: slug });
    }, [slug]);

    return (
        <>
            {/* <PageHeader pageHeader="text-page-privacy-policy" /> */}
            <div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
                {
                    staticDetail && staticDetail?.data && staticDetail?.data?.page_title
                        ?
                        <Container>
                            <div className="flex justify-center flex-col md:flex-row max-sm:mt-32 lg:mt-8 mt-0 md:mt-24">
                                <div className="md:w-11/12 md:ps-8 pt-0 lg:pt-2">
                                    <Element
                                        key={staticDetail?.data?.page_title}
                                        id={staticDetail?.data?.slug}
                                        className="mb-10"
                                    >
                                        <SectionHeader
                                            topVarient={false}
                                            sectionHeading={staticDetail?.data?.page_title}
                                            className="pb-0.5 sm:mb-1.5 md:mb-2 lg:mb-3 2xl:mb-4 3xl:mb-5 "
                                        />
                                        <div
                                            className="mt-4"
                                            dangerouslySetInnerHTML={{
                                                __html: t(`${staticDetail?.data?.content}`),
                                            }}
                                        ></div>
                                    </Element>
                                </div>
                            </div>
                        </Container>
                        : <FallbackSpinner />
                }

            </div>
        </>
    );
}

ContentPage.Layout = Layout;

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
