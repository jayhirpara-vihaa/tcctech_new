import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Layout from "@components/layout/layout-BET";
import Divider from "@components/ui/divider";
import Container from "@components/ui/container";
import Text from "@components/ui/text";
import { DemoProductGridBET } from "@components/product/demoProduct-grid-BET";
export default function Product2() {
  return (
    <>
      <Divider className="mb-0" />
      <Container className=" mx-auto">
        <div className="max-w-[1240px] mx-auto">
          <div className="mt-[127px] lg:mt-[14.5rem] xl:mt-[6.5rem] md:mt-[120px]">
            <div
              className={`flex items-center justify-center mt-2 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8 text-black`}
            >
              <Text className="zapfumanist-font font-medium">
                Engagement Rings
              </Text>
            </div>
            <DemoProductGridBET />
          </div>
        </div>
      </Container>
    </>
  );
}

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
