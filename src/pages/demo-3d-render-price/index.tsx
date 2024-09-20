import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Layout from "@components/layout/layout-configurator";
import Container from "@components/ui/container";
import { useTranslation } from "next-i18next";
import Divider from "@components/ui/divider";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { useCompanyInfoProductsQuery } from "src/framework/company-info/get-all-company-info";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import { useConfiguratorSideBarQuery } from "@framework/configurator-sidebar/configurator-sidebar";
import Modal from "react-modal";

const DemoProduct3DRender = dynamic(
  () => import("@components/product/demo-product-3d-render-price"),
  {
    ssr: false,
    loading: () => <p></p>,
  }
);

export default function Product2() {
  const [password, setPassword] = useState("");

  const { data: configData } = useConfiguratorSideBarQuery();

  const { updateOnlineLogos } = useContext(CompanyInfoContext);
  const { data: CompanyInfoData } = useCompanyInfoProductsQuery();

  useEffect(() => {
    updateOnlineLogos(CompanyInfoData?.data.images);
  }, [CompanyInfoData]);

  useEffect(() => {
    setPassword("");
  }, []);

  return (
    <>
      {password === "Tcc@123$" ? (
        <>
          <Divider className="mb-0" />
          <Container>
            {configData && (
              <DemoProduct3DRender configData={configData && configData.data} />
            )}
          </Container>
        </>
      ) : (
        <div className="flex justify-center items-center h-80">
          <form className="max-w-sm p-4 bg-gray-100 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Enter Password
            </h2>
            <div className="mb-4">
              <input
                className="w-full p-2 border rounded shadow-sm"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center"></div>
          </form>
        </div>
      )}
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
