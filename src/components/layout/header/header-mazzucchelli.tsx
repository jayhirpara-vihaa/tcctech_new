import React, { useRef, useState, useEffect, useContext } from "react";
import cn from "classnames";
import NewsAnnouncement from "@components/ui/news-announcement";
import Cookies from "js-cookie";
import SearchIcon from "@components/icons/search-icon";
import { siteSettings } from "@settings/site-settings-mazzucchelli";
import HeaderMenu from "@components/layout/header/header-menu-mazzucchelli";
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
import { IoIosClose } from "react-icons/io";
import { useCompanyInfoProductsQuery } from "src/framework/company-info/get-all-company-info";
import Divider from "@components/ui/divider";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { HiShoppingBag } from "react-icons/hi";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useWindowSize } from "react-use";
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
    const webConfigBgColor = `linear-gradient(${process.env.NEXT_PUBLIC_MAZZCONFIG_BG_COLOR})`;
    const { height, width } = useSsrCompatible(useWindowSize(), {
        width: 0,
        height: 0,
    });
    console.log("width", width > 768);

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
                className="relative z-20 w-full xl:h-36 headerThree"
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
                    {/* <div className="flex  justify-between space-x-6 mx-auto max-w-[1920px] bg-[#CF025C] pt-4 pb-2 ps-2 pe-2 ">
                        <div className="flex justify-start">
                            <Link
                                href={`${ROUTES.HOME}`}
                                className="truncate text-sm text-heading mb-1.5 -mt-1"
                            >
                                <div className="hidden lg:flex md:gap-x-2 align-center max-w-[1920px]">
                                    <Home
                                        color={companyInfo?.web_secondary_color}
                                        width={"18"}
                                        height={"18"}
                                        className={""}
                                    />
                                    <span
                                        className={`hidden pr-4 pt-0.5 text-1 text-headerTextColor font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base`}
                                    >
                                        {t("Home")}
                                    </span>
                                </div>
                            </Link>
                    <Link
                        href={`${ROUTES.LOCATION}`}
                        className={`truncate text-sm text-headerTextColor mb-1.5 -mt-1`}
                    >
                        <div className="hidden lg:flex md:gap-x-2 align-center">
                            <IoLocationOutline
                                size={25}
                                color="#fff"
                            />
                            <span
                                className={`hidden pr-4 pt-0.5 text-[8px] font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base  text-white`}
                            >
                                {t("Location")}
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="flex justify-end">
                    <div className="justify-start relative hidden lg:block">
                        <div role="button" onClick={closeSearch}>
                                    <div>
                                        <form
                                            className={`relative w-full overflow-hidden rounded-md bg-headerBackgroundColor`}
                                            noValidate
                                            role="search"
                                        >
                                            <label htmlFor="search" className="flex items-center">
                                                <span className="absolute top-0 left-0 flex items-center justify-center flex-shrink-0 w-8 h-full cursor-pointer md:w-8 focus:outline-none">
                                                    <SearchIcon
                                                        color={companyInfo?.web_secondary_color}
                                                        className="w-[18px] h-[18px]"
                                                        width="17px"
                                                        height="18px"
                                                    />
                                                </span>
                                                <input
                                                    id="search"
                                                    className={`w-full text-sm placeholder-gray-400 bg-headerBackgroundColor rounded-md outline-none pe-4 ps-14 text-headerTextColor lg:text-base`}
                                                    placeholder={"Search Products..."}
                                                    aria-label="Search"
                                                    autoComplete="off"
                                                    value={searchText}
                                                    onChange={handleSearchChange}
                                                />
                                                {searchText && (
                                                    <IoIosClose
                                                        className="cursor-pointer absolute right-0"
                                                        color={companyInfo?.web_secondary_color}
                                                        size={35}
                                                        onClick={() => setSearchText("")}
                                                    />
                                                )}
                                            </label>
                                        </form>

                                        {searchText && (
                                            <div className="absolute z-10 bg-white flex flex-col rounded-md overflow-hidden h-auto max-h-64vh lg:max-h-[550px]">
                                                {searchOpen === "open" && (
                                                    <Scrollbar className="os-host-flexbox">
                                                        <div className="h-full">
                                                            {isSearchLoading ? (
                                                                <div className="p-5 border-b border-gray-300 border-opacity-30 last:border-b-0">
                                                                    {Array.from({ length: 5 }).map((_, idx) => (
                                                                        <SearchResultLoader
                                                                            key={idx}
                                                                            uniqueKey={`top-search-${idx}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            ) : searchData?.data?.length > 0 ? (
                                                                searchData?.data?.map(
                                                                    (item: any, index: number) => (
                                                                        <div
                                                                            className=" p-5 border-b border-gray-150 relative last:border-b-0"
                                                                            onClick={closeSearch}
                                                                            key={index}
                                                                        >
                                                                            <SearchProduct
                                                                                item={item}
                                                                                key={index}
                                                                            />
                                                                        </div>
                                                                    )
                                                                )
                                                            ) : (
                                                                <div className=" p-5 border-b border-gray-150 relative last:border-b-0 flex items-center justify-center max-w-[300px]">
                                                                    <img
                                                                        alt="No Result Found"
                                                                        loading="lazy"
                                                                        width="824"
                                                                        height="493"
                                                                        decoding="async"
                                                                        data-nimg="1"
                                                                        className="object-contain"
                                                                        src="/assets/Photos/not-found.svg"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Scrollbar>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                    </div>
                    <Link
                        href={`${ROUTES.LOCATION}`}
                        className={`truncate text-sm text-headerTextColor mb-1.5 -mt-1`}
                    >
                        <div className="hidden lg:flex md:gap-x-2 align-center">
                            <BiMessageRoundedDots
                                size={25}
                                color="#fff"
                            />
                            <span
                                className={`hidden pr-4 pt-0.5 text-[8px] font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-white`}
                            >
                                1800 921 225
                            </span>
                        </div>
                    </Link>
                    <Link
                        href={`${ROUTES.CONTACT}`}
                        className={`truncate text-sm text-headerTextColor mb-1.5 -mt-1`}
                    >
                        <div className="hidden lg:flex md:gap-x-2 align-center">
                            <Contact
                      color={companyInfo.web_secondary_color}
                      width={"22"}
                      height={"25"}
                    />
                            <TfiEmail
                                size={25}
                                color="#fff"
                            />
                            <span
                                className={`hidden pr-4 pt-0.5 text-[8px] font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-white`}
                            >
                                zamels@gmail.com
                            </span>
                        </div>
                    </Link>
                </div>
            </div> */}
                    <div className=" bg-[#000000]">
                        {/* First Component */}
                        <div className="flex pt-5 justify-between space-x-6 mx-auto max-w-[1920px]"></div>
                        {/* Second Component */}
                        <div className="flex justify-center items-center mx-auto max-w-[1920px] h-22 lg:h-20 xl:h-20 w-full relative before:absolute before:w-screen lg:before:h-px mb-5">
                            {/* <button
                                aria-label="Menu"
                                className="flex-col items-center justify-center flex-shrink-0 hidden h-full px-5 outline-none menuBtn md:flex lg:hidden 2xl:px-7 focus:outline-none"
                                onClick={handleMobileMenu}
                            >
                                <span className="menuIcon">
                                    <span className="bar" />
                                    <span className="bar" />
                                    <span className="bar" />
                                </span>
                            </button> */}

                            {/* <div>
                                <input
                                    id="search"
                                    className={`w-full hidden lg:hidden text-sm placeholder-gray-400 bg-headerBackgroundColor rounded-md outline-none pe-4 ps-14 h-14 text-headerTextColor lg:text-base`}
                                    aria-label="Search"
                                    autoComplete="off"
                                    value={searchText}
                                    disabled
                                />
                            </div> */}
                            {/* <div className="flex items-center justify-center mb-5 md:mr-auto md:ml-auto">
                                <Image
                                    src={`/assets/images/mazzucchellis-logo.png`}
                                    alt={"Your Logo"}
                                    height={"36px"}
                                    width={"366px"}
                                    layout="fixed"
                                    className="mazz-header-logo"
                                    loading="eager"
                                />
                            </div> */}
                            <div className="flex">
                                <div className="">
                                    <Link
                                        href="https://mazzucchellis.com.au/"
                                    >
                                        <Image
                                            src={`/assets/images/mazzucchellis-logo.png`}
                                            alt={"Your Logo"}
                                            height={width > 768 ? "36px" : "32px"}
                                            width={width > 768 ? "366px" : "280px"}
                                            layout="fixed"
                                            // className="mazz-header-logo"
                                            loading="eager"
                                        />
                                    </Link>

                                </div>

                                <div className="flex absolute right-[2%] top-[20%]">


                                    <div className="mr-1">
                                        <Link
                                            href="https://mazzucchellis.com.au/"
                                            className={`truncate text-sm text-black mb-1.5 -mt-1`}
                                        >
                                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                                <AiOutlineSearch
                                                    className="mazz-header-icon"
                                                    size={35}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="mr-1">
                                        <Link
                                            href="https://mazzucchellis.com.au/pages/store-locator"
                                            className={`truncate text-sm text-black mb-1.5 -mt-1`}
                                        >
                                            <div className="hidden lg:flex md:gap-x-6 lg:gap-x-6 align-center">
                                                <IoLocationOutline
                                                    size={35}
                                                    className="mazz-header-icon"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            href="https://mazzucchellis.com.au/pages/wishlist"
                                            className={`truncate text-sm text-black mb-1.5 -mt-1`}
                                        >
                                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                                <AiOutlineHeart
                                                    className="mazz-header-icon"
                                                    size={35}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="mr-1">
                                        <Link
                                            href="https://mazzucchellis.com.au/account/login?return_url=%2Faccount"
                                            className={`truncate text-sm text-black mb-1.5 -mt-1`}
                                        >
                                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                                <AiOutlineUser
                                                    size={35}
                                                    className="mazz-header-icon"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            href="https://mazzucchellis.com.au/cart"
                                            className={`truncate text-sm text-black mb-1.5 -mt-1`}
                                        >
                                            <div className="hidden lg:flex md:gap-x-2 align-center">
                                                <HiShoppingBag
                                                    className="mazz-header-icon"
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
                        <div className="border-t border-gray-300 bg-white p-0 md:invisible lg:visible xl:visible 2xl:visible"></div>
                        <div className="items-center justify-center hidden lg:flex lg:h-7 xl:h-10 headerBottom mx-auto max-w-[1920px]">

                            <div className="flex items-center">
                                <HeaderMenu
                                    data={site_header?.menu}
                                    className="hidden lg:flex ps-3.5 xl:ps-5"
                                />
                            </div>
                        </div>
                    </div>
                </div >
            </header >
        </>
    );
}
