import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface DeleteInputType {
  id: number;
}

async function deleteAddress(input: DeleteInputType) {
  return http.post(API_ENDPOINTS.DELETE_ADDRESS, input);
  return input;
}
export const useDeleteAddressMutation = () => {
  return useMutation((input: DeleteInputType) => deleteAddress(input), {
    onSuccess: (data) => {},
    onError: (data) => {},
  });
};
