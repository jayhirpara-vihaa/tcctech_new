import type { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext, useUI } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { useEffect, useRef, Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";
import { HydrationProvider, Client } from "react-hydration-provider";

// Load Open Sans and satisfy typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import "@styles/rc-drawer.css";
import "@styles/index.css";

import { getDirection } from "@utils/get-direction";
import DiamondSettingProvider from "@contexts/diamond_setting/diamond-setting-context";
import DiamondShapeProvider from "@contexts/diamond_shape/diamond-shape.context";
import ProductDetailsProvider from "@contexts/productDetails/product-Details-Context";
import PrivateRoute from "@utils/private-route";
import CompanyInfoProvider from "@contexts/company_info/company_info";
import { siteSettings } from "@settings/site-settings";
import CheakOutContextProvider from "@contexts/cheakout/order_cheakout";
import FallbackSpinner from "@components/spinner";
import { getUserDetails } from "@store/authorization";
import { useLogoutMutation } from "@framework/auth/use-logout";
import Cookies from "js-cookie";
import {
  AUTH_TOKEN,
  CARTPRODUCTDETAIL,
  CART_TOTAL,
  USER_DETAILS,
} from "@utils/constants";

const handleExitComplete = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
};

function Noop({ children }: React.PropsWithChildren<{}>) {
  return <>{children}</>;
}

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [show, setShow] = useState(false);
  let sessionData: any = {};
  const userData = getUserDetails();
  useEffect(() => {
    if (
      userData === null ||
      userData === undefined ||
      Object.keys(userData).length === 0
    ) {
      Cookies.remove(AUTH_TOKEN);
      Cookies.remove(USER_DETAILS);
      Cookies.remove("modelclose");
      Cookies.remove("newsAnnounce");
      Cookies.remove(CART_TOTAL);
      // Cookies.remove(CARTPRODUCTDETAIL);
    }
  }, [userData]);

  useEffect(() => {
    if (sessionData && sessionData !== null) {
      setShow(true);
    }
  }, [sessionData]);

  setTimeout(() => {
    const data = siteSettings;
    if (data && data !== undefined) {
      sessionData = data;
    }
  }, 1000);

  const queryClientRef = useRef<any>();
  ` `;
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  const Layout = (Component as any).Layout || Noop;
  const authProps = (Component as any).authenticate || false;

  // useEffect(() => {
  //   document.addEventListener("contextmenu", function (e) {
  //     e.preventDefault();
  //   });
  //   // Block F12
  //   document.addEventListener("keydown", function (e) {
  //     if (e.key === "F12" || e.keyCode === 123) {
  //       e.preventDefault();
  //     }
  //   });
  // }, []);

  return (
    <HydrationProvider>
      {show ? (
        <Client>
          <Suspense fallback={<div>Loading...</div>}>
            <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
              <CompanyInfoProvider>
                <DiamondSettingProvider>
                  <DiamondShapeProvider>
                    <ProductDetailsProvider>
                      <CheakOutContextProvider>
                        <QueryClientProvider client={queryClientRef.current}>
                          <Hydrate state={(pageProps as any).dehydratedState}>
                            {/* @ts-ignore */}
                            <ManagedUIContext>
                              <DefaultSeo />
                              {Boolean(authProps) ? (
                                <PrivateRoute>
                                  <Layout>
                                    <Component
                                      {...pageProps}
                                      key={router.route}
                                    />
                                  </Layout>
                                </PrivateRoute>
                              ) : (
                                <Layout>
                                  <Component
                                    {...pageProps}
                                    key={router.route}
                                  />
                                </Layout>
                              )}
                              <ToastContainer theme="light" />
                              <ManagedModal />
                              <ManagedDrawer />
                            </ManagedUIContext>
                          </Hydrate>
                          {/* <ReactQueryDevtools /> */}
                        </QueryClientProvider>
                      </CheakOutContextProvider>
                    </ProductDetailsProvider>
                  </DiamondShapeProvider>
                </DiamondSettingProvider>
              </CompanyInfoProvider>
            </AnimatePresence>
          </Suspense>
        </Client>
      ) : (
        <div>
          <FallbackSpinner />
        </div>
      )}
    </HydrationProvider>
  );
};

export default appWithTranslation(CustomApp);
