import { companyInfo, onlineImages } from "@settings/site-settings";
import { COMPANY_INFO, LOGO_IMAGES, TAX_LIST } from "@utils/constants";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";

export const CompanyInfoContext = createContext({
  companyInfo: (Cookies.get(COMPANY_INFO) && Cookies.get(COMPANY_INFO) != undefined && Cookies.get(COMPANY_INFO) != "undefined")
    ? (JSON.parse(Cookies.get(COMPANY_INFO) || "") as companyInfo)
    : ({} as companyInfo),
  logoImages: (Cookies.get(LOGO_IMAGES) && Cookies.get(LOGO_IMAGES) != undefined && Cookies.get(LOGO_IMAGES) != "undefined")
    ? (JSON.parse(Cookies.get(LOGO_IMAGES) || "") as onlineImages)
    : ({} as onlineImages),
  wishTotalItems: "0",
  cartTotalItems: "0",
  taxListItems: (Cookies.get(TAX_LIST) && Cookies.get(TAX_LIST) != undefined && Cookies.get(TAX_LIST) != "undefined") ? JSON.parse(Cookies.get(TAX_LIST) || "") : [],
  updateCompanyInfo: (value: companyInfo) => { },
  updateOnlineLogos: (value: onlineImages) => { },
  updateWishTotalItems: (value: string) => { },
  updateCartTotalItems: (value: string) => { },
  updateTaxListItems: (value: []) => { },

});

function CompanyInfoProvider({ children }: any) {
  const [companyInfo, setCompanyInfo] = useState(
    (Cookies.get(COMPANY_INFO) && Cookies.get(COMPANY_INFO) != undefined && Cookies.get(COMPANY_INFO) != "undefined")
      ? (JSON.parse(Cookies.get(COMPANY_INFO) || "") as companyInfo)
      : ({} as companyInfo)
  );
  const [logoImages, setLogoImages] = useState(
    (Cookies.get(LOGO_IMAGES) && Cookies.get(LOGO_IMAGES) != undefined && Cookies.get(LOGO_IMAGES) != "undefined")
      ? (JSON.parse(Cookies.get(LOGO_IMAGES) || "") as onlineImages)
      : ({} as onlineImages)
  );
  const [wishTotalItems, setWishTotalItems] = useState("");
  const [cartTotalItems, setCartTotalItems] = useState("");
  const [taxListItems, setTaxListItems] = useState((Cookies.get(TAX_LIST) && Cookies.get(TAX_LIST) != undefined && Cookies.get(TAX_LIST) != "undefined")
    ? (JSON.parse(Cookies.get(TAX_LIST) || ""))
    : []);
  const updateCompanyInfo = (value: companyInfo) => {
    setCompanyInfo(value);
  };
  const updateOnlineLogos = (value: onlineImages) => {
    setLogoImages(value);
  };

  const updateWishTotalItems = (value: string) => {
    setWishTotalItems(value);
  };
  const updateCartTotalItems = (value: string) => {
    setCartTotalItems(value);
  };
  const updateTaxListItems = (value: []) => {
    console.log("value", value)
    setTaxListItems(value);
  };
  return (
    <CompanyInfoContext.Provider
      value={{
        companyInfo,
        logoImages,
        wishTotalItems,
        cartTotalItems,
        taxListItems,
        updateCompanyInfo,
        updateOnlineLogos,
        updateWishTotalItems,
        updateCartTotalItems,
        updateTaxListItems
      }}
    >
      {children}
    </CompanyInfoContext.Provider>
  );
}

export default CompanyInfoProvider;
