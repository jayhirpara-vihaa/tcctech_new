import Link from "@components/ui/link";
import SearchIcon from "@components/icons/search-icon";
import UserIcon from "@components/icons/user-icon";
import MenuIcon from "@components/icons/menu-icon";
import HomeIcon from "@components/icons/home-color-icon";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import dynamic from "next/dynamic";
import { Drawer } from "@components/common/drawer/drawer";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";
import { siteSettings } from "@settings/site-settings";
const MobileCartButton = dynamic(
  () => import("@components/cart/mobile-cart-button"),
  {
    ssr: false,
  }
);
const AuthMenu = dynamic(() => import("@components/layout/header/auth-menu"), {
  ssr: false,
});
const MobileMenu = dynamic(
  () => import("@components/layout/header/mobile-menu")
);

const BottomNavigation: React.FC = () => {
  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
    // setDrawerView,
    openSearch,
    openModal,
    setModalView,
    isAuthorized,
  } = useUI();

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };

  return (
    <>
      <div className="lg:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4 md:px-8">
        <button
          aria-label="Menu"
          className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
          onClick={handleMobileMenu}
        >
          <MenuIcon />
        </button>
        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          onClick={openSearch}
          aria-label="search-button"
        >
          <SearchIcon
            color={"mobileNavigationIconColor"}
            width={"16"}
            height={"18"}
            className={""}
          />
        </button>
        <Link href="/" className="flex-shrink-0">
          <HomeIcon color={"black"} width={"20"} height={"20"} className={""} />
        </Link>
        <MobileCartButton />
        <Link
          href={`${isAuthorized ? ROUTES.ACCOUNT : ROUTES.LOGIN}`}
          className="truncate text-sm text-heading mb-1.5"
        >
          <UserIcon
            color={"mobileNavigationIconColor"}
            width={"16"}
            height={"18"}
            className={""}
          />
        </Link>
      </div>
      {/* TODO: need to use just one drawer component */}
      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displaySidebar}
        onClose={closeSidebar}
        contentWrapperStyle={contentWrapperCSS}
        {...motionProps}
      >
        <MobileMenu />
      </Drawer>
    </>
  );
};

export default BottomNavigation;
