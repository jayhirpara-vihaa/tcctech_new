import Container from "@components/ui/container";
import Layout from "@components/layout/layout-three";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Wishlist from "@components/wishlist/wishlist-product-list";
import Text from "@components/ui/text";
import { useTranslation } from "next-i18next";
import Counter from "@components/common/counter";
import { useEffect } from "react";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";

export default function WISHLIST() {
  const { t } = useTranslation();
  const { isAuthorized } = useUI();
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
      router.push("/wishlist");
    } else {
      router.replace("/login");
    }
  }, []);

  return (
    <>
      <div
        className={`flex items-center justify-center mt-36 lg:mt-40 xl:mt-10 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8 `}
      >
        <Text className="Tcc-text-our-Jewelry-Section pb-1.5">
          {t("text-my-wishlist")}
        </Text>
      </div>
      <Container>
        <div className="my-14 xl:my-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full ">
          <div className="md:w-full flex h-full flex-col -mt-1.5 px-4 md:px-8 2xl:px-16 ">
            <Wishlist />
          </div>
        </div>
      </Container>
    </>
  );
}

WISHLIST.Layout = Layout;
WISHLIST.authenticate = true;

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
// function updateUserId(id: any) {
//   throw new Error("Function not implemented.");
// }
