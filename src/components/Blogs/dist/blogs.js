"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var button_1 = require("@components/ui/button");
var next_i18next_1 = require("next-i18next");
var container_1 = require("@components/ui/container");
var router_1 = require("next/router");
var get_blog_details_1 = require("src/framework/Blog/get-blog-details");
var moment_1 = require("moment");
var link_1 = require("@components/ui/link");
var image = [
    {
        id: "1",
        article: "Very classy jewelry collection for women",
        image: "/assets/Blog/blog-1-image.png"
    },
    {
        id: "2",
        article: "Sparkling stone that attracts men & women",
        image: "/assets/Blog/blog-2-image.png"
    },
    {
        id: "3",
        article: "Golden jewelry beyond the boundaries",
        image: "/assets/Blog/blog-3-image.png"
    },
];
var categories = [
    "Aliquam",
    "Architecto",
    "Corporis",
    "Laboriosam",
    "Minima",
    "Molestiae",
    "Voluptatem",
];
var banner = {
    id: 1,
    title: "We picked every item with care you must try",
    slug: "winter-collection",
    image: {
        mobile: {
            url: "/assets/images/Blog.png",
            width: 900,
            height: 340
        },
        desktop: {
            url: "/assets/images/Blog.png",
            width: 2560,
            height: 300
        }
    },
    type: ""
};
function OurStories() {
    var _a, _b;
    var t = next_i18next_1.useTranslation().t;
    var baseImgUrl = process.env.NEXT_PUBLIC_IMG_URL;
    var BlogsData = get_blog_details_1.useBlogsDetailsQuery().data;
    var router = router_1.useRouter();
    // const [banner, setbanner] = useState({} as Banner);
    var ImgUrl = process.env.NEXT_PUBLIC_IMG_URL;
    // useEffect(() => {
    //   setbanner({
    //     id: 1,
    //     title: "We picked every item with care you must try",
    //     slug: "winter-collection",
    //     image: {
    //       mobile: {
    //         url: `${ImgUrl}${BlogsData?.data?.banner_image_path}`,
    //         width: 900,
    //         height: 340,
    //       },
    //       desktop: {
    //         url: `${ImgUrl}${BlogsData?.data?.banner_image_path}`,
    //         width: 2560,
    //         height: 300,
    //       },
    //     },
    //     type: "",
    //   });
    // }, [BlogsData]);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(container_1["default"], null,
            react_1["default"].createElement("div", { className: "px-4 md:px-8 2xl:px-16 py-14 xl:py-20 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full border-solid border-black" },
                react_1["default"].createElement("div", { className: "md:w-full lg:w-4/5 flex  h-full flex-col -mt-1.5" },
                    react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid md:grid-cols-2 gap-7" }, (_a = BlogsData === null || BlogsData === void 0 ? void 0 : BlogsData.data) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                        return (react_1["default"].createElement("div", { key: item.id, className: "max-w-full bg-white border border-gray-100 hover:drop-shadow-md bg-white rounded-lg shadow" },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement(image_1["default"], { height: 300, width: 600, src: "" + baseImgUrl + item.image_path, alt: item.title, quality: 100, className: "bg-gray-300 object-cover border rounded-t-lg" }),
                                react_1["default"].createElement("div", { className: "p-5 flex" },
                                    react_1["default"].createElement("div", null,
                                        react_1["default"].createElement(image_1["default"], { height: 20, width: 20, src: "/assets/svgicon/user.png" }),
                                        react_1["default"].createElement("span", { className: "align-top" }, item.author)),
                                    react_1["default"].createElement("div", { className: "pl-4" },
                                        react_1["default"].createElement(image_1["default"], { height: 20, width: 20, src: "/assets/svgicon/calendar.png" }),
                                        react_1["default"].createElement("span", { className: "align-top pl-2" }, moment_1["default"](item.publish_date).format("D MMM, YYYY"))))),
                            react_1["default"].createElement("div", { className: "p-5 cursor-pointer" },
                                react_1["default"].createElement("h5", { className: "mb-2 text-2xl font-bold tracking-tight text-gray-900  cursor-pointer hover:text-headerSecondaryTextColor" }, item.title),
                                react_1["default"].createElement(link_1["default"], { href: "" + item.slug, className: "truncate w-full text-sm text-heading mb-1.5" },
                                    react_1["default"].createElement(button_1["default"], { key: item.id, value: item.slug, className: "w-full md:w-auto mt-3 " },
                                        " ",
                                        "LISTEN HERE")))));
                    }))),
                react_1["default"].createElement("div", { className: "md:w-full lg:w-1/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full max-md:mt-12" },
                    react_1["default"].createElement("div", { className: "bg-[#F8F8F8] border-l-2 border-[#DBB961] h-16 w-50 mb-5 flex items-center" },
                        react_1["default"].createElement("div", { className: "pl-5 inline-block align-middle TCC-h1-tag" }, "Recent Article")),
                    react_1["default"].createElement("div", null, (_b = BlogsData === null || BlogsData === void 0 ? void 0 : BlogsData.data) === null || _b === void 0 ? void 0 : _b.map(function (item) {
                        return (react_1["default"].createElement("div", { className: "flex gap-1" },
                            react_1["default"].createElement("div", { className: "w-1/5 mb-2" },
                                react_1["default"].createElement(image_1["default"], { height: 24, width: 47, src: "" + baseImgUrl + item.image_path, alt: "Blog_Image" })),
                            react_1["default"].createElement("div", { className: "w-4/5 truncate hover:text-orange-300 hover:cursor-pointer" }, item.title)));
                    })))))));
}
exports["default"] = OurStories;
