import Link from "@components/ui/link";
import Layout from "@components/layout/layout-three";
import AccountLayout from "@components/my-account/account-layout";
import { ROUTES } from "@utils/routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { useContext } from "react";
import { CompanyInfoContext } from "@contexts/company_info/company_info";

export default function AccountPage() {
  const { t } = useTranslation("common");
  const { companyInfo } = useContext(CompanyInfoContext);
  return (
    <AccountLayout>
      <p className=" text-sm leading-7 md:text-base md:leading-loose lowercase">
        {/* {t("text-account-dashboard")}{" "} */}
        <Link
          href={ROUTES.ORDERS}
          className={`text-[${companyInfo.web_secondary_color}] underline font-semibold`}
        >
          {t("text-recent-orders")}
        </Link>
        , {t("text-manage-your")}{" "}
        <Link
          href={ROUTES.ACCOUNT_DETAILS}
          className={`text-[${companyInfo.web_secondary_color}] underline font-semibold`}
        >
          {t("text-account-details")}
        </Link>{" "}
        {t("text-and")}{" "}
        <Link
          href={ROUTES.CHANGE_PASSWORD}
          className={`text-[${companyInfo.web_secondary_color}] underline font-semibold`}
        >
          {t("text-change-your-password")}
        </Link>
        .
      </p>
    </AccountLayout>
  );
}

AccountPage.Layout = Layout;
AccountPage.authenticate = true;

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
