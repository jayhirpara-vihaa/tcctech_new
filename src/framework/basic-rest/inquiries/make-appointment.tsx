import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export interface AppointmentInputType {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
  created_by: number;
}
async function appointment(input: AppointmentInputType) {
  const { data } = await http.post(API_ENDPOINTS.APPOINTMENT, input);
  return data;
}

export const useAppointmentMutation = () => {
  return useMutation((input: AppointmentInputType) => appointment(input), {
    onSuccess: (data) => {
      toast.success("Your Request was successfully send, Will Contact Soon.");
    },
    onError: (data) => {},
  });
};
