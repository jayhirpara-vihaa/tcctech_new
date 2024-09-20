import Layout from "@components/layout/layout-three";
import AccountLayout from "@components/my-account/account-layout";
import MyAddress from "@components/my-account/my-address";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function My_Address() {
  return (
    <AccountLayout>
      <MyAddress isCheckout={false} />
    </AccountLayout>
  );
}

My_Address.Layout = Layout;
My_Address.authenticate = true;

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
