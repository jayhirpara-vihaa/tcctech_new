import { NextSeo } from "next-seo";
import Header from "@components/layout/header/header";
import { default as Footer } from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <NextSeo
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
        ]}
        title="The Cad Co"
        description=""
        canonical="https://tcctechno.com/"
        openGraph={{
          url: "https://tcctechno.com/",
          title: "The Cad Co",
          description: "",
          images: [
            {
              url: "/assets/images/og-image-01.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
            {
              url: "/assets/images/og-image-02.png",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
            },
          ],
        }}
      />
      <Header />
      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
      <Footer />
      <MobileNavigation />
      <Search />
      {/* <CookieBar
        title={t("text-cookies-title")}
        hide={acceptedCookies}
        action={
          <Button onClick={() => onAcceptCookies()} variant="flat">
            {t("text-accept-cookies")}
          </Button>
        }
      /> */}
    </div>
  );
}
