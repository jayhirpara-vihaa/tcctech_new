import React, { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { siteSettings } from "@settings/site-settings-BET";
import HeaderMenu from "@components/layout/header/header-menu-config-BET";
import Image from "next/image";
import { useUI } from "@contexts/ui.context";
import { addActiveScroll } from "@utils/add-active-scroll";
import { getUserDetails } from "@store/authorization";
import { useCartAndWishlistCountMutation } from "@framework/product/wishlist/wish-cart-product-count";

// Icons
import { IoIosSearch } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import {
  HiOutlineBars3,
  HiOutlinePhone,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { HiComputerDesktop } from "react-icons/hi2";
import Divider from "@components/ui/divider";
import Input from "@components/ui/input";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useWindowSize } from "@utils/use-window-size";

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

export default function Header() {
  const { openSidebar, setDrawerView, isAuthorized } = useUI();
  const [userName, setuserName] = useState();

  const { site_header } = siteSettings;
  const userData = getUserDetails();
  const { width } = useSsrCompatible(useWindowSize(), {
    width: 0,
    height: 0,
  });
  const siteHeaderRef = useRef() as DivElementRef;

  useEffect(() => {
    setuserName(userData?.full_name);
  }, [userData]);

  const { data: countData, mutate: cartAndWishlistCountList } =
    useCartAndWishlistCountMutation();

  addActiveScroll(siteHeaderRef);

  //const { isLoading } = useCompanyInfoProductsQuery();
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishListCount, setWishListCount] = useState<number>(0);
  const [closeAnnounce, setCloseAnnounce] = useState<boolean>(true);
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState("close");
  const closeValueAnnounce = Cookies.get("newsAnnounce");

  useEffect(() => {
    setCloseAnnounce(closeValueAnnounce as unknown as boolean);
  }, [closeValueAnnounce]);

  function handleMobileMenu() {
    setDrawerView("MOBILE_MENU");
    return openSidebar();
  }

  useEffect(() => {
    if (isAuthorized) {
      if (userData && userData?.id_app_user) {
        cartAndWishlistCountList({
          user_id: userData?.id_app_user,
        });
      }
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (countData) {
      const cartCountValue = countData?.data?.totalCartCount;
      const wishListCountValue = countData?.data?.wish_list_count;
      setCartCount(cartCountValue);
      setWishListCount(wishListCountValue);
    }
  }, [countData]);

  useEffect(() => {
    if (searchText !== "") {
      const delayDebounceFn = setTimeout(() => {
        setSearchOpen("open");
      }, 800);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchOpen("close");
    }
  }, [searchText]);

  return (
    <>
      <header
        id="siteHeader"
        ref={siteHeaderRef}
        className="relative z-20 w-full xl:h-36 headerThree "
      >
        {width >= 768 && (
          <div
            className={`fixed z-20 content-center w-full  text-gray-700 transition duration-200 ease-in-out bg-headerBackgroundColor innerSticky body-font `}
          >
            <div className="h-8 bg-[#183e40] p-1">
              <p className="font-bold tracking-widest text-center text-white">
                ENDS SOON! Free Diamond Jewelry With All Purchases. &gt;
              </p>
            </div>

            <div className="z-[099] px-4 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 md:px-8 2xl:px-16">
              {/* First Component */}
              <div className="flex pt-5 justify-between space-x-6 mx-auto max-w-[1240px]">
                <div className="flex items-center gap-10">
                  <span className="nungu-location-address-text">
                    800.691.0952
                  </span>
                  <span className="nungu-location-address-text">Stores</span>
                  <div className="flex gap-2">
                    <span>
                      <HiComputerDesktop size={20} />
                    </span>
                    <span className="nungu-location-address-text">
                      Virtual Appointment
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-10">
                  <IoIosSearch size={22} />
                  <AiOutlineUser size={22} />
                  <CiHeart size={22} />
                  <HiOutlineShoppingBag size={22} />
                </div>
              </div>
              {/* Second Component */}
              <div className="flex justify-between items-center mx-auto max-w-[1920px] h-22 lg:h-20 xl:h-20 w-full relative before:absolute before:w-screen lg:before:h-px ">
                <button
                  aria-label="Menu"
                  className="flex-col items-center justify-center flex-shrink-0 hidden h-full px-5 outline-none menuBtn md:flex lg:hidden 2xl:px-7 focus:outline-none"
                  onClick={handleMobileMenu}
                >
                  <span className="menuIcon">
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                  </span>
                </button>

                <div>
                  <input
                    id="search"
                    className={`w-full hidden lg:hidden text-sm placeholder-gray-400 bg-headerBackgroundColor rounded-md outline-none pe-4 ps-14 h-14 text-headerTextColor lg:text-base`}
                    aria-label="Search"
                    autoComplete="off"
                    value={searchText}
                    disabled
                  />
                </div>
                <div className="flex items-center justify-center mb-5 md:mr-auto md:ml-auto">
                  <Image
                    src={`/assets/images/BrilliantEarthFRC.png`}
                    alt={"Your Logo"}
                    height={"25px"}
                    width={"324px"}
                    layout="fixed"
                    loading="eager"
                  />
                </div>

                <div className="flex items-center justify-end flex-shrink-0">
                  <div className="flex items-center transition-all wishlistShopping space-s-7 lg:space-s-2 xl:space-s-2 2xl:space-s-5 ps-3">
                    <div className="flex md:gap-x-4 align-center"></div>
                  </div>
                </div>
              </div>
              {/* Third Component */}
              <div className="items-center justify-center hidden lg:flex lg:h-7 xl:h-10 headerBottom mx-auto max-w-[1920px]">
                <div className="flex items-center">
                  <HeaderMenu
                    data={site_header.menu}
                    className="hidden lg:flex ps-3.5 xl:ps-5"
                  />
                </div>
              </div>
            </div>
            <Divider className="mb-0" />
          </div>
        )}{" "}
        {width < 768 && (
          <div>
            <div className="bg-[#183e40] h-14">
              <p className="p-3 text-center text-white avenir-book-font">
                FREE Diamond Jewelry With All Purchases.
              </p>
            </div>
            <div className="flex w-full mt-5 ml-2 text-center gap-7">
              <div>
                <span>
                  <HiOutlineBars3 size={20} />
                </span>
              </div>
              <div>
                <span>
                  <HiComputerDesktop size={20} />
                </span>
              </div>
              <div>
                <Image
                  src="/assets/images/demo/logo-new.svg"
                  height={20}
                  width={200}
                />
              </div>
              <div>
                <span>
                  <HiOutlinePhone size={20} />
                </span>
              </div>
              <div>
                <span>
                  <HiOutlineShoppingBag size={22} />
                </span>
              </div>
            </div>
            <div>
              <div className="flex mt-2 mb-2">
                <Input
                  name="Search"
                  defaultValue="Search"
                  className="w-[90%] ml-3"
                  variant="solid"
                />
                <span className="m-2">
                  <IoIosSearch className="!text-[18px]" />
                </span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
