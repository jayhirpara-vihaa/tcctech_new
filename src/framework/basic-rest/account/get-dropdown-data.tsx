import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation, useQuery } from "react-query";

export interface countryId {
  country_id: string;
}
export interface stateId {
  state_id: string;
}

const fetchCountryDropdown = async () => {
  const { data } = await http.get(API_ENDPOINTS.GET_COUNTRY);
  return data;
};

const fetchStateDropdown = async (input: countryId) => {
  const { data } = await http.post(API_ENDPOINTS.GET_STATE, input);
  return data;
};

const fetchCityDropdown = async (input: stateId) => {
  const { data } = await http.post(API_ENDPOINTS.GET_CITY, input);
  return data;
};

export const useCountryDropdown = () => {
  return useQuery<{ data: any }, Error>(
    [API_ENDPOINTS.GET_COUNTRY],
    fetchCountryDropdown
  );
};

export const useStateDropdown = () => {
  return useMutation((input: countryId) => fetchStateDropdown(input), {
    onSuccess: (data) => {
    },
    onError: (data) => {
    },
  });
};

export const useCityDropdown = () => {
  return useMutation((input: stateId) => fetchCityDropdown(input), {
    onSuccess: (data) => {
    },
    onError: (data) => {
    },
  });
};
