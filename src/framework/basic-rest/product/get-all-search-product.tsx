import http from "@framework/utils/http";
import { useMutation } from "react-query";

const fetchSearchProducts = async (input: string) => {
  const { data } = await http.get(
    `product/serach/list?search_text=${input}`
  );
  return data;
};

export const useSearchProductDataMutation = () => {
  return useMutation((input: string) => fetchSearchProducts(input), {
    onSuccess: (data) => { },
    onError: (data) => { },
  });
};
