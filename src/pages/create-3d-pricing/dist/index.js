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
var serverSideTranslations_1 = require("next-i18next/serverSideTranslations");
var layout_configurator_1 = require("@components/layout/layout-configurator");
var container_1 = require("@components/ui/container");
var divider_1 = require("@components/ui/divider");
var dynamic_1 = require("next/dynamic");
var react_1 = require("react");
var get_all_company_info_1 = require("src/framework/company-info/get-all-company-info");
var company_info_1 = require("@contexts/company_info/company_info");
var router_1 = require("next/router");
var configurator_sidebar_1 = require("@framework/configurator-sidebar/configurator-sidebar");
var Product3DRenderPricing = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require("@components/product/product-3d-render-pricing"); }); }, {
    ssr: false
});
function Product2() {
    // const { t } = useTranslation("common");
    var configData = configurator_sidebar_1.useConfiguratorSideBarQuery().data;
    var updateOnlineLogos = react_1.useContext(company_info_1.CompanyInfoContext).updateOnlineLogos;
    var CompanyInfoData = get_all_company_info_1.useCompanyInfoProductsQuery().data;
    var checkUserName = sessionStorage.getItem("config_user_email");
    react_1.useEffect(function () {
        updateOnlineLogos(CompanyInfoData === null || CompanyInfoData === void 0 ? void 0 : CompanyInfoData.data.images);
    }, [CompanyInfoData]);
    react_1.useEffect(function () {
        if (checkUserName == null) {
            router_1["default"].push("/config-login");
        }
    }, [checkUserName]);
    return (React.createElement(React.Fragment, null,
        React.createElement(divider_1["default"], { className: "mb-0" }),
        React.createElement(container_1["default"], null, checkUserName && configData && (React.createElement(Product3DRenderPricing, { configData: configData && configData.data })))));
}
exports["default"] = Product2;
Product2.Layout = layout_configurator_1["default"];
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
