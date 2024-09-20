import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import { COMPANY_INFO, LOGO_IMAGES, TAX_LIST } from "@utils/constants";

export const fetchsCompanyInfo = async () => {
  const { data } = await http.get(
    `${API_ENDPOINTS.COMPANYINFORMATION}?key=${process.env.NEXT_PUBLIC_COMPANY_INFO_KEY}`
  );
  Cookies.set(COMPANY_INFO, JSON.stringify(data?.data.companyInfo));
  Cookies.set(LOGO_IMAGES, JSON.stringify(data?.data.images));
  Cookies.set(TAX_LIST, JSON.stringify(data?.data.taxList));
  return data;
};

export const useCompanyInfoProductsQuery = () => {
  return useQuery([API_ENDPOINTS.COMPANYINFORMATION], fetchsCompanyInfo);
};
