import Container from "@components/ui/container";
import Layout from "@components/layout/layout-three";
import SignUpForm from "@components/auth/sign-up-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function SignUpPage() {
  return (
    <>
      {/* <PageHeader pageHeader="Register" /> */}
      <Container>
        <div className="py-16 lg:py-20 md:px-4 md:px-8 2xl:px-16">
          <SignUpForm />
        </div>
      </Container>
    </>
  );
}

SignUpPage.Layout = Layout;

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
