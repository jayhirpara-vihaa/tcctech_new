import React, { useRef, useState, useEffect, useContext } from "react";
import cn from "classnames";
import NewsAnnouncement from "@components/ui/news-announcement";
import Cookies from "js-cookie";
import SearchIcon from "@components/icons/search-icon";
import { siteSettings } from "@settings/site-settings-zemals";
import HeaderMenu from "@components/layout/header/header-menu-zamels";
import Image from "next/image";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import Home from "../../icons/home-color-icon";
import Link from "@components/ui/link";
import { getUserDetails } from "@store/authorization";
import { useCartAndWishlistCountMutation } from "@framework/product/wishlist/wish-cart-product-count";
import { COMPANY_INFO } from "@utils/constants";
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { CompanyInfoContext } from "@contexts/company_info/company_info";
import {
    IoDiamondOutline,
    IoLocationOutline,
} from "react-icons/io5";
import {
    BiMessageRoundedDots,
} from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi"
import NunguLoveStoryIcon from "@components/icons/nungu-love-story-icon";
import { BsBookmarkHeart } from "react-icons/bs";
import { RiBook3Line, RiPhoneLine } from "react-icons/ri";
import { useSearchProductDataMutation } from "@framework/product/get-all-search-product";
import Scrollbar from "@components/common/scrollbar";
import SearchResultLoader from "@components/ui/loaders/search-result-loader";
import SearchProduct from "@components/common/search-product";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { useCompanyInfoProductsQuery } from "src/framework/company-info/get-all-company-info";
import { BackArrowRound } from "@components/icons/back-arrow-round";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
    ssr: false,
});
const WishButton = dynamic(
    () => import("@components/wishlist/wishlist-button"),
    {
        ssr: false,
    }
);

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

export default function Header() {
    // const { updateCompanyInfo, updateOnlineLogos } =
    //   useContext(CompanyInfoContext);

    // const { data: CompanyInfoData } = useCompanyInfoProductsQuery();

    // useEffect(() => {
    //   updateCompanyInfo(CompanyInfoData?.data.companyInfo);
    //   updateOnlineLogos(CompanyInfoData?.data.images);
    // }, [CompanyInfoData]);

    const {
        openSidebar,
        setDrawerView,
        isAuthorized,
        closeSearch,
        displaySearch,
    } = useUI();
    const [userName, setuserName] = useState();

    // const [announceLoading, setAnnounceLoading] = useState(true);
    // const { isLoading } = useCompanyInfoProductsQuery();
    const { t } = useTranslation();
    const { site_header } = siteSettings;
    const userData = getUserDetails();
    const siteHeaderRef = useRef() as DivElementRef;
    const [webPrimaryColor, setWebPrimaryColor] = useState<string>("");
    const [webSecondaryColor, setWebSecondaryColor] = useState<string>("");
    const [announceIsActive, setAnnounceIsActive] = useState<number>(0);
    const { companyInfo } = useContext(CompanyInfoContext);
    const {
        data: searchData,
        mutate: fetchSearchProducts,
        isLoading: isSearchLoading,
    } = useSearchProductDataMutation();
    useEffect(() => {
        setuserName(userData?.full_name);
    }, [userData]);

    useEffect(() => {
        setAnnounceIsActive(parseInt(companyInfo.announce_is_active) || 0);
        setWebPrimaryColor(companyInfo.web_primary_color || "");
        setWebSecondaryColor(companyInfo.web_secondary_color || "");
    }, [companyInfo]);

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
    const announceClose = () => {
        setCloseAnnounce(false);
        Cookies.set("newsAnnounce", false as any);
    };

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

    const handleSearchChange = (e: any) => {
        setSearchText(e.target.value);
    };
    useEffect(() => {
        if (searchText !== "") {
            const delayDebounceFn = setTimeout(() => {
                setSearchOpen("open");
                fetchSearchProducts(searchText);
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
                className="relative z-20 w-full xl:h-36 headerThree drop-shadow-lg"
            >
                <div
                    className={`fixed z-20 content-center w-full  text-gray-700 transition duration-200 ease-in-out bg-headerBackgroundColor innerSticky body-font `}
                >
                    {/* <div className={`mx-auto max-w-[1920px]`}>
                        {!closeAnnounce && announceIsActive && announceIsActive === 1 ? (
                            <NewsAnnouncement announceIsClose={announceClose} />
                        ) : (
                            <></>
                        )}
                    </div> */}

                    <div className="">
                        {/* First Component */}
                        <div className="flex lg:pt-2 lg:pb-2 md:pt-12 pt-12 justify-between space-x-6 mx-auto max-w-[1920px]"></div>
                        {/* Second Component */}
                        <div className="flex justify-between items-center mx-auto max-w-[1920px] h-10 lg:h-[flex justify-between items-center mx-auto max-w-[1920px] h-10 lg:h-[6rem] xl:h-[6rem] w-full relative] xl:h-20 w-full relative">
                            <button
                                aria-label="Menu"
                                className="flex-col items-center flex-shrink-0 hidden h-full px-5 outline-none menuBtn md:flex md:hidden lg:hidden 2xl:px-7 focus:outline-none"
                                onClick={handleMobileMenu}
                            >
                                {/* <span className="menuIcon">
                                    <span className="bar" />
                                    <span className="bar" />
                                    <span className="bar" />
                                </span> */}
                            </button>

                            <div>
                                <input
                                    id="search"
                                    className={`w-full hidden lg:hidden md:hidden text-sm placeholder-gray-400 bg-headerBackgroundColor rounded-md outline-none pe-4 ps-14 h-14 text-headerTextColor lg:text-base`}
                                    aria-label="Search"
                                    autoComplete="off"
                                    value={searchText}
                                    disabled
                                />
                            </div>
                            <div className="flex">
                                <div className="">
                                    <Link
                                        href="https://www.zamels.com.au/"
                                    >
                                        <Image
                                            className="zamels-logo"
                                            src={`/assets/images/zamels-logo.png`}
                                            alt={"Your Logo"}
                                            height={"35px"}
                                            width={"145px"}
                                            layout="fixed"
                                            loading="eager"
                                        />
                                    </Link>

                                </div>

                                <div className="flex absolute right-[8%]">
                                    <div className="mr-[8px]">
                                        <Link
                                            href="https://www.zamels.com.au/pages/store-locator"
                                            className={`truncate text-sm text-black mb-1.5 -mt-1`}
                                        >
                                            <div className="hidden lg:flex md:gap-x-6 lg:gap-x-6 align-center">
                                                <IoLocationOutline
                                                    size={35}
                                                    color="#693d7e"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="mr-[8px]">
                                        <Link
                                            href="https://www.zamels.com.au/account/login"
                                            className={`truncate text-sm text-black mb-1.5 -mt-1`}
                                        >
                                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                                <AiOutlineUser
                                                    size={35}
                                                    color="#693d7e"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="mr-[8px]">
                                        <Link
                                            href="https://www.zamels.com.au/"
                                            className={`truncate text-sm text-black mb-1.5 -mt-1`}
                                        >
                                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                                <AiOutlineSearch
                                                    color="#693d7e"
                                                    size={35}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            href="https://www.zamels.com.au/cart"
                                            className={`truncate text-sm text-black mb-1.5 -mt-1`}
                                        >
                                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                                <HiOutlineShoppingBag
                                                    color="#693d7e"
                                                    size={35}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end flex-shrink-0">
                                <div className="items-center transition-all flex wishlistShopping space-s-7 lg:space-s-2 xl:space-s-2 2xl:space-s-5 ps-3">
                                    <div className="flex md:gap-x-4 align-center">

                                    </div>


                                </div>
                            </div>
                        </div>
                        {/* Third Component */}
                        <div className="bg-[#e81976] items-center justify-center hidden lg:flex lg:h-7 xl:h-[3.5rem] headerBottom mx-auto max-w-[1920px]">
                            <div className="flex items-center">
                                <HeaderMenu
                                    data={site_header.menu}
                                    className="hidden lg:flex ps-3.5 xl:ps-5"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
