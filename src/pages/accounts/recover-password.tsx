import Container from "@components/ui/container";
import Layout from "@components/layout/layout-one";
import ResetPasswordForm from "@components/auth/reset-passWord-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function RecoverPassword() {
  return (
    <>
      {/* <PageHeader pageHeader="Forget Password" /> */}
      <Container>
        <div className="py-16 lg:py-20">
          <ResetPasswordForm />
        </div>
      </Container>
    </>
  );
}

RecoverPassword.Layout = Layout;

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
