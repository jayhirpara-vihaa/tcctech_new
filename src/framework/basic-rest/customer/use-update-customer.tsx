import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface UpdateUserType {
  full_name: string;
  image: string;
  id: number;
  updated_by: number;
  country_id: number;
  mobile: string;
}
async function updateUser(input: UpdateUserType) {
  const { data } = await http.put(API_ENDPOINTS.UPDATE_PROFILE, input, {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  });

  return data;
}
export const useUpdateUserMutation = () => {
  return useMutation((input: UpdateUserType) => updateUser(input), {
    onSuccess: (data) => {
      toast.success("Profile Edited Successfully !");
    },
    onError: (data) => { },
  });
};
