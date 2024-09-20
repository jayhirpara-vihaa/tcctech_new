import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import { useMutation } from "react-query";
import http from "@framework/utils/http";

async function countryId() {
  const { data } = await http.get(API_ENDPOINTS.COUNTRY_ID);
  return data;
}
export const useSignUpMutation = () => {
  return useMutation(() => countryId(), {
    onSuccess: (data) => {
      // Cookies.set("auth_token", data.token);
    },
    onError: (data: any) => {},
  });
};
