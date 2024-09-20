import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchsConfiguratorSideBar = async () => {
  const { data } = await http.get(API_ENDPOINTS.CONFIGURATOR_SIDEBAR);
  return data;
};

export const useConfiguratorSideBarQuery = () => {
  return useQuery(
    [API_ENDPOINTS.CONFIGURATOR_SIDEBAR],
    fetchsConfiguratorSideBar
  );
};
