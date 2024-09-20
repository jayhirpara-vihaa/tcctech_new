import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Layout from "@components/layout/layout-three";
import Container from "@components/ui/container";
import { useTranslation } from "next-i18next";
import Divider from "@components/ui/divider";
import ProductConfigDetails from "@components/product/product-config-details";
import { useConfiguratorSideBarQuery } from "@framework/configurator-sidebar/configurator-sidebar";

export default function Product2() {
  const { t } = useTranslation("common");
  const { data } = useConfiguratorSideBarQuery();
  console.log("main page data", data);
  return (
    <>
      <Divider className="mb-0" />
      <Container>
        <div className={`flex items-center justify-center mt-2 pb-0.5`}>
          <span className="Tcc-text-our-Jewelry-Section flex justify-center">
            {t("text-create-own-ring")}
          </span>
        </div>
        {data && <ProductConfigDetails configData={data && data.data} />}
      </Container>
    </>
  );
}

Product2.Layout = Layout;

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
