"use strict";
exports.__esModule = true;
var react_1 = require("react");
var news_announcement_1 = require("@components/ui/news-announcement");
var js_cookie_1 = require("js-cookie");
var search_icon_1 = require("@components/icons/search-icon");
var site_settings_1 = require("@settings/site-settings");
var header_menu_1 = require("@components/layout/header/header-menu");
var logo_1 = require("@components/ui/logo");
var ui_context_1 = require("@contexts/ui.context");
var routes_1 = require("@utils/routes");
var add_active_scroll_1 = require("@utils/add-active-scroll");
var dynamic_1 = require("next/dynamic");
var next_i18next_1 = require("next-i18next");
var home_color_icon_1 = require("../../icons/home-color-icon");
var link_1 = require("@components/ui/link");
var authorization_1 = require("@store/authorization");
var wish_cart_product_count_1 = require("@framework/product/wishlist/wish-cart-product-count");
var company_info_1 = require("@contexts/company_info/company_info");
var io5_1 = require("react-icons/io5");
var ri_1 = require("react-icons/ri");
var get_all_search_product_1 = require("@framework/product/get-all-search-product");
var scrollbar_1 = require("@components/common/scrollbar");
var search_result_loader_1 = require("@components/ui/loaders/search-result-loader");
var search_product_1 = require("@components/common/search-product");
var io_1 = require("react-icons/io");
// import LanguageSwitcher from "@components/ui/language-switcher";
var CartButton = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require("@components/cart/cart-button"); }); }, {
    ssr: false
});
var WishButton = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require("@components/wishlist/wishlist-button"); }); }, {
    ssr: false
});
function Header() {
    var _a, _b;
    var _c = ui_context_1.useUI(), openSidebar = _c.openSidebar, setDrawerView = _c.setDrawerView, isAuthorized = _c.isAuthorized, closeSearch = _c.closeSearch, displaySearch = _c.displaySearch;
    var _d = react_1.useState(), userName = _d[0], setuserName = _d[1];
    // const [announceLoading, setAnnounceLoading] = useState(true);
    // const { isLoading } = useCompanyInfoProductsQuery();
    var t = next_i18next_1.useTranslation().t;
    var site_header = site_settings_1.siteSettings.site_header;
    var userData = authorization_1.getUserDetails();
    var siteHeaderRef = react_1.useRef();
    var _e = react_1.useState(""), webPrimaryColor = _e[0], setWebPrimaryColor = _e[1];
    var _f = react_1.useState(""), webSecondaryColor = _f[0], setWebSecondaryColor = _f[1];
    var _g = react_1.useState(0), announceIsActive = _g[0], setAnnounceIsActive = _g[1];
    var companyInfo = react_1.useContext(company_info_1.CompanyInfoContext).companyInfo;
    var _h = get_all_search_product_1.useSearchProductDataMutation(), searchData = _h.data, fetchSearchProducts = _h.mutate, isSearchLoading = _h.isLoading;
    react_1.useEffect(function () {
        setuserName(userData === null || userData === void 0 ? void 0 : userData.full_name);
    }, [userData]);
    react_1.useEffect(function () {
        setAnnounceIsActive(parseInt(companyInfo && companyInfo.announce_is_active) || 0);
        setWebPrimaryColor((companyInfo && companyInfo.web_primary_color) || "");
        setWebSecondaryColor((companyInfo && companyInfo.web_secondary_color) || "");
    }, [companyInfo]);
    var _j = wish_cart_product_count_1.useCartAndWishlistCountMutation(), countData = _j.data, cartAndWishlistCountList = _j.mutate;
    add_active_scroll_1.addActiveScroll(siteHeaderRef);
    //const { isLoading } = useCompanyInfoProductsQuery();
    var _k = react_1.useState(0), cartCount = _k[0], setCartCount = _k[1];
    var _l = react_1.useState(0), wishListCount = _l[0], setWishListCount = _l[1];
    var _m = react_1.useState(true), closeAnnounce = _m[0], setCloseAnnounce = _m[1];
    var _o = react_1.useState(""), searchText = _o[0], setSearchText = _o[1];
    var _p = react_1.useState("close"), searchOpen = _p[0], setSearchOpen = _p[1];
    var closeValueAnnounce = js_cookie_1["default"].get("newsAnnounce");
    react_1.useEffect(function () {
        setCloseAnnounce(closeValueAnnounce);
    }, [closeValueAnnounce]);
    var announceClose = function () {
        setCloseAnnounce(false);
        js_cookie_1["default"].set("newsAnnounce", false);
    };
    function handleMobileMenu() {
        setDrawerView("MOBILE_MENU");
        return openSidebar();
    }
    react_1.useEffect(function () {
        if (isAuthorized) {
            if (userData && (userData === null || userData === void 0 ? void 0 : userData.id_app_user)) {
                cartAndWishlistCountList({
                    user_id: userData === null || userData === void 0 ? void 0 : userData.id_app_user
                });
            }
        }
    }, [isAuthorized]);
    react_1.useEffect(function () {
        var _a, _b;
        if (countData) {
            var cartCountValue = (_a = countData === null || countData === void 0 ? void 0 : countData.data) === null || _a === void 0 ? void 0 : _a.cart_list_count;
            var wishListCountValue = (_b = countData === null || countData === void 0 ? void 0 : countData.data) === null || _b === void 0 ? void 0 : _b.wish_list_count;
            setCartCount(cartCountValue);
            setWishListCount(wishListCountValue);
        }
    }, [countData]);
    var handleSearchChange = function (e) {
        setSearchText(e.target.value);
    };
    react_1.useEffect(function () {
        if (searchText !== "") {
            var delayDebounceFn_1 = setTimeout(function () {
                setSearchOpen("open");
                fetchSearchProducts(searchText);
            }, 800);
            return function () { return clearTimeout(delayDebounceFn_1); };
        }
        else {
            setSearchOpen("close");
        }
    }, [searchText]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("header", { id: "siteHeader", ref: siteHeaderRef, className: "relative z-20 w-full  xl:h-36 headerThree" },
            react_1["default"].createElement("div", { className: "fixed z-20 content-center w-full  text-gray-700 transition duration-200 ease-in-out bg-headerBackgroundColor innerSticky body-font " },
                react_1["default"].createElement("div", { className: "mx-auto max-w-[1920px]" }, !closeAnnounce && announceIsActive && announceIsActive === 1 ? (react_1["default"].createElement(news_announcement_1["default"], { announceIsClose: announceClose })) : (react_1["default"].createElement(react_1["default"].Fragment, null))),
                react_1["default"].createElement("div", { className: "ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 px-4 md:px-8 2xl:px-16" },
                    react_1["default"].createElement("div", { className: "flex pt-2 justify-between space-x-6 mx-auto max-w-[1920px]" },
                        react_1["default"].createElement("div", { className: "flex justify-start" },
                            react_1["default"].createElement(link_1["default"], { href: "" + routes_1.ROUTES.HOME, className: "truncate text-sm text-heading mb-1.5 -mt-1" },
                                react_1["default"].createElement("div", { className: "hidden lg:flex md:gap-x-2 align-center max-w-[1920px]" },
                                    react_1["default"].createElement(home_color_icon_1["default"], { color: companyInfo === null || companyInfo === void 0 ? void 0 : companyInfo.web_secondary_color, width: "18", height: "18", className: "" }),
                                    react_1["default"].createElement("span", { className: "hidden pr-4 pt-0.5 text-[8px] text-headerTextColor font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base" }, t("Home"))))),
                        react_1["default"].createElement("div", { className: "flex justify-end" },
                            react_1["default"].createElement("div", { className: "justify-start relative hidden lg:block" },
                                react_1["default"].createElement("div", { role: "button", onClick: closeSearch },
                                    react_1["default"].createElement("div", null,
                                        react_1["default"].createElement("form", { className: "relative w-full overflow-hidden rounded-md bg-headerBackgroundColor", noValidate: true, role: "search" },
                                            react_1["default"].createElement("label", { htmlFor: "search", className: "flex items-center" },
                                                react_1["default"].createElement("span", { className: "absolute top-0 left-0 flex items-center justify-center flex-shrink-0 w-8 h-full cursor-pointer md:w-8 focus:outline-none" },
                                                    react_1["default"].createElement(search_icon_1["default"], { color: companyInfo === null || companyInfo === void 0 ? void 0 : companyInfo.web_secondary_color, className: "w-[18px] h-[18px]", width: "17px", height: "18px" })),
                                                react_1["default"].createElement("input", { id: "search", className: "w-full text-sm placeholder-gray-400 bg-headerBackgroundColor rounded-md outline-none pe-4 ps-14 text-headerTextColor lg:text-base", placeholder: "Search Products...", "aria-label": "Search", autoComplete: "off", value: searchText, onChange: handleSearchChange }),
                                                searchText && (react_1["default"].createElement(io_1.IoIosClose, { className: "cursor-pointer absolute right-0", color: companyInfo === null || companyInfo === void 0 ? void 0 : companyInfo.web_secondary_color, size: 35, onClick: function () { return setSearchText(""); } })))),
                                        searchText && (react_1["default"].createElement("div", { className: "absolute z-10 bg-white flex flex-col rounded-md overflow-hidden h-auto max-h-64vh lg:max-h-[550px]" }, searchOpen === "open" && (react_1["default"].createElement(scrollbar_1["default"], { className: "os-host-flexbox" },
                                            react_1["default"].createElement("div", { className: "h-full" }, isSearchLoading ? (react_1["default"].createElement("div", { className: "p-5 border-b border-gray-300 border-opacity-30 last:border-b-0" }, Array.from({ length: 5 }).map(function (_, idx) { return (react_1["default"].createElement(search_result_loader_1["default"], { key: idx, uniqueKey: "top-search-" + idx })); }))) : ((_a = searchData === null || searchData === void 0 ? void 0 : searchData.data) === null || _a === void 0 ? void 0 : _a.length) > 0 ? ((_b = searchData === null || searchData === void 0 ? void 0 : searchData.data) === null || _b === void 0 ? void 0 : _b.map(function (item, index) { return (react_1["default"].createElement("div", { className: " p-5 border-b border-gray-150 relative last:border-b-0", onClick: closeSearch, key: index },
                                                react_1["default"].createElement(search_product_1["default"], { item: item, key: index }))); })) : (react_1["default"].createElement("div", { className: " p-5 border-b border-gray-150 relative last:border-b-0 flex items-center justify-center max-w-[300px]" },
                                                react_1["default"].createElement("img", { alt: "No Result Found", loading: "lazy", width: "824", height: "493", decoding: "async", "data-nimg": "1", className: "object-contain", src: "/assets/Photos/not-found.svg" }))))))))))),
                            react_1["default"].createElement(link_1["default"], { href: "" + routes_1.ROUTES.LOCATION, className: "truncate text-sm text-headerTextColor mb-1.5 -mt-1" },
                                react_1["default"].createElement("div", { className: "hidden lg:flex md:gap-x-2 align-center" },
                                    react_1["default"].createElement(io5_1.IoLocationOutline, { size: 20, color: companyInfo === null || companyInfo === void 0 ? void 0 : companyInfo.web_secondary_color }),
                                    react_1["default"].createElement("span", { className: "hidden pr-4 pt-0.5 text-[8px] font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-headerTextColor" }, t("Location")))),
                            react_1["default"].createElement(link_1["default"], { href: "" + routes_1.ROUTES.CONTACT, className: "truncate text-sm text-headerTextColor mb-1.5 -mt-1" },
                                react_1["default"].createElement("div", { className: "hidden lg:flex md:gap-x-2 align-center" },
                                    react_1["default"].createElement(ri_1.RiPhoneLine, { size: 20, color: companyInfo === null || companyInfo === void 0 ? void 0 : companyInfo.web_secondary_color }),
                                    react_1["default"].createElement("span", { className: "hidden pr-4 pt-0.5 text-[8px] font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-headerTextColor" }, t("Contact")))))),
                    react_1["default"].createElement("div", { className: "flex justify-between items-center mx-auto max-w-[1920px] h-22 lg:h-20 xl:h-20 w-full relative before:absolute before:w-screen lg:before:h-px " },
                        react_1["default"].createElement("button", { "aria-label": "Menu", className: "flex-col items-center justify-center flex-shrink-0 hidden h-full px-5 outline-none menuBtn md:flex lg:hidden 2xl:px-7 focus:outline-none", onClick: handleMobileMenu },
                            react_1["default"].createElement("span", { className: "menuIcon" },
                                react_1["default"].createElement("span", { className: "bar" }),
                                react_1["default"].createElement("span", { className: "bar" }),
                                react_1["default"].createElement("span", { className: "bar" }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("input", { id: "search", className: "w-full hidden lg:block text-sm placeholder-gray-400 bg-headerBackgroundColor rounded-md outline-none pe-4 ps-14 h-14 text-headerTextColor lg:text-base", "aria-label": "Search", autoComplete: "off", value: searchText, disabled: true })),
                        react_1["default"].createElement("div", { className: "flex items-center 2xl:me-12 3xl:me-20 justify-center mb-5" },
                            react_1["default"].createElement(logo_1["default"], null)),
                        react_1["default"].createElement("div", { className: "flex items-center justify-end flex-shrink-0" },
                            react_1["default"].createElement("div", { className: "items-center transition-all flex wishlistShopping space-s-7 lg:space-s-2 xl:space-s-2 2xl:space-s-5 ps-3" },
                                react_1["default"].createElement("div", { className: "flex md:gap-x-4 align-center" },
                                    react_1["default"].createElement("span", { className: "hidden  text-xs font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base" }, Object.keys(userData).length !== 0 ? (react_1["default"].createElement("div", null,
                                        react_1["default"].createElement(link_1["default"], { href: "" + routes_1.ROUTES.ACCOUNT, className: "truncate text-sm text-heading mb-1.5 -mt-1" },
                                            react_1["default"].createElement("button", { type: "button", className: "inline-block gap-x-3 px-6 text-headerTextColor font-normal text-sm  rounded-full hover:bg-[" + companyInfo.web_secondary_color + "] " },
                                                "Hi, ",
                                                userName)))) : (react_1["default"].createElement("div", null,
                                        react_1["default"].createElement(link_1["default"], { href: "" + routes_1.ROUTES.LOGIN, className: "truncate text-sm text-[" + (companyInfo === null || companyInfo === void 0 ? void 0 : companyInfo.web_secondary_color) + "] mb-1.5 -mt-1" },
                                            react_1["default"].createElement("button", { type: "button", className: "lex-shrink-0  hidden text-sm xl:text-base lg:flex focus:outline-none  gap-x-3" }, "Register / Login"))))),
                                    react_1["default"].createElement(link_1["default"], { href: routes_1.ROUTES.WISHLIST },
                                        react_1["default"].createElement("div", { id: "wishlist", className: "hidden lg:flex md:gap-x-5 align-center tooltip" },
                                            react_1["default"].createElement(WishButton, { wishCount: wishListCount }),
                                            react_1["default"].createElement("span", { className: "tooltiptext hidden text-sm font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-heading" }, "WishList")))),
                                react_1["default"].createElement("div", { id: "shopping-bag", className: "hidden lg:flex md:gap-x-5 align-center tooltip" },
                                    react_1["default"].createElement(CartButton, { cartCount: cartCount }),
                                    react_1["default"].createElement("span", { className: "tooltiptext hidden text-sm font-semibold transition-all duration-100 ease-in-out cursor-pointer lg:font-normal lg:block xl:text-base text-heading" }, "Cart"))))),
                    react_1["default"].createElement("div", { className: "items-center justify-center hidden lg:flex lg:h-7 xl:h-10 headerBottom mx-auto max-w-[1920px]" },
                        react_1["default"].createElement("div", { className: "flex items-center" },
                            react_1["default"].createElement(header_menu_1["default"], { data: site_header.menu, className: "hidden lg:flex ps-3.5 xl:ps-5" }))))))));
}
exports["default"] = Header;
