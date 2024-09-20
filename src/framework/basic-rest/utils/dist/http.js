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
exports.__esModule = true;
var axios_1 = require("axios");
var get_token_1 = require("./get-token");
var js_cookie_1 = require("js-cookie");
var constants_1 = require("@utils/constants");
var http = axios_1["default"].create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    timeout: 30000,
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
    }
});
http.interceptors.request.use(function (config) {
    var token = get_token_1.getToken();
    config.headers = __assign(__assign({}, config.headers), { Authorization: "" + ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRfYXBwX3VzZXIiOjEsInVzZXJfdHlwZSI6MSwiaWRfcm9sZSI6MCwiaWRfb3JnIjoxLCJpYXQiOjE2ODc1MjQ2NTUsImV4cCI6MTY4NzYxMTA1NX0.4VreW7wbkUszh0tP-Uz7tf-TW2J-DQUFMET1N7IT_As"
            ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRfYXBwX3VzZXIiOjEsInVzZXJfdHlwZSI6MSwiaWRfcm9sZSI6MCwiaWRfb3JnIjoxLCJpYXQiOjE2ODc1MjQ2NTUsImV4cCI6MTY4NzYxMTA1NX0.4VreW7wbkUszh0tP-Uz7tf-TW2J-DQUFMET1N7IT_As"
            : "PUBLIC_AUTHORIZATION_TOKEN") });
    return config;
}, function (error) {
    return Promise.reject(error);
});
http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    var _a, _b;
    // Do something with response error
    if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === 401 || ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.status) === "401") {
        js_cookie_1["default"].remove(constants_1.AUTH_TOKEN);
        js_cookie_1["default"].remove(constants_1.USER_DETAILS);
        js_cookie_1["default"].remove("modelclose");
        js_cookie_1["default"].remove("newsAnnounce");
        js_cookie_1["default"].remove(constants_1.CART_TOTAL);
        js_cookie_1["default"].remove(constants_1.CARTPRODUCTDETAIL);
        window.location.href = "/";
    }
    return Promise.reject(error);
});
exports["default"] = http;
