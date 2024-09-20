import Container from "@components/ui/container";
import Layout from "@components/layout/layout-three";
import LoginForm from "@components/auth/login-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
export default function SignInPage() {
  return (
    <>
      {/* <PageHeader pageHeader="Sign In" /> */}
      <Container>
        <div className="py-16 lg:py-20 px-4 md:px-8 2xl:px-16 max-lg:mt-[89px] max-xl:mt-[8.8rem]">
          <LoginForm />
        </div>
        {/* <Subscription /> */}
      </Container>
    </>
  );
}

SignInPage.Layout = Layout;

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
