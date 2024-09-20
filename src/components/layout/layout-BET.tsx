import Header from "@components/layout/header/header-configurator-BET";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col min-h-screen">
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
      {/* <MobileNavigation /> */}
      <Search />
    </div>
  );
}
