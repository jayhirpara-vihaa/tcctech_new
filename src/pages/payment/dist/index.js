"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getStaticProps = void 0;
var react_1 = require("react");
var container_1 = require("@components/ui/container");
var layout_three_1 = require("@components/layout/layout-three");
var serverSideTranslations_1 = require("next-i18next/serverSideTranslations");
var text_1 = require("@components/ui/text");
var next_i18next_1 = require("next-i18next");
var image_1 = require("next/image");
var button_1 = require("@components/ui/button");
var checkout_card_1 = require("@components/checkout/checkout-card");
var react_script_hook_1 = require("react-script-hook");
var js_cookie_1 = require("js-cookie");
var add_order_details_1 = require("@framework/checkout/add-order-details");
var order_cheakout_1 = require("@contexts/cheakout/order_cheakout");
var authorization_1 = require("@store/authorization");
var constants_1 = require("@utils/constants");
var site_settings_1 = require("@settings/site-settings");
var usePaymentDetail_1 = require("@framework/checkout/usePaymentDetail");
var router_1 = require("next/router");
var react_toastify_1 = require("react-toastify");
function Payment() {
    var userData = authorization_1.getUserDetails();
    var UserId = userData.id_app_user;
    var cartProduct = js_cookie_1["default"].get(constants_1.CARTPRODUCTDETAIL);
    var _a = react_1.useState(false), expanded = _a[0], setExpanded = _a[1];
    var _b = react_1.useState(""), chargeToken = _b[0], setChargeToken = _b[1];
    var t = next_i18next_1.useTranslation().t;
    var router = router_1.useRouter();
    var _c = react_1.useContext(order_cheakout_1.CheakOutContext), shippingAddress = _c.shippingAddress, billingAddress = _c.billingAddress, saveInfoValue = _c.saveInfoValue, shippingValue = _c.shippingValue, orderNote = _c.orderNote, useSameBillingAddress = _c.useSameBillingAddress, subTotal = _c.subTotal, totalTax = _c.totalTax;
    var _d = add_order_details_1.useOrderMutation(), orderDetails = _d.data, addOrder = _d.mutate;
    var _e = usePaymentDetail_1.usePaymentMutation(), paymentDetails = _e.data, addPayment = _e.mutate;
    react_1.useEffect(function () {
        var _a;
        if ((paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.code) === 200 || (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.code) === "200") {
            router.push("my-account/orders/" + ((_a = orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.data) === null || _a === void 0 ? void 0 : _a.order_number));
        }
    }, [paymentDetails]);
    var finalPaymentAmount = (Number(subTotal.toFixed(2)) *
        100);
    var totalBeforeTax = subTotal - totalTax;
    console.log(subTotal);
    react_1.useEffect(function () {
        var _a;
        addOrder({
            user_id: UserId,
            sub_total: totalBeforeTax && totalBeforeTax.toFixed(2),
            order_note: orderNote,
            shipping_method: Number(shippingValue),
            discount: 0,
            shipping_cost: 0,
            total_tax: totalTax && totalTax.toFixed(2),
            order_total: subTotal && subTotal.toFixed(2),
            pickup_store_id: 1,
            payment_method: 1,
            currency_id: 1,
            order_type: Number(shippingValue),
            is_add_address: Number(saveInfoValue),
            order_shipping_address: {
                id: shippingAddress.id === undefined ? 0 : shippingAddress.id,
                full_name: shippingAddress.full_name,
                phone_number: Number(shippingAddress.phone_number),
                house_builing: shippingValue === "2" ? shippingAddress.house_building : null,
                area_name: shippingValue === "2" ? shippingAddress.area_name : null,
                pincode: shippingValue === "2" ? Number(shippingAddress.pincode) : null,
                city_id: shippingValue === "2" ? Number(shippingAddress.city_id) : null,
                state_id: shippingValue === "2" ? Number(shippingAddress.state_id) : null,
                country_id: shippingValue === "2" ? Number(shippingAddress.country_id) : null
            },
            order_billing_address: useSameBillingAddress === true
                ? {
                    id: shippingAddress.id === undefined ? 0 : shippingAddress.id,
                    full_name: shippingAddress.full_name,
                    house_builing: shippingAddress.house_building,
                    area_name: shippingAddress.area_name,
                    pincode: Number(shippingAddress.pincode),
                    city_id: Number(shippingAddress.city_id),
                    state_id: Number(shippingAddress.state_id),
                    country_id: Number(shippingAddress.country_id),
                    phone_number: Number(shippingAddress.phone_number)
                }
                : {
                    id: shippingAddress.id === undefined ? 0 : shippingAddress.id,
                    full_name: billingAddress.full_name,
                    house_builing: billingAddress.house_building,
                    area_name: billingAddress.area_name,
                    pincode: Number(billingAddress.pincode),
                    city_id: Number(billingAddress.city_id),
                    state_id: Number(billingAddress.state_id),
                    country_id: Number(billingAddress.country_id),
                    phone_number: Number(billingAddress.phone_number)
                },
            quantity: 1,
            product_details: (_a = JSON.parse(cartProduct)) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                return {
                    product_id: item.id,
                    quantity: 1,
                    sub_total: item === null || item === void 0 ? void 0 : item.price.toFixed(2),
                    product_tax: item === null || item === void 0 ? void 0 : item.taxOnProduct.toFixed(2),
                    discount_amount: 0,
                    shipping_cost: 0,
                    order_details_json: {
                        metal_id: item === null || item === void 0 ? void 0 : item.metal_id,
                        karat_id: item === null || item === void 0 ? void 0 : item.karat_id,
                        metal_tone: item === null || item === void 0 ? void 0 : item.metal_tone,
                        size_id: item === null || item === void 0 ? void 0 : item.size_id,
                        length_id: item === null || item === void 0 ? void 0 : item.length_id
                    }
                };
            })
        });
    }, []);
    react_script_hook_1["default"]({
        src: finalPaymentAmount && site_settings_1.siteSettings
            ? "https://js.yoco.com/sdk/v1/yoco-sdk-web.js"
            : null,
        onload: function () {
            // eslint-disable-next-line no-undef
            var yoco = new window.YocoSDK({
                publicKey: "pk_test_c7b6da1aAlJ8Wwk32be4"
            });
            var submitBtn = document.getElementById("checkout-button");
            var checkoutButton = document.querySelector("#checkout-button");
            checkoutButton === null || checkoutButton === void 0 ? void 0 : checkoutButton.addEventListener("click", function () {
                yoco.showPopup({
                    amountInCents: parseInt(finalPaymentAmount),
                    currency: "ZAR",
                    name: "" + site_settings_1.siteSettings.name,
                    description: "Awesome description",
                    // displayMethod: "MANUAL",
                    callback: function (result) {
                        if (result.error) {
                            var errorMessage = result.error.message;
                            react_toastify_1.toast.error("error occured: " + errorMessage);
                        }
                        else {
                            setChargeToken(result.id);
                        }
                    }
                });
            });
        }
    });
    console.log(chargeToken);
    react_1.useEffect(function () {
        var _a, _b, _c;
        console.log("get chargeToken", chargeToken);
        console.log("get orderDetails", orderDetails);
        if (chargeToken !== "" && orderDetails) {
            addPayment({
                order_id: (_a = orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.data) === null || _a === void 0 ? void 0 : _a.id,
                order_number: (_b = orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.data) === null || _b === void 0 ? void 0 : _b.order_number,
                amount: (_c = orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.data) === null || _c === void 0 ? void 0 : _c.order_total,
                token: chargeToken
            });
        }
    }, [chargeToken, orderDetails]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex items-center justify-center mt-10 pb-0.5 mb-2 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8" },
            React.createElement(text_1["default"], { className: "Tcc-text-our-Jewelry-Section" }, t("text-payment"))),
        React.createElement(container_1["default"], null,
            React.createElement("div", { className: "py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full " },
                React.createElement("div", { className: "md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5 drop-shadow-md px-4 md:px-8 2xl:px-16" },
                    React.createElement("div", { className: "main_card block w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" },
                        React.createElement("div", { className: "flex justify-between" },
                            React.createElement("div", { className: "TCC-payment-method-text my-3" }, "PAYMENT METHOD"),
                            expanded === true && (React.createElement("div", { onClick: function () { return setExpanded(false); }, className: "mx-12 mt-5" }, "Change"))),
                        React.createElement("span", { className: "TCC-payment-method-discription" }, "Please select a payment method."),
                        React.createElement("div", { className: "my-5 paypal_card w-full lg:w-3/5 bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" },
                            React.createElement("div", { className: "flex" },
                                React.createElement("div", { className: "w-[70%] mx-5 my-3" },
                                    React.createElement("div", { className: "TCC-payment-method-name my-3 " }, "YOCO"),
                                    React.createElement("span", null, "Pay With your Yoco account, using any card.")),
                                React.createElement("div", { className: "w-[30%] place-content-around" },
                                    React.createElement(image_1["default"], { width: 90, height: 50, alt: t("common:text-logo"), src: "/assets/YOCO-LOGO.svg" })))))),
                React.createElement("div", { className: "md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5" },
                    React.createElement(checkout_card_1["default"], null),
                    React.createElement("div", { className: "my-5" },
                        React.createElement(button_1["default"], { id: "checkout-button", 
                            // onClick={onSubmit}
                            type: "button", className: "w-full space-x-2 px-4 py-2" },
                            React.createElement("span", null, "PAY NOW"))))))));
}
exports["default"] = Payment;
Payment.Layout = layout_three_1["default"];
Payment.authenticate = true;
exports.getStaticProps = function (_a) {
    var locale = _a.locale;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = {};
                    _c = [{}];
                    return [4 /*yield*/, serverSideTranslations_1.serverSideTranslations(locale, [
                            "common",
                            "forms",
                            "menu",
                            "footer",
                        ])];
                case 1: return [2 /*return*/, (_b.props = __assign.apply(void 0, _c.concat([(_d.sent())])),
                        _b)];
            }
        });
    });
};
