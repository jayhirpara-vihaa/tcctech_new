import Container from "@components/ui/container";
import Layout from "@components/layout/layout-three";
import VerifyOTP from "@components/auth/verifyOTP-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
export default function OtpVerification() {
  return (
    <>
      {/* <PageHeader pageHeader="Sign In" /> */}
      <Container>
        <div className="py-16 lg:py-20 px-4 md:px-8 2xl:px-16">
          <VerifyOTP />
        </div>
      </Container>
    </>
  );
}

OtpVerification.Layout = Layout;

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
