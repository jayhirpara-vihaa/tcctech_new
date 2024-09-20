import { Settings } from "@framework/types";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
import FilterData from "public/api/diamond_settings.json";
type PaginatedProduct = {
  data: Settings[];
  paginatorInfo: any;
};
const fetchSetting = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const data = await FilterData;
  return {
    data: shuffle(data),
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const useDiamondSettingQuery = () => {
  return useInfiniteQuery<PaginatedProduct, Error>(FilterData, fetchSetting, {
    getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
  });
};

export { useDiamondSettingQuery, fetchSetting };
