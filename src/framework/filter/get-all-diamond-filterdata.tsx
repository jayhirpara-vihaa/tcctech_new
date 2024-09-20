import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export interface DiamondFilter {
  data: DiamondFilterData;
}

interface caratWeight {
  id: number;
  value: string;
  slug: string;
  sort_code: number;
}
interface ColorData {
  id: number;
  value: string;
  name: string;
  slug: string;
}
interface ClarityData {
  id: number;
  value: string;
  name: string;
  slug: string;
}
export interface DiamondFilterData {
  caratWeight: caratWeight[] ;
  colorData: ColorData[];
  clarityData: ClarityData[];
  minPrice: number;
  maxPrice: number;
}

export const fetchsDiamondFilterData = async () => {
  const { data } = await http.get(API_ENDPOINTS.DIAMONDFILTER);
  return data;
};

export const useDiamondFilterDataQuery = () => {
  return useQuery<{ data: DiamondFilterData },Error>([API_ENDPOINTS.DIAMONDFILTER], 
	fetchsDiamondFilterData
	);
};
